import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInEng from '../../../../public/locales/en.json';
import translationsInRus from '../../../../public/locales/ru.json';

const resources = {
    en: {
        translation: translationsInEng
    },
    ru: {
        translation: translationsInRus
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ru",
        debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        ns: "translation",
        defaultNS: "translation"
    });

export default i18n;