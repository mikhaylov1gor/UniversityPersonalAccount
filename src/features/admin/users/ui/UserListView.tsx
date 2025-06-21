import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '@/shared/config/router';
import styles from '@/pages/admin/users/ui/UsersPage.module.scss';

interface UserListViewProps {
    users: Array<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    }>;
}

export function UserListView({ users }: UserListViewProps) {
    const navigate = useNavigate();

    return (
        <div className={styles.listContainer}>
            {users.map((user) => (
                <div
                    key={user.id}
                    className={styles.listItem}
                    onClick={() => navigate(RouteName.ADMIN_PAGE_USER_PROFILE(user.id))}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(RouteName.ADMIN_PAGE_USER_PROFILE(user.id))}
                >
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500 }}>
                            {user.firstName} {user.lastName}
                        </div>
                        <div>{user.email}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
