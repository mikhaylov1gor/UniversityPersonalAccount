import React, {useEffect, useState} from 'react';
import styles from './EventCard.module.scss';
import {FilesStoreApi} from "@/shared/services/files.service.ts";
import defaultPhoto from "@/shared/assets/test/default_event_photo.gif";
import {useNavigate} from "react-router-dom";
import {RouteName} from "@/shared/config/router";
import {useTranslation} from "react-i18next";
interface EventCardProps {
    eventId: string;
    imageId: string;
    title: string;
    dateFrom: string;
    dateTo: string;
    format: string;
    status: string;
}

export const EventCard: React.FC<EventCardProps> = ({eventId, imageId, title, dateFrom,dateTo, format, status }) => {
    const navigate = useNavigate();
    const [url,setUrl] = useState<string | null>(null);
    const {t} = useTranslation();

    useEffect(() => {
        const loadImage = async () => {
            if (imageId){
                try {
                    const response = await FilesStoreApi.getFileById(imageId);
                    const blob = new Blob([response.data], {
                        type: response.headers['content-type'] || 'image/jpeg'
                    });
                    const url = URL.createObjectURL(blob);
                    setUrl(url);
                } catch (e) {
                    console.error(`Ошибка загрузки картинки для события ${eventId}`, e);
                }
            }
        };

        loadImage();
    }, []);

    const getStatusClass = (statusStr: string): string => {
        switch (statusStr) {
            case 'Draft':
                return styles.statusDraft;
            case 'Actual':
                return styles.statusActual;
            case 'Finished':
                return styles.statusFinished;
            case 'Archive':
                return styles.statusArchive;
            default:
                return '';
        }
    };

    return (
        <div className={styles.card}
             style={{cursor: "pointer"}}
             onClick={() => navigate(RouteName.EVENT_PAGE(eventId))}>
            <img
                src={url || defaultPhoto as string}
                alt={title}
                className={styles.image}
            />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <div className={`${styles.status} ${getStatusClass(status)}`}>
                    <h4>{status}</h4>
                </div>

                <div className={styles.infoBlock}>
                    <div className={styles.label}>
                        <p2>Дата(ы) проведения</p2>
                    </div>
                    <div className={styles.value}>
                        <p1>{formatDateRange(dateFrom, dateTo)}</p1>
                    </div>

                    <div className={styles.infoBlock}>
                        <div className={styles.label}>
                            <p2>Формат мероприятия</p2>
                        </div>
                        <div className={styles.value}>
                            <p1>{format}</p1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function formatDateRange(dateTimeFromStr, dateTimeToStr?) {
    const from = new Date(dateTimeFromStr);
    const to = new Date(dateTimeToStr);

    const pad = (n) => n.toString().padStart(2, '0');

    const dayFrom = pad(from.getDate());
    const monthFrom = pad(from.getMonth() + 1);
    const yearFrom = from.getFullYear();
    const fromHours = pad(from.getHours());
    const fromMinutes = pad(from.getMinutes());

    if (!dateTimeToStr){
        return `${dayFrom}.${monthFrom}.${yearFrom} (${fromHours}:${fromMinutes})`;
    }

    const dayTo = pad(to.getDate());
    const monthTo = pad(to.getMonth() + 1);
    const yearTo = to.getFullYear();
    const toHours = pad(to.getHours());
    const toMinutes = pad(to.getMinutes());

    if (dayFrom == dayTo && monthFrom == monthTo && yearFrom == yearTo){
        return `${dayFrom}.${monthFrom}.${yearFrom} (${fromHours}:${fromMinutes} - ${toHours}:${toMinutes})`;
    }
    else{
        return `${dayFrom}.${monthFrom}.${yearFrom} (${fromHours}:${fromMinutes}) - ${dayTo}.${monthTo}.${yearTo} (${toHours}:${toMinutes})`
    }
}