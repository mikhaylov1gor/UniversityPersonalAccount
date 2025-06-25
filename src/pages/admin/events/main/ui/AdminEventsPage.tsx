import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {EventsStoreApi} from "@/shared/services/events.service.ts";
import {useNavigate, useSearchParams} from "react-router-dom";

import {Col, Row} from "react-grid-system";
import Pagination from "@/features/pagination/ui/Pagination.tsx";
import {AdminEventsSearchBar} from "@/features/admin/events/main/ui/AdminEventsSearchBar.tsx";
import Button from "@/shared/ui/atoms/Button/Button.tsx";
import {RouteName} from "@/shared/config/router";
import {AdminEventsGridView} from "@/features/admin/events/main/ui/AdminEventsGridView.tsx";
import {EventDto} from "@/shared/models/responses/event/eventDto.ts";

const DEFAULT_PAGE_SIZE = 6;

export function AdminEventsPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [events, setEvents] = useState<EventDto[] | []>([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();
    const [error, setError] = useState(null);

    const [status, setStatus] = useState(searchParams.get('status') || '')
    const [eventType, setEventType] = useState(searchParams.get('eventType') || '')
    const [name, setName] = useState(searchParams.get('name') || '');
    const [eventFormat, setEventFormat] = useState(searchParams.get('eventFormat') || '')
    const [eventDate, setEventDate] = useState(searchParams.get('eventDate') || null);
    const [page, setPage] = useState(Number(searchParams.get('page') || '1'));
    const pageSize = Number(searchParams.get('pageSize') || DEFAULT_PAGE_SIZE);

    const navigate = useNavigate();

    useEffect(() => {
        setStatus(searchParams.get('status') || '');
        setEventType(searchParams.get('eventType') || '');
        setName(searchParams.get('name') || '');
        setEventFormat(searchParams.get('eventFormat') || '');
        setEventDate(searchParams.get('eventDate'));
        setPage(Number(searchParams.get('page') || '1'));
    }, [searchParams]);

    const loadEvents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await EventsStoreApi.retrievesEventsForAdmin(
                status?.trim() || null,
                eventType?.trim() || null,
                name?.trim() || null,
                eventFormat?.trim() || null,
                eventDate?.trim() || null,
                420,
                page,
                pageSize
            );
            console.log("Запрос на получение страницы мероприятий (для админа)", data)
            setEvents(data.results || []);
            setMeta(data.metaData || null);

        } catch (err) {
            console.error(err);
            setError('Произошла ошибка при получении мероприятий');
        } finally {
            setLoading(false);
        }
    }, [status, eventType, eventFormat, name, eventDate, page, pageSize]);

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    const updateParams = (newParams: {
        status?: string,
        eventType?: string,
        eventFormat?: string
        name?: string;
        eventDate?: string | null;
        timezoneOffset: number;
        page?: number;
        pageSize?: number;
    }) => {
        const params = new URLSearchParams();
        if (newParams.name) params.set('name', newParams.name);
        if (newParams.eventDate) params.set('eventDate', newParams.eventDate);
        if (newParams.status) params.set('status', newParams.status);
        if (newParams.eventType) params.set('eventType', newParams.eventType);
        if (newParams.eventFormat) params.set('eventFormat', newParams.eventFormat)
        params.set('page', (newParams.page || 1).toString());
        params.set('pageSize', (newParams.pageSize || pageSize).toString());
        setSearchParams(params);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleStatusChange = (value: string) => setStatus(value);

    const handleEventTypeChange = (value: string) => setEventType(value);
    const handleEventFormatChange = (value: string) => setEventFormat(value);

    const handleEventDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setEventDate(e.target.value);

    const submitSearch = () => updateParams({
        status,
        eventType,
        eventFormat,
        name,
        eventDate,
        timezoneOffset: 420,
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE
    });

    const switchPage = (p: number) => updateParams({
        status,
        eventType,
        eventFormat,
        name,
        eventDate,
        timezoneOffset: 420,
        page: p,
        pageSize: DEFAULT_PAGE_SIZE
    });

    return (
        <>
            <div>
                <h2 style={{marginBottom: '1rem'}}>{t("admin.events.main.title" as any)}</h2>
                <Button
                    variant="outline"
                    style={{minWidth: '100%', marginBottom: '1rem'}}
                    onClick={() => navigate(RouteName.ADMIN_PAGE_CREATE_EVENT, {
                        state: { isCreate: true }
                    })}
                >
                    {t("admin.events.main.addButton" as any)} ＋
                </Button>
                <AdminEventsSearchBar name={name}
                                      status={status}
                                      eventFormat={eventFormat}
                                      eventType={eventType}
                                      eventDate={eventDate}
                                      onNameChange={handleNameChange}
                                      onStatusChange={handleStatusChange}
                                      onEventFormatChange={handleEventFormatChange}
                                      onEventTypeChange={handleEventTypeChange}
                                      onEventDateChange={handleEventDateChange}
                                      onSearch={submitSearch}/>

                {loading ? (
                    <div>Загрузка...</div>
                ) : error ? (
                    <div style={{color: 'red'}}>{error}</div>
                ) : events.length === 0 ? (
                    <div style={{padding: 16}}>Нет данных</div>
                ) : (
                    <div style={{paddingTop: 20}}>
                        <AdminEventsGridView events={events}/>
                    </div>
                )}

                {meta && meta.pageCount > 1 && (
                    <Row>
                        <Col>
                            <Pagination currentPage={meta.pageNumber} totalPages={meta.pageCount}
                                        onPageChange={switchPage}/>
                        </Col>
                    </Row>
                )}
            </div>
        </>
    )
}