import React, {useState} from 'react';
import { Input } from '@/shared/ui/atoms/Input/Input.tsx';
import { Button } from '@/shared/ui/atoms/Button/Button.tsx';
import { Col, Row } from 'react-grid-system';
import {useTranslation} from "react-i18next";
import styles from "./AdminEventsSearchBar.module.scss"

interface AdminEventsSearchBarProps {
    name: string;
    status: string;
    eventType: string;
    eventFormat: string;
    eventDate: string;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEventTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEventFormatChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
                        width={'sm'}
                    >
                        {t("admin.events.main.filters")}
                    </Button>
                </div>
                <Row>
                    <Col md={6} lg={7} xl={9}>
                        <Input
                            width="100%"
                            label={t("events.name")}
                            value={name}
                            onInput={onNameChange}
                        />
                    </Col>
                    <Col md={6} lg={5} xl={3} style={{padding: '10px'}}>
                        <Button width="100%" variant="primary" onClick={onSearch}>
                            {t("events.search")}
                        </Button>
                    </Col>
                </Row>
                {isOpen && (
                    <>
                        <Row style={{marginBottom: '10px'}}>
                            <Col sm={6} xl={6}>
                                <Input
                                    width="100%"
                                    label={t("admin.events.main.status")}
                                    value={status}
                                    onInput={onStatusChange}
                                />
                            </Col>
                            <Col sm={6} xl={6}>
                                <Input
                                    width="100%"
                                    label={t("admin.events.main.type")}
                                    value={eventType}
                                    onInput={onEventTypeChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} xl={6}>
                                <Input
                                    width="100%"
                                    label={t("admin.events.main.format")}
                                    value={eventFormat}
                                    onInput={onEventFormatChange}
                                />
                            </Col>
                            <Col sm={6} xl={6}>
                                <Input
                                    type={"date"}
                                    width="100%"
                                    label={t("admin.events.main.date")}
                                    value={eventDate}
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
