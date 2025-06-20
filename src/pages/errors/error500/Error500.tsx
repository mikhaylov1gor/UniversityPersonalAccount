import React from 'react';
import styles from '@/pages/errors/Error.module.scss';
import { Link } from 'react-router-dom';
import {RouteName} from "@/shared/config/router";

export function Error500(){
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.tape} ${styles.tape1}`}>Ошибка</div>
            <div className={`${styles.tape} ${styles.tape2}`}>Ошибка</div>

            <div className={styles.content}>
                <h1 className={styles.code}>500</h1>
                <div className={styles.headerRow}>
                    <div className={styles.titles}>
                        <h1 className={styles.title}>Internal Server Error</h1>
                        <h1 className={styles.title}>Ошибка сервера</h1>
                    </div>

                    <Link to={RouteName.EVENTS_PAGE} className={styles.button}>
                        ВЕРНУТЬСЯ НА ГЛАВНУЮ
                    </Link>
                </div>
                <p className={styles.description}>
                    Что случилось?<br/>
                    Возможно, на сервере произошла внутренняя ошибка или проводятся кратковременные технические работы!
                </p>
            </div>
        </div>
    );
}