import React, {useState} from 'react';
import { Input } from '@/shared/ui/atoms/Input/Input.tsx';
import { Button } from '@/shared/ui/atoms/Button/Button.tsx';
import { Col, Row } from 'react-grid-system';
import {useTranslation} from "react-i18next";
import styles from "./AdminEventsSearchBar.module.scss"
import {EventStatus} from "@/shared/models/enums/event/eventStatus.ts";
import {EventType} from "@/shared/models/enums/event/eventType.ts";
import {EventFormat} from "@/shared/models/enums/event/eventFormat.ts";
import DropdownInput from "@/shared/ui/atoms/DropdownInput/DropdownInput.tsx";

interface AdminEventsSearchBarProps {
    name: string;
    status: string;
    eventType: string;
    eventFormat: string;
    eventDate: string;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onStatusChange: (value: string) => void;
    onEventTypeChange: (value: string) => void;
    onEventFormatChange: (value: string) => void;
    onEventDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
}

export function AdminEventsSearchBar({ name, status, eventType, eventFormat, eventDate, onNameChange, onStatusChange, onEventTypeChange, onEventFormatChange, onEventDateChange, onSearch }: AdminEventsSearchBarProps) {
    const {t} = useTranslation()

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="bg-white rounded-xl shadow-lg p-8" style={{padding: 20}}>
                <div className={styles.header}>
                    <h3>
                        Панель поиска
                    </h3>
                    <Button
                        variant={isOpen ? "outline" : "primary"}
                        onClick={() => setIsOpen(!isOpen)}
                        iconRight={isOpen ? "slider-black" : "slider-red"}
                        size={"sm"}
                    >
                        {t("admin.events.main.filters" as any)}
                    </Button>
                </div>
                <Row>
                    <Col md={6} lg={7} xl={9}>
                        <Input
                            width="100%"
                            label={t("events.name" as any)}
                            value={name}
                            onInput={onNameChange}
                        />
                    </Col>
                    <Col md={6} lg={5} xl={3} style={{padding: '10px'}}>
                        <Button width="100%" variant="primary" onClick={onSearch}>
                            {t("events.search" as any)}
                        </Button>
                    </Col>
                </Row>
                {isOpen && (
                    <>
                        <Row style={{marginBottom: '10px'}}>
                            <Col sm={6} xl={6}>
                                <DropdownInput
                                    width="100%"
                                    label={t("admin.events.main.status" as any)}
                                    items={Object.values(EventStatus)}
                                    allowEmpty={false}
                                    value={status}
                                    onChange={onStatusChange}
                                />
                            </Col>
                            <Col sm={6} xl={6}>
                                <DropdownInput
                                    width="100%"
                                    label={t("admin.events.main.type" as any)}
                                    items={Object.values(EventType)}
                                    allowEmpty={false}
                                    value={eventType}
                                    onChange={onEventTypeChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} xl={6}>
                                <DropdownInput
                                    width="100%"
                                    label={t("admin.events.main.format" as any)}
                                    items={Object.values(EventFormat)}
                                    allowEmpty={false}
                                    value={eventFormat}
                                    onChange={onEventFormatChange}
                                />
                            </Col>
                            <Col sm={6} xl={6}>
                                <Input
                                    type={"date"}
                                    width="100%"
                                    label={t("admin.events.main.date" as any)}
                                    value={eventDate ? new Date(eventDate).toISOString().split('T')[0] : ''}
                                    onInput={onEventDateChange}
                                />
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </>
    )
}
