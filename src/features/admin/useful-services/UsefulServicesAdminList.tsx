import React, {useEffect} from 'react';
import {UsefulServiceCategory} from '@/shared/models/enums/usefulServiceCategory';
import {useLoadUsefulServices} from "@/shared/hooks/useLoadUsefulServices.ts";
import UsefulServiceAdminCard from "@/features/admin/useful-services/UsefulServiceCardAdmin";
import styles from './UsefulServicesAdminList.module.scss'
import Pagination from "@/features/pagination/ui/Pagination";
import {UsefulServiceDto} from "@/shared/models/responses/usefulService/usefulServiceDto";
import {useSearchParams} from "react-router-dom";

interface Props {
    categories: UsefulServiceCategory[] | null;
    onEdit?: (item: UsefulServiceDto) => void;
}

const UsefulServicesList: React.FC<Props> = ({categories, onEdit}) => {
    const {items, loading, error, meta, loadPage} = useLoadUsefulServices(categories, 5);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        loadPage(pageParam);
    }, [loadPage, pageParam])

    const handlePageChange = (page: number) => {
        setSearchParams({ page: String(page) });
        loadPage(page);
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <div className={styles.listContainer}>
                {items.map((item, idx) => (
                    <>
                        <UsefulServiceAdminCard item={item} onEdit={onEdit} onDelete={() => loadPage}/>
                        {idx < items.length - 1 && <div className={styles.separator}/>}
                    </>
                ))}
            </div>
            {meta && meta.pageCount > 1 && (
                <div style={{marginTop: 24}}>
                    <Pagination
                        currentPage={meta.pageNumber}
                        totalPages={meta.pageCount}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </>
    );
};

export default UsefulServicesList;