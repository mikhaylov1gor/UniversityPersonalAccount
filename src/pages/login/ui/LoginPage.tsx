import {LoginCredentialsCard} from "@/features/login/login-credentials";
import {Banner} from "@/features/login/banner";
import styles from "./LoginPage.module.scss";
import {Col, Row} from "react-grid-system";
import LanguageSelector from "@/features/language-selector/ui/LanguageSelect.tsx";
import React from "react";

export function LoginPage() {
    return (
        <>
            <header className={styles.header}>
                <div style={{marginLeft: 'auto'}}>
                    <LanguageSelector/>
                </div>
            </header>
            <div className={styles.loginPageWrapper}>

                <div className={styles.loginPageContent}>
                    <Row gutterWidth={32}>
                    <Col md={12} lg={6}>
                            <Banner/>
                        </Col>
                        <Col md={12} lg={6}>
                            <LoginCredentialsCard/>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}
