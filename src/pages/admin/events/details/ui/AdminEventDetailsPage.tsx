import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {EventsStoreApi} from "@/shared/services/events.service.ts";
import {FilesStoreApi} from "@/shared/services/files.service.ts";
import {EventDto} from "@/shared/models/responses/event/eventDto.ts";

import {Icon} from "@/shared/ui/atoms/Icon/Icon.tsx";
import {formatDateRange} from "@/features/events/main/ui/EventCard.tsx";

import styles from "./AdminEventDetailsPage.module.scss";
import defaultPhoto from "@/shared/assets/test/default_event_photo.gif";
import {Col, Row} from "react-grid-system";
import {RouteName} from "@/shared/config/router";
import {toast} from "@/app/providers/Toast/ToastController.ts";
import {EventFormat} from "@/shared/models/enums/event/eventFormat.ts";
import MapComponent from "@/features/map/ui/MapComponent.tsx";
import {Tabs} from "@/features/admin/events/details/tabs/Tabs.tsx";
import {EventStatus} from "@/shared/models/enums/event/eventStatus.ts";

const statuses = [
    { label: "Active", value: EventStatus.Actual, color: "#A0D000" },
    { label: "Finished", value: EventStatus.Finished, color: "#46B34A" },
    { label: "Draft", value: EventStatus.Draft, color: "#9C9C9C" },
    { label: "Archive", value: EventStatus.Archive, color: "#3A3A3A" },
];

