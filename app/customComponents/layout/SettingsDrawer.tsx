'use client';
import { useEffect } from 'react';
import { useUiStore } from '@/app/store/uiStore';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslate } from '@/app/hooks/useTranslate';

export default function SettingsDrawer() {
  const { t } = useTranslate();
  const isOpen = useUiStore(s => s.isMenuOpen);
  const setOpen = useUiStore(s => s.setMenuOpen);
  const {
    showLanguageSwitcher,
    showTagFilter,
    showTagInput,
    showSearch,
    showProgress,
    showFilterButtons,
    showSortDropdown,
    setToggle,
  } = useUiStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  return (
    <div className={`fixed inset-0 z-40 ${isOpen ? 'visible' : 'invisible'}`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] border-r border-gray-700 bg-gray-900 text-gray-200 shadow-2xl transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Settings sidebar"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold">
            {t('settings.title', 'Settings')}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-sm p-4">
          <label className="flex items-center gap-2">
            <Checkbox
              checked={showLanguageSwitcher}
              onCheckedChange={v =>
                setToggle('showLanguageSwitcher', Boolean(v))
              }
            />
            {t('settings.showLanguage', 'Show language switcher')}
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={showTagFilter}
              onCheckedChange={v => setToggle('showTagFilter', Boolean(v))}
            />
            {t('settings.showTagFilter', 'Show tag filter')}
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={showTagInput}
              onCheckedChange={v => setToggle('showTagInput', Boolean(v))}
            />
            {t('settings.showTagInput', 'Show tag input')}
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={showSearch}
              onCheckedChange={v => setToggle('showSearch', Boolean(v))}
            />
            {t('settings.showSearch', 'Show search')}
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={showProgress}
              onCheckedChange={v => setToggle('showProgress', Boolean(v))}
            />
            {t('settings.showProgress', 'Show progress bar')}
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={showFilterButtons}
              onCheckedChange={v => setToggle('showFilterButtons', Boolean(v))}
            />
            {t('settings.showFilterButtons', 'Show filter buttons')}
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={showSortDropdown}
              onCheckedChange={v => setToggle('showSortDropdown', Boolean(v))}
            />
            {t('settings.showSort', 'Show sort dropdown')}
          </label>
        </div>
      </aside>
    </div>
  );
}
