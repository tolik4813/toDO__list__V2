'use client';
import { useI18nStore } from '@/app/store/i18nStore';

export default function LanguageSwitcher() {
  const language = useI18nStore(s => s.language);
  const setLanguage = useI18nStore(s => s.setLanguage);

  const isUk = language === 'uk';

  return (
    <div
      className="inline-flex items-center rounded-md border border-gray-600 bg-gray-800 p-1"
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={!isUk}
        className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors duration-200 ${
          !isUk
            ? 'bg-yellow-500 text-black'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('uk')}
        aria-pressed={isUk}
        className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors duration-200 ${
          isUk
            ? 'bg-yellow-500 text-black'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        UK
      </button>
    </div>
  );
}