export function AdminEventDetailsPage() {
    const {id} = useParams<{ id: string }>();
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bannerUrl, setBannerUrl] = useState<string | null>(null);
    const [descriptionTab, setDescriptionTab] = useState(true);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<EventStatus>(null);

    const fetchEvent = useCallback(async () => {
        try {
            setLoading(true);
            const data = await EventsStoreApi.retrieveFullDetailsForAdmin(id);
            setEvent(data);
            setStatus(data.status);
        } catch (err) {
            setError("Произошла ошибка при получении подробностей мероприятия");
        } finally {
            setLoading(false);
        }
    }, [id]);

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
        return () => bannerUrl && URL.revokeObjectURL(bannerUrl);
    }, [event, fetchBanner]);

    const deleteEvent = async () => {
        if (!window.confirm(t("common.alertMessage" as any))) return;
        try {
            await EventsStoreApi.deleteEventByIdForAdmin(id);
            toast.success("Мероприятие удалено")
        } catch (error) {
            console.log("Ошибка при удалении");
        } finally {
            navigate(RouteName.ADMIN_PAGE_EVENTS);
        }
    }

    const handleStatusChange = async (status: EventStatus) => {
        if (event.status === status) return;

        try {
            await EventsStoreApi.editEventStatusForAdmin({id: event.id, newStatus: status});
            setStatus(status);
            toast.success("Статус обновлён");
        } catch (err) {
            console.error("Ошибка при смене статуса", err);
            toast.error("Ошибка при смене статуса");
        }
    };

    if (loading) return <h1>Загрузка...</h1>;
    if (error) return <div style={{color: "red"}}>{error}</div>;
    if (!event) return <div>{t("events.details.notFound" as any)}</div>;

    return (
        <div>
            <Row>
                <Col md={6} lg={7} xxl={8}>
                    <div className={styles.header}>
                        <h2>{event.title}</h2>
                    </div>
                </Col>
                <Col md={6} lg={5} xxl={4}>
                    <div className={styles.headerButtons} style={{marginTop: "0.2rem"}}>
                        <div style={{position: "relative"}}>
                            <button
                                className={styles.statusButton}
                                onClick={() => setIsOpen(!isOpen)}
                                style={{
                                    backgroundColor: statuses.find(s => s.value === status)?.color,
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    border: "none",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    color: "#fff",
                                }}
                            >
                                {statuses.find(s => s.value === status)?.label || "Статус"} ▼
                            </button>

                            {isOpen && (
                                <ul
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        background: "#fff",
                                        border: "1px solid #ccc",
                                        borderRadius: "6px",
                                        marginTop: "4px",
                                        width: "160px",
                                        zIndex: 10,
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                        padding: 0,
                                        listStyle: "none",
                                    }}
                                >
                                    {statuses.map((s) => (
                                        <li
                                            key={s.value}
                                            onClick={() => {
                                                handleStatusChange(s.value);
                                                setIsOpen(false);
                                            }}
                                            style={{
                                                padding: "8px 12px",
                                                cursor: "pointer",
                                                fontWeight: s.value === status ? "bold" : "normal",
                                                backgroundColor: s.value === status ? "#f3f4f6" : "#fff",
                                                transition: "background 0.2s",
                                            }}
                                        >
                                            {s.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Icon
                            className={styles.icon}
                            style={{marginLeft: 'auto'}}
                            onClick={() => navigate(RouteName.ADMIN_PAGE_UPDATE_EVENT(event.id), {
                                state: {isCreate: false, eventId: event.id}
                            })}
                            name="edit-pencil-line01-black"
                            size={24}
                            fill={"none"}/>
                        <Icon
                            className={styles.icon}
                            style={{marginLeft: '5px'}}
                            name="trash-full-black"
                            onClick={() => deleteEvent()}
                            size={24}
                            fill={"none"}/>
                    </div>
                </Col>
            </Row>


            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className={styles.card}>
                    <div className={styles.header} onClick={() => setDescriptionTab(!descriptionTab)}>
                        <div className={styles.headerInfo}>
                            <strong>{t("events.details.description" as any)}</strong>
                            <Icon
                                name={descriptionTab ? "caret-down-md-black" : "caret-up-md-black"}
                                size={30}
                                style={{marginLeft: "auto"}}
                                fill={'none'}
                            />
                        </div>
                    </div>

                    {descriptionTab && (
                        <div
                            className={styles.eventDescription}
                            dangerouslySetInnerHTML={{__html: event.description || ""}}
                        />
                    )}

                    <img
                        src={bannerUrl || defaultPhoto}
                        alt={event.picture?.name || ""}
                        className={styles.banner}
                    />


                    <div className={styles.rowGroup}>
                        <div className={styles.row}>
                            <div className={styles.label}>{t("events.details.registrationRequired" as any)}</div>
                            <div className={styles.value}>
                                {event.isRegistrationRequired ? t("common.yes" as any) : t("common.no" as any)}
                            </div>
                        </div>
                        {event.isRegistrationRequired && (
                            <div className={styles.row}>
                                <div className={styles.label}>{t("events.details.registrationDate" as any)}</div>
                                <div className={styles.value}>{formatDateRange(event.registrationLastDate, null)}</div>
                            </div>
                        )}
                    </div>


                    <Row>
                        <Col lg={(event.format == EventFormat.Offline ? 6 : 12)}>
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.type" as any)}</div>
                                    <div className={styles.value}>
                                        {event.type}
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.targetAudience" as any)}</div>
                                    <div className={styles.value}>{event.auditory}</div>
                                </div>
                            </div>
                            <div className={styles.rowGroup} style={{flexWrap: 'wrap'}}>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.date" as any)}</div>
                                    <div
                                        className={styles.value}>{formatDateRange(event.dateTimeFrom, event.dateTimeTo)}
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.format" as any)}</div>
                                    <div className={styles.value}>{event.format}</div>
                                </div>
                            </div>
                            {event.format == EventFormat.Offline && (
                                <>
                                    <div className={styles.rowGroup} style={{flexWrap: 'wrap'}}>
                                        <div className={styles.row}>
                                            <div className={styles.label}>{t("events.details.address" as any)}</div>
                                            <div className={styles.value}>{event.addressName}</div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Col>
                        <Col lg={6}>
                            {event.format == EventFormat.Offline && (
                                <MapComponent latitude={event.latitude} longitude={event.longitude}></MapComponent>
                            )}
                        </Col>
                    </Row>

                    <Col>
                        {event.format == EventFormat.Offline ? (
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.latitude" as any)}</div>
                                    <div className={styles.value}>{event.latitude}</div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.longitude" as any)}</div>
                                    <div className={styles.value}>{event.longitude}</div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>{t("events.details.link" as any)}</div>
                                    <div className={styles.value}>{event.link}</div>
                                </div>
                            </div>
                        )}
                    </Col>

                    <div className={styles.rowGroup}>
                        <div className={styles.row}>
                            <div className={styles.label}>{t("events.details.isDigest" as any)}</div>
                            <div className={styles.value}>
                                {event.isDigestNeeded ? t("common.yes" as any) : t("common.no" as any)}
                            </div>
                        </div>
                        {event.isDigestNeeded && (
                            <div className={styles.row}>
                                <div className={styles.label}>{t("events.details.digestText" as any)}</div>
                                <div
                                    className={styles.eventDescription}
                                    dangerouslySetInnerHTML={{__html: event.digestText || ""}}
                                />
                            </div>
                        )}
                    </div>

                    {event.isDigestNeeded && (
                        <div className={styles.rowGroup}>
                            <div className={styles.row}>
                                <div className={styles.label}>{t("events.details.digestText" as any)}</div>
                                <div
                                    className={styles.eventDescription}
                                    dangerouslySetInnerHTML={{__html: event.digestText || ""}}
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.rowGroup}>
                        <div className={styles.row}>
                            <div className={styles.label}>{t("events.details.author" as any)}</div>
                            <div className={styles.value}>
                                {event.author?.lastName} {event.author?.firstName} {event.author?.patronymic}
                            </div>
                        </div>
                    </div>

                    <Tabs participants={event.participants}/>
                </div>
            </div>
        </div>
    );
}
