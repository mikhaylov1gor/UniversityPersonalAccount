import React, {useEffect, useState} from 'react';
import { Col, Row } from 'react-grid-system';

import {AdminEventCard} from "@/features/admin/events/main/ui/AdminEventCard.tsx";
import {EventDto} from "@/shared/models/responses/event/eventDto.ts";

interface AdminEventsGridViewProps {
    events: EventDto[];
}

export function AdminEventsGridView({ events }: AdminEventsGridViewProps) {
    return (
        <Row align="stretch" gutterWidth={20}>
            {events.map((event) => (
                <Col key={event.id} xl={12} style={{ display: 'flex' }}>
                    <div style={{ marginBottom: 20, width: '100%' }}>
                        <AdminEventCard
                            event={event}
                        />
                    </div>
                </Col>
            ))}
        </Row>
    );
}
