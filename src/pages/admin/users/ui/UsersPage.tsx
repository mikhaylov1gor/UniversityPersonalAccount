import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col } from 'react-grid-system';
import { UserStoreApi } from '@/shared/services/user.service';

import Pagination from '@/features/pagination/ui/Pagination';
import styles from './UsersPage.module.scss';
import {UsersSearchBar} from "@/features/admin/users/ui/UsersSearchBar.tsx";
import {AlphabetFilter} from "@/features/admin/users/ui/AlphabetFilter.tsx";
import {ViewToggle} from "@/features/admin/users/ui/ViewToggle.tsx";
import {UserGridView} from "@/features/admin/users/ui/UserGridView.tsx";
import {UserListView} from "@/features/admin/users/ui/UserListView.tsx";

const DEFAULT_PAGE_SIZE = 10;

export function UsersPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [view, setView] = useState<'list' | 'grid'>('list');
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [filterLetter, setFilterLetter] = useState(searchParams.get('filterLastName') || null);
    const [page, setPage] = useState(Number(searchParams.get('page') || '1'));
    const pageSize = Number(searchParams.get('pageSize') || DEFAULT_PAGE_SIZE);

    useEffect(() => {
        setSearch(searchParams.get('search') || '');
        setFilterLetter(searchParams.get('filterLastName'));
        setPage(Number(searchParams.get('page') || '1'));
    }, [searchParams]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await UserStoreApi.getProfilesForAdmin(
                    null,
                    search.trim(),
                    filterLetter || '',
                    page,
                    pageSize
                );
                setUsers(data.results || []);
                setMeta(data.metaData || null);
            } catch (err) {
                console.error(err);
                setError('Произошла ошибка при получении пользователей');
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, [search, filterLetter, page, pageSize]);


    const updateParams = (newParams: {
        search?: string;
        filterLastName?: string | null;
        page?: number;
        pageSize?: number;
    }) => {
        const params = new URLSearchParams();
        if (newParams.search) params.set('search', newParams.search);
        if (newParams.filterLastName) params.set('filterLastName', newParams.filterLastName);
        params.set('page', (newParams.page || 1).toString());
        params.set('pageSize', (newParams.pageSize || pageSize).toString());
        setSearchParams(params);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    const submitSearch = () => updateParams({ search: search, filterLastName: filterLetter, page: 1, pageSize: DEFAULT_PAGE_SIZE });

    const toggleLetterFilter = (letter: string) => {
        const newFilter = filterLetter === letter ? null : letter;
        updateParams({ search, filterLastName: newFilter, page: 1 });
    };

    const switchPage = (p: number) => updateParams({ search: search, filterLastName: filterLetter, page: p, pageSize: DEFAULT_PAGE_SIZE });

    return (
        <div className={styles.usersPage}>
            <UsersSearchBar value={search} onChange={handleSearchChange} onSearch={submitSearch} />

            <Row>
                <Col lg={10} xs={12}>
                    <AlphabetFilter
                        activeLetter={filterLetter}
                        onSelect={toggleLetterFilter}
                        onClear={() => toggleLetterFilter(filterLetter || '')}
                    />
                </Col>
                <Col lg={2}>
                    <ViewToggle view={view} onChange={setView} />
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    {loading ? (
                        <div>Загрузка...</div>
                    ) : error ? (
                        <div style={{ color: 'red' }}>{error}</div>
                    ) : users.length === 0 ? (
                        <div style={{ padding: 16 }}>Нет данных</div>
                    ) : view === 'list' ? (
                        <UserListView users={users} />
                    ) : (
                        <UserGridView users={users} />
                    )}
                </Col>
            </Row>

            {meta && meta.pageCount > 1 && (
                <Row>
                    <Col xs={12}>
                        <Pagination currentPage={meta.pageNumber} totalPages={meta.pageCount} onPageChange={switchPage} />
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default UsersPage;
