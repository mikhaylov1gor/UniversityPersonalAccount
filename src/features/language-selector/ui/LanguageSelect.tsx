import React, {ChangeEvent, useState} from 'react'
import i18n from '@/shared/lib/i18n'
import {LanguageCode, LANGUAGES} from '@/shared/config/languages'

export const LanguageSelector: React.FC = () => {
    const [language, setLanguage] = useState<LanguageCode>(
        i18n.language as LanguageCode
    )

    const chooseLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value as LanguageCode
        i18n.changeLanguage(newLang)
        setLanguage(newLang)
    }

    return (
        <div className="relative inline-flex items-center">
            <select
                value={language}
                onChange={chooseLanguage}
                className="focus:outline-none appearance-none pl-0 pr-0 py-1 text-transparent opacity-0 mr-2"
            >
                {Object.entries(LANGUAGES).map(([code, {name}]) => (
                    <option key={code} value={code}>
                        {name}
                    </option>
                ))}
            </select>

            <div className="pointer-events-none absolute left-2 top-1/2 transform -translate-y-1/2">
                {LANGUAGES[language].flag}
            </div>

            <div className="pointer-events-none absolute left-10 top-1/2 transform -translate-y-1/2">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 1L5 5L9 1"
                        stroke="#555"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    )
}

export default LanguageSelector