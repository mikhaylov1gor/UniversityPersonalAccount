import React from 'react';
import { Row, Col } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import {AdminCard} from "@/features/admin/admin-card";

export const AdminPage: React.FC = () => {
    const { t } = useTranslation();

    const cards = [
        {
            iconName: 'user-black',
            title: t('admin.nav.users' as any),
            description: t('admin.nav.usersDesc' as any),
            to: '/admin/users',
        },
        {
            iconName: 'link-black',
            title: t('admin.nav.usefulServices' as any),
            description: t('admin.nav.usefulServicesDesc' as any),
            to: '/admin/services',
        },
        {
            iconName: 'map-black',
            title: t('admin.nav.events' as any),
            description: t('admin.nav.eventsDesc' as any),
            to: '/admin/events',
        },
    ];

    return (
        <Row align={'stretch'}>
            {cards.map((c, idx) => (
                <Col key={idx} xs={12} sm={12} md={6} lg={4}>
                    <AdminCard
                        iconName={c.iconName}
                        title={c.title}
                        description={c.description}
                        to={c.to}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default AdminPage;