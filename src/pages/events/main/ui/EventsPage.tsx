import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {EventsStoreApi} from "@/shared/services/events.service.ts";
import {useSearchParams} from "react-router-dom";
import {EventsSearchBar} from "@/features/events/main/ui/EventsSearchBar.tsx";

import {Col, Row} from "react-grid-system";
import Pagination from "@/features/pagination/ui/Pagination.tsx";
import {EventsGridView} from "@/features/events/main/ui/EventsGridView.tsx";

const DEFAULT_PAGE_SIZE = 6;

export function EventsPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [events, setEvents] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();
    const [error, setError] = useState(null);

    const [name, setName] = useState(searchParams.get('name') || '');
    const [eventDate, setEventDate] = useState(searchParams.get('eventDate') || null);
    const [page, setPage] = useState(Number(searchParams.get('page') || '1'));
    const pageSize = Number(searchParams.get('pageSize') || DEFAULT_PAGE_SIZE);

    useEffect(() => {
        setName(searchParams.get('name') || '');
        setEventDate(searchParams.get('eventDate'));
        setPage(Number(searchParams.get('page') || '1'));
    }, [searchParams]);

    const loadEvents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            if (localStorage.getItem("accessToken")) {
                const data = await EventsStoreApi.getPublicEventsWithAuth(
                    name?.trim() || null,
                    eventDate?.trim() || null,
                    420,
                    page,
                    pageSize
                );
                console.log("Запрос на получение страницы мероприятий (с авторизацией", data)
                setEvents(data.results || []);
                setMeta(data.metaData || null);
            } else {
                const data = await EventsStoreApi.getPublicEvents(
                    name?.trim() || null,
                    eventDate?.trim() || null,
                    420,
                    page,
                    pageSize
                );
                console.log("Запрос на получение страницы мероприятий", data)
                setEvents(data.results || []);
                setMeta(data.metaData || null);
            }


        } catch (err) {
            console.error(err);
            setError('Произошла ошибка при получении пользователей');
        } finally {
            setLoading(false);
        }
    }, [name, eventDate, page, pageSize]);

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    const updateParams = (newParams: {
        name?: string;
        eventDate?: string | null;
        timezoneOffset: number;
        page?: number;
        pageSize?: number;
    }) => {
        const params = new URLSearchParams();
        if (newParams.name) params.set('name', newParams.name);
        if (newParams.eventDate) params.set('eventDate', newParams.eventDate);
        params.set('page', (newParams.page || 1).toString());
        params.set('pageSize', (newParams.pageSize || pageSize).toString());
        setSearchParams(params);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleEventDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setEventDate(e.target.value);

    const submitSearch = () => updateParams({ name, eventDate, timezoneOffset: 420, page: 1, pageSize: DEFAULT_PAGE_SIZE });

    const switchPage = (p: number) => updateParams({ name, eventDate, timezoneOffset: 420, page: p, pageSize: DEFAULT_PAGE_SIZE });

    return (
        <>
            <div>
                <EventsSearchBar name={name} eventDate={eventDate}  onNameChange={handleNameChange} onEventDateChange={handleEventDateChange} onSearch={submitSearch} />

                {loading ? (
                    <h4>{t("common.loading" as any)}</h4>
                ) : error ? (
                    <div style={{ color: 'red' }}>{error}</div>
                ) : events.length === 0 ? (
                    <div style={{ padding: 16 }}>{t("common.noData" as any)}</div>
                ) : (
                    <div style={{paddingTop: 20}}>
                        <EventsGridView events={events} />
                    </div>
                )}

                {meta && meta.pageCount > 1 && (
                    <Row>
                        <Col>
                            <Pagination currentPage={meta.pageNumber} totalPages={meta.pageCount} onPageChange={switchPage} />
                        </Col>
                    </Row>
                )}
            </div>
        </>
    )
}