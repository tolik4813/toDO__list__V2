import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LanguageCode = 'en' | 'uk';

interface I18nStore {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  toggleLanguage: () => void;
}

export const useI18nStore = create<I18nStore>()(
  persist(
    set => ({
      language: 'en',
      setLanguage: (lang: LanguageCode) => set({ language: lang }),
      toggleLanguage: () =>
        set(state => ({ language: state.language === 'en' ? 'uk' : 'en' })),
    }),
    {
      name: 'i18n-storage',
      partialize: state => ({ language: state.language }),
    }
  )
);
