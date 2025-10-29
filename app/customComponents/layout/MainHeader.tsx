'use client';
import LanguageSwitcher from '@/app/customComponents/layout/LanguageSwitcher';
import { useTranslate } from '@/app/hooks/useTranslate';

export default function MainHeader() {
  const { t } = useTranslate();
  return (
    <div className="relative flex justify-center items-center w-full h-20 bg-yellow-500 text-black px-4">
      <p className="text-3xl text-center">{t('app.title', 'To-Do List')}</p>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
