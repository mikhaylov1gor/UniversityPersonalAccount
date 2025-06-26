import React from 'react';
import { Input } from '@/shared/ui/atoms/Input/Input.tsx';
import { Button } from '@/shared/ui/atoms/Button/Button.tsx';
import { Col, Row } from 'react-grid-system';
import {useTranslation} from "react-i18next";

interface EventsSearchBarProps {
    name: string;
    eventDate: string;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEventDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
}

export function EventsSearchBar({ name, eventDate, onNameChange, onEventDateChange, onSearch }: EventsSearchBarProps) {
    const {t} = useTranslation()
    return (
        <>
            <div className="bg-white rounded-xl shadow-lg p-8" style={{padding: 20}}>
                <Row>
                    <Col md={6} lg={7} xl={8}>
                        <Input
                            width="100%"
                            label={t("events.name" as any)}
                            value={name}
                            onInput={onNameChange}
                        />
                    </Col>
                    <Col md={6} lg={5} xl={4} style={{padding: '10px'}}>
                        <Button width="100%" variant="primary" onClick={onSearch}>
                            {t("events.search" as any)}
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} lg={5} xl={4}>
                        <Input
                            type={"date"}
                            width="100%"
                            label={t("events.date" as any)}
                            value={eventDate}
                            onInput={onEventDateChange}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}
