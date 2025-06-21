import React, {useEffect, useState} from 'react';
import styles from './EventCard.module.scss';
import {FilesStoreApi} from "@/shared/services/files.service.ts";
import defaultPhoto from "@/shared/assets/test/default_event_photo.gif";
interface EventCardProps {
    imageId: string;
    title: string;
    dateFrom: string;
    dateTo: string;
    format: string;
}

export const EventCard: React.FC<EventCardProps> = ({ imageId, title, dateFrom,dateTo, format }) => {
    const [url,setUrl] = useState<string | null>(null);

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
                    console.error(`Ошибка загрузки картинки для события ${event.id}`, e);
                }
            }
        };

        loadImage();
    }, []);
    function formatDateRange(dateTimeFromStr, dateTimeToStr) {
        const from = new Date(dateTimeFromStr);
        const to = new Date(dateTimeToStr);

        const pad = (n) => n.toString().padStart(2, '0');

        const day = pad(from.getDate());
        const month = pad(from.getMonth() + 1);
        const year = from.getFullYear();

        const fromHours = pad(from.getHours());
        const fromMinutes = pad(from.getMinutes());

        const toHours = pad(to.getHours());
        const toMinutes = pad(to.getMinutes());

        return `${day}.${month}.${year} (${fromHours}:${fromMinutes} - ${toHours}:${toMinutes})`;
    }

    return (
        <div className={styles.card}>
            <img
                src={url || defaultPhoto as string}
                alt={title}
                className={styles.image}
            />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.infoBlock}>
                    <div className={styles.label}>Дата(ы) проведения</div>
                    <div className={styles.value}>{formatDateRange(dateFrom, dateTo)}</div>
                </div>
                <div className={styles.infoBlock}>
                    <div className={styles.label}>Формат мероприятия</div>
                    <div className={styles.value}>{format}</div>
                </div>
            </div>
        </div>
    );
};
