import React, { ChangeEvent, useState } from 'react';
import i18n from '@/shared/lib/i18n';
import { LanguageCode, LANGUAGES } from '@/shared/config/languages';
import styles from './LanguageSelect.module.scss';

export const LanguageSelect: React.FC = () => {
    const [language, setLanguage] = useState<LanguageCode>(i18n.language as LanguageCode);
    const [isOpen, setIsOpen] = useState(false);

    const chooseLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value as LanguageCode;
        i18n.changeLanguage(newLang);
        setLanguage(newLang);
    };

    return (
        <div className={styles.wrapper}>
            <select
                value={language}
                onChange={chooseLanguage}
                className={styles.select}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
            >
                {Object.entries(LANGUAGES).map(([code, { name }]) => (
                    <option key={code} value={code}>
                        {name}
                    </option>
                ))}
            </select>

            <div className={styles.flag}>{LANGUAGES[language].flag}</div>

            <div
                className={styles.chevron}
                onMouseDown={(e) => {
                    e.preventDefault();
                    const select = document.querySelector(`.${styles.select}`) as HTMLSelectElement;
                    select?.focus();
                }}
            >
                {isOpen ? (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 1L9 5" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                )}
            </div>
        </div>
    );
};

export default LanguageSelect;
