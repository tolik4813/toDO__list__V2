'use client';
import LanguageSwitcher from '@/app/customComponents/layout/LanguageSwitcher';
import { useTranslate } from '@/app/hooks/useTranslate';

export default function MainHeader() {
  const { t } = useTranslate();
  return (
    <div className="relative flex justify-between items-center w-full h-20 bg-yellow-500 text-black px-4">
      {/* Spacer for centering on mobile */}
      <div className="w-16 sm:w-20" />

      {/* Title - centered */}
      <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-bold flex-1">
        {t('app.title', 'To-Do List')}
      </h1>

      {/* Language switcher */}
      <div className="w-16 sm:w-20 flex justify-end">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
