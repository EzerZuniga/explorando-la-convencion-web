import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { LANGUAGES, translations, type LanguageCode, type TranslationContent } from './translations';

const LANGUAGE_STORAGE_KEY = 'portal-language';
const DEFAULT_LANGUAGE: LanguageCode = 'es';

type LanguageContextValue = {
  language: LanguageCode;
  locale: string;
  content: TranslationContent;
  setLanguage: (language: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function isLanguageCode(value: string | null | undefined): value is LanguageCode {
  return LANGUAGES.some((language) => language.code === value);
}

function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isLanguageCode(savedLanguage)) return savedLanguage;

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  const setLanguage = (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    const metadata = LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0];

    return {
      language,
      locale: metadata.locale,
      content: translations[language],
      setLanguage,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider.');
  }

  return context;
}
