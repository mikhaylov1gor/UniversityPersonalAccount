import { useState, useEffect, useCallback } from 'react';
import { UsefulServiceCategory } from '@/shared/models/enums/usefulServiceCategory';
import { UsefulServiceDto } from '@/shared/models/responses/usefulService/usefulServiceDto';
import { usefulServiceStoreApi } from '@/shared/services/useful.service';

export interface MetaData {
    pageCount: number;
    totalItemCount: number;
    pageNumber: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    firstItemOnPage: number;
    lastItemOnPage: number;
}

export interface UseUsefulServicesResult {
    items: UsefulServiceDto[];
    meta: MetaData | null;
    loading: boolean;
    error: string | null;
    loadPage: (page: number) => void;
}

export function useLoadUsefulServices(
    categories: UsefulServiceCategory[] | null = null,
    initialPageSize = 5
): UseUsefulServicesResult {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<UsefulServiceDto[]>([]);
    const [meta, setMeta] = useState<MetaData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadServices = useCallback(async () => {
        if (!categories) return;

        setLoading(true);
        setError(null);

        try {
            const data = await usefulServiceStoreApi.getListByOfServices(
                categories,
                page,
                initialPageSize
            );
            setItems(data.results);
            setMeta(data.metaData);
        } catch (err) {
            console.error(err);
            setError('Ошибка загрузки списка сервисов');
            setItems([]);
            setMeta(null);
        } finally {
            setLoading(false);
        }
    }, [categories, page, initialPageSize]);

    useEffect(() => {
        loadServices();
    }, [loadServices]);

    // сбрасываем страницу при смене категории
    useEffect(() => {
        setPage(1);
    }, [categories]);

    return {
        items,
        meta,
        loading,
        error,
        loadPage: setPage
    };
}