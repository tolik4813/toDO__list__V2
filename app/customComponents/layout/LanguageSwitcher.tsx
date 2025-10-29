'use client';
import { useI18nStore } from '@/app/store/i18nStore';
import { Button } from '@/components/ui/button';

export default function LanguageSwitcher() {
  const language = useI18nStore(s => s.language);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'secondary'}
        size="sm"
        onClick={() => useI18nStore.getState().setLanguage('en')}
        aria-pressed={language === 'en'}
      >
        EN
      </Button>
      <Button
        variant={language === 'uk' ? 'default' : 'secondary'}
        size="sm"
        onClick={() => useI18nStore.getState().setLanguage('uk')}
        aria-pressed={language === 'uk'}
      >
        UK
      </Button>
    </div>
  );
}
