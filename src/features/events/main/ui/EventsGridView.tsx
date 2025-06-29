import React from 'react';
import { Col, Row } from 'react-grid-system';

import {FileDto} from "@/shared/models/responses/fileDto.ts";
import {EventType} from "@/shared/models/enums/event/eventType.ts";
import {EventFormat} from "@/shared/models/enums/event/eventFormat.ts";
import {EventAuditory} from "@/shared/models/enums/event/eventAuditory.ts";
import {EventStatus} from "@/shared/models/enums/event/eventStatus.ts";
import {EventCard} from "@/features/events/main/ui/EventCard.tsx";

interface EventsGridViewProps {
    events: Array<{
        id: string,
        title: string | null,
        description: string | null,
        picture: FileDto,
        isTimeFromNeeded: boolean,
        dateTimeFrom: string | null,
        isTimeToNeeded: boolean,
        dateTimeTo: string | null,
        type: EventType,
        format: EventFormat,
        auditory: EventAuditory,
        status: EventStatus
    }>;
}

export function EventsGridView({ events }: EventsGridViewProps) {
    return (
        <Row align="stretch" gutterWidth={20}>
            {events.map((event) => (
                <Col key={event.id} xl={6} style={{ display: 'flex' }}>
                    <div style={{ marginBottom: 20, width: '100%' }}>
                        <EventCard
                            eventId={event?.id}
                            imageId={event.picture?.id}
                            title={event?.title}
                            dateFrom={event?.dateTimeFrom}
                            dateTo={event?.dateTimeTo}
                            format={event?.format.toString()}
                            status={event?.status as string}
                        />
                    </div>
                </Col>
            ))}
        </Row>
    );
}
