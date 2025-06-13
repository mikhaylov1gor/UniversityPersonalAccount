import React, {useState} from "react";
import i18n from '../../../shared/lib/i18n';
import {LanguageCode, LANGUAGES} from "@/shared/config/languages.ts";

const LanguageSelector = () => {

    const [language, setLanguage] = useState(i18n.language);

    const chooseLanguage = (e) => {
        e.preventDefault();
        i18n.changeLanguage(e.target.value);
        setLanguage(e.target.value);
    }

    return (
        <div className="w-full flex justify-end p-4 bg-gray-100">
            <select defaultValue={language} onChange={chooseLanguage}
                    className="border border-gray-300 rounded-md p-1 bg-transparent text-sm">
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                    <option key={code} value={code}>
                        {lang.name} {lang.flag}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;