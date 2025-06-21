import React from 'react';
import { Input } from '@/shared/ui/atoms/Input/Input.tsx';
import { Button } from '@/shared/ui/atoms/Button/Button.tsx';
import { Col, Row } from 'react-grid-system';

interface UsersSearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
}

export function UsersSearchBar({ value, onChange, onSearch }: UsersSearchBarProps) {
    return (
        <Row>
            <Col lg={8} xl={9}>
                <Input
                    width="100%"
                    value={value}
                    placeholder="Введите имя или email"
                    iconLeft="search-magnifying-glass-black"
                    onInput={onChange}
                />
            </Col>
            <Col lg={4} xl={3}  style={{ padding: '10px' }}>
                <Button width="100%" variant="primary" onClick={onSearch}>
                    Найти
                </Button>
            </Col>
        </Row>
    );
}
