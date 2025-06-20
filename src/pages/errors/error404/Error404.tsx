import React from 'react';
import styles from '@/pages/errors/Error.module.scss';
import { Link } from 'react-router-dom';
import {RouteName} from "@/shared/config/router";

export function Error404() {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.tape} ${styles.tape1}`}></div>
            <div className={`${styles.tape} ${styles.tape2}`}></div>

            <div className={styles.content}>
                <h1 className={styles.code}>404</h1>
                <div className={styles.headerRow}>
                    <div className={styles.titles}>
                        <h1>Page not found</h1>
                        <h1>Страница не найдена</h1>
                    </div>

                    <Link to={RouteName.EVENTS_PAGE} className={styles.button}>
                        ВЕРНУТЬСЯ НА ГЛАВНУЮ
                    </Link>
                </div>
                <h3>Что случилось?</h3>
                <p>Возможно, такой страницы не существует или вы ошиблись при вводе адреса в строку браузера.</p>
            </div>
        </div>
    );
};