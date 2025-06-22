import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {EventsStoreApi} from "@/shared/services/events.service.ts";
import {EventDto} from "@/shared/models/responses/event/eventDto.ts";
import styles from "./EventDetailsPage.module.scss"
import defaultPhoto from "@/shared/assets/test/default_event_photo.gif";
import {FilesStoreApi} from "@/shared/services/files.service.ts";
import Button from "@/shared/ui/atoms/Button/Button.tsx";
import {Icon} from "@/shared/ui/atoms/Icon/Icon.tsx";
import {formatDateRange} from "@/features/events/main/ui/EventCard.tsx";
import MapComponent from "@/features/map/ui/MapComponent.tsx";

export function EventDetailsPage() {
    const {id} = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();
    const [error, setError] = useState(null);

    const [event, setEvent] = useState<EventDto | null>(null);
    const [bannerUrl, setBannerUrl] = useState<string>(null);
    const isAuthorized = localStorage.getItem("accessToken") !== null;
    const [isParticipant, setIsParticipant] = useState(false);
    const [descriptionTab, setDescriptionTab] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await EventsStoreApi.getPublicEventDetails(id);
                setEvent(data);
            } catch (err) {
                console.error(err);
                setError('Произошла ошибка при получении подробностей мероприятия');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    useEffect(() => {
        if (!event?.picture?.id) return;

        const fetchBanner = async () => {
            try {
                const response = await FilesStoreApi.getFileById(event.picture.id);
                const blob = new Blob([response.data], {
                    type: response.headers['content-type'] || 'image/jpeg'
                });
                const url = URL.createObjectURL(blob);
                setBannerUrl(url);
            } catch (e) {
                console.error(`Ошибка загрузки картинки для события ${event.id}`, e);
            }
        };

        fetchBanner();

        return () => {
            if (bannerUrl) {
                URL.revokeObjectURL(bannerUrl);
                setBannerUrl(null);
            }
        };
    }, [event]);

    useEffect(() => {
        const checkParticipating = async () => {
            try {
                const data = await EventsStoreApi.checkIsUserParticipantOfEvent(event.id)
                setIsParticipant(data);
            } catch (e) {
                console.error(`Ошибка проверки участия для события ${event.id}`, e);
            }
        }

        if (event) {
            checkParticipating();
        }
    }, [event]);

    const register = async (eventId: string) => {
        try {
            if (isAuthorized) {
                const response = await EventsStoreApi.registerToEventAsInner(eventId);
                setIsParticipant(!isParticipant);
            }
            else{
                setIsModalOpen(true);
            }

        } catch (e) {
            console.error(`Ошибка при регистрации на мероприятие`, e);
        }
    }

    if (loading) {
        return <h1>Загрузка...</h1>;
    }

    if (error) {
        return <div style={{color: 'red'}}>{error}</div>;
    }

    if (!event) {
        return <div>Мероприятие не найдено</div>;
    }

    return (
        <div>
            <div className={styles.header}>
                <h2>{event.title}</h2>
                {event.isRegistrationRequired ? (
                    isParticipant ? (
                        <Button
                            variant="primary"
                            onClick={() => register(event.id)}
                            style={{width: '236px', height: '48px', marginTop: '10px'}}
                        >
                            БУДУ УЧАСТВОВАТЬ
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            style={{width: '236px', height: '48px', marginTop: '10px'}}
                        >
                            УЧАСТВУЮ
                        </Button>
                    )
                ) : null}

            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className={styles.card}>
                    <div>
                        <div className={styles.header} style={{cursor: "pointer"}} onClick={() => setDescriptionTab(!descriptionTab)}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerInfo}>
                                    <strong>{t("events.details.description")}</strong>
                                    <Icon
                                        name={descriptionTab ? "caret-down-md-black" : "caret-up-md-black"}
                                        size={30}
                                        fill="none"
                                        style={{marginLeft: "auto"}}
                                    />
                                </div>
                            </div>
                        </div>

                        {descriptionTab && (
                            <div className={styles.eventDescription} style={{marginTop: 10}}
                                 dangerouslySetInnerHTML={{__html: event.description || ''}}/>
                        )}
                    </div>
                    <img
                        src={bannerUrl || defaultPhoto as string}
                        alt={event.picture.name}
                        className={styles.banner}
                    />

                    {event.isRegistrationRequired && (
                        <div className={styles.rowGroup}>
                            <div className={styles.row}>
                                <div className={styles.label}>{t("events.details.registrationDate")}</div>
                                <div className={styles.value}>
                                    {event.registrationLastDate}
                                </div>
                            </div>
                        </div>
                    )}

                    {event.format.toString() == "Offline" ? (
                        <>
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.date")}</div>
                                    <div className={styles.value}>
                                        {formatDateRange(event.dateTimeFrom, event.dateTimeTo)}
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.format")}</div>
                                    <div className={styles.value}>
                                        {event.format}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rowGroup} style={{borderBottom: '0px'}}>
                                    <div className={styles.addressBlock}>
                                        <div className={styles.label}>{t("events.details.address")}</div>
                                        <div className={styles.value}>
                                            {event.addressName}
                                        </div>
                                    </div>
                                    <div className={styles.mapWrapper}>
                                        <MapComponent latitude={event.latitude} longitude={event.longitude} zoom={10}/>
                                    </div>

                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.date")}</div>
                                    <div className={styles.value}>
                                        {formatDateRange(event.dateTimeFrom, event.dateTimeTo)}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.format")}</div>
                                    <div className={styles.value}>
                                        {event.format}
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.link")}</div>
                                    <div className={styles.value}>
                                        `https://${event.link}`
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}