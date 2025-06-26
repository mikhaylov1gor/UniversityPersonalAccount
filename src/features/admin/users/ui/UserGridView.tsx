import React from 'react';
import { Col, Row } from 'react-grid-system';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '@/shared/config/router';
import { Button } from '@/shared/ui/atoms/Button/Button';
import styles from '@/pages/admin/users/ui/UsersPage.module.scss';
import {useTranslation} from "react-i18next";

interface UserGridViewProps {
    users: Array<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        birthDate?: string;
        avatarUrl?: string;
    }>;
}

export function UserGridView({ users }: UserGridViewProps) {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <Row gutterWidth={16} style={{ alignItems: 'stretch' }}>
            {users.map((user) => (
                <Col key={user.id} xs={12} sm={6} md={4} lg={3}>
                    <div className={styles.cardItem}>
                        <div className={styles.cardHeader}>
                            {user.avatarUrl ? (
                                <img src={user.avatarUrl} alt="" className={styles.avatarSmall} />
                            ) : (
                                <div className={styles.avatarSmall} />
                            )}
                            <span>
                                {user.firstName} {user.lastName}
                            </span>
                        </div>
                        <div className={styles.cardBody}>
                            <div>Email: {user.email}</div>
                            {user.birthDate && <div>{t("profilePage.personalData.birthDate" as any)}: {user.birthDate}</div>}
                        </div>
                        <div style={{ marginTop: 'auto' }}>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(RouteName.ADMIN_PAGE_USER_PROFILE(user.id))}
                            >
                                Просмотр
                            </Button>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    );
}
