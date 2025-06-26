import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInEng from '@/app/locales/en.json';
import translationsInRus from '@/app/locales/ru.json';
import translationsInZh from '@/app/locales/cn.json';

const resources = {
    en: {
        translation: translationsInEng
    },
    ru: {
        translation: translationsInRus
    },
    zh: {
        translation: translationsInZh
    }
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