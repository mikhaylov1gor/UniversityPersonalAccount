import React, {useEffect, useState} from 'react';
import styles from './AdminEventCard.module.scss';
import {FilesStoreApi} from "@/shared/services/files.service.ts";
import defaultPhoto from "@/shared/assets/test/default_event_photo.gif";
import {useNavigate} from "react-router-dom";
import {RouteName} from "@/shared/config/router";
import {useTranslation} from "react-i18next";
import {EventDto} from "@/shared/models/responses/event/eventDto.ts";
import {Icon} from "@/shared/ui/atoms/Icon/Icon.tsx";
import {formatDateRange} from "@/features/events/main/ui/EventCard.tsx";
import {EventsStoreApi} from "@/shared/services/events.service.ts";
import {toast} from "@/app/providers/Toast/ToastController.ts";

interface AdminEventCardProps {
    event: EventDto
}

export const AdminEventCard: React.FC<AdminEventCardProps> = ({event}) => {
    const navigate = useNavigate();
    const [url,setUrl] = useState<string | null>(null);
    const {t} = useTranslation();

    useEffect(() => {
        const loadImage = async () => {
            if (event.picture.id){
                try {
                    const response = await FilesStoreApi.getFileById(event.picture.id);
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

    const deleteEvent = async (id: string) =>{
        try{
            await EventsStoreApi.deleteEventByIdForAdmin(id);
            toast.success("Мероприятие удалено")
        }
        catch (error){
            console.log("Ошибка при удалении");
        }
    }
    const handleDelete = async (id: string) => {
        if (!window.confirm(t("common.alertMessage" as any))) return;
        await deleteEvent(id)
        window.location.reload();
    };

    return (
        <div className={styles.card}
        >
            <img
                style={{cursor: "pointer"}}
                onClick={() => navigate(RouteName.ADMIN_PAGE_EVENT(event.id))}
                src={url || defaultPhoto as string}
                alt={event.title}
                className={styles.image}
            />
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}
                        style={{cursor: "pointer"}}
                        onClick={() => navigate(RouteName.ADMIN_PAGE_EVENT(event.id))}
                    >{event.title}</h3>

                    <Icon
                        style={{marginLeft: "auto", cursor: "pointer"}}
                        onClick={() => navigate(RouteName.ADMIN_PAGE_UPDATE_EVENT(event.id), {
                            state: { isCreate: false, eventId: event.id }
                        })}
                        name="edit-pencil-line01-black"
                        size={24}
                        fill={"none"}/>
                    <Icon
                        style={{marginLeft: "5px", cursor: "pointer"}}
                        name="trash-full-black"
                        onClick={() => handleDelete(event.id)}
                        size={24}
                        fill={"none"}/>
                </div>
                <div className={`${styles.status} ${getStatusClass(event.status.toString())}`}>
                    {event.status}
                </div>

                <div className={styles.rowGroup}>
                    <div className={styles.row}>
                        <div className={styles.label}>{t("admin.events.main.type")}</div>
                        <div className={styles.value}>{event.type}</div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.label}>{t("admin.events.main.auditory")}</div>
                        <div className={styles.value}>{event.auditory}</div>
                    </div>
                </div>

                <div className={styles.rowGroup}>
                    <div className={styles.row}>
                        <div className={styles.label}>{t("admin.events.main.date2")}</div>
                        <div className={styles.value}>{formatDateRange(event.dateTimeFrom, event.dateTimeTo)}</div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.label}>{t("admin.events.main.format")}</div>
                        <div className={styles.value}>{event.format}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};