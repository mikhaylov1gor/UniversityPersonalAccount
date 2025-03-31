import React, { createContext, useState, useEffect } from 'react';
import { LANGUAGES, LanguageCode } from '../../shared/config/languages';

type ContextType = {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: (key: string) => string;
};

export const LanguageContext = createContext<ContextType>(null!);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<LanguageCode>('ru');
    const [dictionary, setDictionary] = useState<Record<string, string>>({});

    useEffect(() => {
        LANGUAGES[language].dictionary().then(mod => {
            setDictionary(mod.default);
        });
    }, [language]);

    const t = (key: string): string => {
        return dictionary[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};