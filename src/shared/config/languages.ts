export const LANGUAGES = {
    en: {
        code: 'en',
        name: 'English',
        flag: '🇺🇸',
        dictionary: () => import('../../../public/locales/en.json')
    },
    ru: {
        code: 'ru',
        name: 'Русский',
        flag: '🇷🇺',
        dictionary: () => import('../../../public/locales/ru.json')
    }
} as const;

export type LanguageCode = keyof typeof LANGUAGES;