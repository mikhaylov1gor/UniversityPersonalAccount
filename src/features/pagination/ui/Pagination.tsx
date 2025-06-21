import React from 'react';
import styles from './Pagination.module.scss';
import { Icon } from '@/shared/ui/atoms/Icon/Icon';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    pageRangeDisplayed?: number;
    showFirstLast?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          totalPages,
                                                          onPageChange,
                                                          className,
                                                          pageRangeDisplayed = 2,
                                                          showFirstLast = false,
                                                      }) => {
    if (totalPages <= 1) {
        return null;
    }

    const handleClick = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page);
    };

    const pages: (number | 'ellipsis')[] = [];
    const startPage = Math.max(1, currentPage - pageRangeDisplayed);
    const endPage = Math.min(totalPages, currentPage + pageRangeDisplayed);

    if (showFirstLast && startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
            pages.push('ellipsis');
        }
    } else if (startPage > 1) {
        pages.push(1, 'ellipsis');
    }

    for (let p = startPage; p <= endPage; p++) {
        pages.push(p);
    }

    if (showFirstLast && endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pages.push('ellipsis');
        }
        pages.push(totalPages);
    } else if (endPage < totalPages) {
        pages.push('ellipsis', totalPages);
    }

    return (
        <nav className={[styles.pagination, className].filter(Boolean).join(' ')}>
            <button
                className={styles.pageBtn}
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <Icon name="chevron-left-black" size={20} fill="none" />
            </button>
            {pages.map((p, idx) => {
                if (p === 'ellipsis') {
                    return (
                        <span key={`el-${idx}`} className={styles.ellipsis}>
                            …
                        </span>
                    );
                }
                return (
                    <button
                        key={p}
                        className={[
                            styles.pageBtn,
                            p === currentPage ? styles['pageBtn--active'] : ''
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        onClick={() => handleClick(p as number)}
                    >
                        {p}
                    </button>
                );
            })}
            <button
                className={styles.pageBtn}
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <Icon name="chevron-right-black" size={20} fill="none" />
            </button>
        </nav>
    );
};

export default Pagination;