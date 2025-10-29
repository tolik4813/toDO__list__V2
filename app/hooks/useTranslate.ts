import { useMemo, useCallback } from 'react';
import { useI18nStore } from '@/app/store/i18nStore';
import en from '@/languages/en.json';
import uk from '@/languages/uk.json';

type TranslationDict = { [key: string]: string | TranslationDict };

const dictionaries: Record<'en' | 'uk', TranslationDict> = {
  en: en as TranslationDict,
  uk: uk as TranslationDict,
};

function getByPath(dict: TranslationDict, path: string): string | undefined {
  const parts = path.split('.');
  let current: string | TranslationDict | undefined = dict;
  for (const key of parts) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = (current as TranslationDict)[key];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

export function useTranslate() {
  const language = useI18nStore(s => s.language);

  const dict = useMemo(
    () => dictionaries[language] ?? dictionaries.en,
    [language]
  );

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const value = getByPath(dict, key);
      if (typeof value === 'string') return value;
      return fallback ?? key;
    },
    [dict]
  );

  const get = useCallback(
    (key: string): string | string[] | TranslationDict | undefined => {
      const parts = key.split('.');
      let current: string | string[] | TranslationDict | undefined = dict;
      for (const k of parts) {
        if (
          current &&
          typeof current === 'object' &&
          k in (current as TranslationDict)
        ) {
          current = (current as TranslationDict)[k] as
            | string
            | string[]
            | TranslationDict;
        } else {
          return undefined;
        }
      }
      return current;
    },
    [dict]
  );

  return { t, get, language };
}
