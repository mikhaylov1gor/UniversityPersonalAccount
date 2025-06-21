import React from 'react';
import { ListIcon } from '@/shared/ui/atoms/Icon/ListIcon';
import { GridIcon } from '@/shared/ui/atoms/Icon/GridIcon';
import styles from '@/pages/admin/users/ui/UsersPage.module.scss';

interface ViewToggleProps {
    view: 'list' | 'grid';
    onChange: (view: 'list' | 'grid') => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
    return (
        <div className={styles.viewToggle}>
            <button
                className={view === 'list' ? styles.active : ''}
                onClick={() => onChange('list')}
                type="button"
                aria-label="Список"
            >
                <ListIcon />
            </button>
            <button
                className={view === 'grid' ? styles.active : ''}
                onClick={() => onChange('grid')}
                type="button"
                aria-label="Карточки"
            >
                <GridIcon />
            </button>
        </div>
    );
}
