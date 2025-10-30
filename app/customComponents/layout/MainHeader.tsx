'use client';
import LanguageSwitcher from '@/app/customComponents/layout/LanguageSwitcher';
import { useTranslate } from '@/app/hooks/useTranslate';
import TagFilter from '@/app/customComponents/tags/TagFilter';
import BurgerButton from '@/app/customComponents/layout/BurgerButton';
import SettingsDrawer from '@/app/customComponents/layout/SettingsDrawer';
import { useUiStore } from '@/app/store/uiStore';

export default function MainHeader() {
  const { t } = useTranslate();
  const showTagFilter = useUiStore(s => s.showTagFilter);
  const showLanguageSwitcher = useUiStore(s => s.showLanguageSwitcher);
  return (
    <div className="relative flex justify-between items-center w-full h-20 bg-yellow-500 text-black px-4">
      {/* Left controls: burger and menu positioned near button */}
      <div className="relative flex items-center gap-2">
        <BurgerButton />
        <SettingsDrawer />
      </div>

      {/* Title - centered */}
      <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-bold flex-1">
        {t('app.title', 'To-Do List')}
      </h1>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {showTagFilter && <TagFilter />}
        {showLanguageSwitcher && (
          <div className="w-16 sm:w-20 flex justify-end">
            <LanguageSwitcher />
          </div>
        )}
      </div>
    </div>
  );
}
