'use client';
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

  return (
    <div className="relative z-40">
      <aside
        className={`${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 -translate-y-2'
        } absolute left-[-10px] top-[-5px] w-80 max-w-[92vw] rounded-md border border-gray-700 bg-gray-900 p-4 text-gray-200 shadow-xl transition-all`}
        role="menu"
        aria-label="Burger menu"
      >
        <div className="flex items-center justify-between mb-3">
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

        <div className="space-y-3 text-sm">
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
