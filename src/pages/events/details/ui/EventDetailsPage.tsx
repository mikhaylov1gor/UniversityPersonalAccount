import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { EventsStoreApi } from "@/shared/services/events.service.ts";
import { FilesStoreApi } from "@/shared/services/files.service.ts";
import { EventDto } from "@/shared/models/responses/event/eventDto.ts";

import { Icon } from "@/shared/ui/atoms/Icon/Icon.tsx";
import Button from "@/shared/ui/atoms/Button/Button.tsx";
import MapComponent from "@/features/map/ui/MapComponent.tsx";
import { formatDateRange } from "@/features/events/main/ui/EventCard.tsx";

import styles from "./EventDetailsPage.module.scss";
import defaultPhoto from "@/shared/assets/test/default_event_photo.gif";
import {ExternalRegisterModal} from "@/features/events/details/ui/ExternalRegisterModal.tsx";

export function EventDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    const [event, setEvent] = useState<EventDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bannerUrl, setBannerUrl] = useState<string | null>(null);
    const [isParticipant, setIsParticipant] = useState(null);
    const [descriptionTab, setDescriptionTab] = useState(true);

    const isAuthorized = Boolean(localStorage.getItem("accessToken"));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchEvent = useCallback(async () => {
        try {
            setLoading(true);
            const data = await EventsStoreApi.getPublicEventDetails(id);
            setEvent(data);
        } catch (err) {
            console.error(err);
            setError("Произошла ошибка при получении подробностей мероприятия");
        } finally {
            setLoading(false);
        }
    }, [id]);

    // Проверка участия
    const checkParticipation = useCallback(async (eventId: string) => {
        try {
            if(localStorage.getItem("accessToken")){
                const isJoined = await EventsStoreApi.checkIsUserParticipantOfEvent(eventId);
                console.log("Проверка участия: ", isJoined)
                setIsParticipant(isJoined);
            }
            else{
                const registered = JSON.parse(localStorage.getItem("guestRegisteredEvents") || "[]");
                console.log(true);
                if (registered.includes(eventId)) {
                    setIsParticipant(true);
                }
                else {
                    setIsParticipant(false);
                }
            }
        } catch (e) {
            console.error(`Ошибка проверки участия`, e);
        }
    }, []);

    // Получение баннера
    const fetchBanner = useCallback(async (fileId: string) => {
        try {
            const response = await FilesStoreApi.getFileById(fileId);
            const blob = new Blob([response.data], {
                type: response.headers["content-type"] || "image/jpeg"
            });
            const url = URL.createObjectURL(blob);
            setBannerUrl(url);
        } catch (e) {
            console.error("Ошибка загрузки картинки", e);
        }
    }, []);

    useEffect(() => {
        fetchEvent();
    }, [fetchEvent]);

    useEffect(() => {
        if (!event) return;
        if (event.picture?.id) fetchBanner(event.picture.id);
        checkParticipation(event.id);
        return () => bannerUrl && URL.revokeObjectURL(bannerUrl);
    }, [event, fetchBanner, checkParticipation]);

    const handleRegister = async () => {
        if (!event) return;

        if (isAuthorized) {
            try {
                await EventsStoreApi.registerToEventAsInner({ eventId: event.id });
                setIsParticipant(prev => !prev);
            } catch (e) {
                console.error("Ошибка при регистрации", e);
            }
        } else {
            setIsModalOpen(true);
        }
    };

    const renderRegistrationButton = () => {
        if (!event?.isRegistrationRequired) return null;

        return isParticipant ? (
            <Button variant="outline" onClick={handleRegister}>
                {t("events.details.alreadyParticipating")}
            </Button>
        ) : (
            <Button variant="primary" onClick={handleRegister}>
                {t("events.details.participate")}
            </Button>
        );
    };

    if (loading) return <h1>Загрузка...</h1>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (!event) return <div>{t("events.details.notFound")}</div>;

    return (
        <div>
            <div className={styles.header}>
                <h2>{event.title}</h2>
                {isParticipant !==null && (
                    renderRegistrationButton()
                )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className={styles.card}>
                    <div className={styles.header} onClick={() => setDescriptionTab(!descriptionTab)}>
                        <div className={styles.headerInfo}>
                            <strong>{t("events.details.description")}</strong>
                            <Icon
                                name={descriptionTab ? "caret-down-md-black" : "caret-up-md-black"}
                                size={30}
                                style={{ marginLeft: "auto" }}
                            />
                        </div>
                    </div>

                    {descriptionTab && (
                        <div
                            className={styles.eventDescription}
                            dangerouslySetInnerHTML={{ __html: event.description || "" }}
                        />
                    )}

                    <img
                        src={bannerUrl || defaultPhoto}
                        alt={event.picture?.name || ""}
                        className={styles.banner}
                    />

                    {/* Дата окончания регистрации */}
                    {event.isRegistrationRequired && (
                        <div className={styles.rowGroup}>
                            <div className={styles.row}>
                                <div className={styles.label}>{t("events.details.registrationDate")}</div>
                                <div className={styles.value}>{formatDateRange(event.registrationLastDate, null)}</div>
                            </div>
                        </div>
                    )}

                    {/* Формат и дата */}
                    <div className={styles.rowGroup}>
                        <div className={styles.row}>
                            <div className={styles.label}>{t("events.details.date")}</div>
                            <div className={styles.value}>
                                {formatDateRange(event.dateTimeFrom, event.dateTimeTo)}
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.label}>{t("events.details.format")}</div>
                            <div className={styles.value}>{event.format}</div>
                        </div>
                    </div>

                    {/* Адрес и карта или ссылка */}
                    {event.format === "Offline" ? (
                        <div className={styles.rowGroup} style={{ borderBottom: 0 }}>
                            <div className={styles.addressBlock}>
                                <div className={styles.label}>{t("events.details.address")}</div>
                                <div className={styles.value}>{event.addressName}</div>
                            </div>
                            <div className={styles.mapWrapper}>
                                <MapComponent
                                    latitude={event.latitude}
                                    longitude={event.longitude}
                                    zoom={10}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.rowGroup}>
                            <div className={styles.row}>
                                <div className={styles.label}>{t("events.details.link")}</div>
                                <div className={styles.value}>
                                    <a href={`http://${event.link}`} target="_blank" rel="noreferrer">
                                        {event.link}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Модальное окно */}
            <ExternalRegisterModal
                isOpen={isModalOpen}
                eventId={event.id}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    setIsParticipant(!isParticipant)
                }}
            />
        </div>
    );
}
