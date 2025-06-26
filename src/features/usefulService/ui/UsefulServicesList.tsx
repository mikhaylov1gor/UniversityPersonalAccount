import React from 'react';
import { Row, Col } from 'react-grid-system';
import { UsefulServiceCard } from './UsefulServiceCard.tsx';
import { UsefulServiceDto } from '@/shared/models/responses/usefulService/usefulServiceDto';
import Pagination from '@/features/pagination/ui/Pagination';

interface Props {
    services: UsefulServiceDto[];
    meta: {
        pageCount: number;
        pageNumber: number;
    } | null;
    loading: boolean;
    onPageChange: (page: number) => void;
    isAdmin?: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const UsefulServicesList: React.FC<Props> = ({
                                                        services,
                                                        meta,
                                                        loading,
                                                        onPageChange,
                                                        isAdmin = false,
                                                        onEdit,
                                                        onDelete
                                                    }) => {
    const renderSkeletons = () =>
        Array.from({ length: 3 }).map((_, idx) => (
            <Col xs={12} md={6} key={idx}>
                <div style={{ height: 200, background: '#f5f5f5', borderRadius: 8 }} />
            </Col>
        ));

    const renderServiceCards = () =>
        services.map((service) => (
            <Col xs={12} md={12} lg={12} key={service.id}>
                <UsefulServiceCard
                    service={service}
                    onEdit={isAdmin ? onEdit : undefined}
                    onDelete={isAdmin ? onDelete : undefined}
                    isAdmin={isAdmin}
                />
            </Col>
        ));

    return (
        <>
            <Row gutterWidth={24}>
                {loading ? renderSkeletons() : renderServiceCards()}
            </Row>

            {meta && meta.pageCount > 1 && (
                <div style={{ marginTop: 24 }}>
                    <Pagination
                        currentPage={meta.pageNumber}
                        totalPages={meta.pageCount}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </>
    );
};
