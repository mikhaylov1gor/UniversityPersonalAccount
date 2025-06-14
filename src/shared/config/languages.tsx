import React, { ReactNode } from 'react'
import { EnFlag } from '@/shared/ui/atoms/Icon/LangEn'

import enJson from '@/app/locales/en.json'
import {RuFlag} from "@/shared/ui/atoms/Icon/LangRu";
type DictionaryType = typeof enJson

export type LanguageCode = 'en' | 'ru'

interface LanguageConfig {
    code: LanguageCode
    name: string
    flag: ReactNode
    dictionary: () => Promise<DictionaryType>
}

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
    en: {
        code: 'en',
        name: 'English',
        flag: <EnFlag />,
dictionary: () => import('@/app/locales/en.json'),
},
ru: {
    code: 'ru',
        name: 'Русский',
        flag: <RuFlag />,
    dictionary: () => import('@/app/locales/ru.json'),
},
}