'use client';

import { useTodoStore, FilterType } from '@/app/store/todoStore';
import { CSS_CLASSES, UI_TEXT } from '@/app/lib/constants';
import { useTranslate } from '@/app/hooks/useTranslate';

const filtersBase = [
  { type: 'all', labelKey: 'app.filters.all', fallback: UI_TEXT.FILTER_ALL },
  {
    type: 'active',
    labelKey: 'app.filters.active',
    fallback: UI_TEXT.FILTER_ACTIVE,
  },
  {
    type: 'completed',
    labelKey: 'app.filters.completed',
    fallback: UI_TEXT.FILTER_COMPLETED,
  },
] as const;

export default function FilterButtons() {
  const { t } = useTranslate();
  const filterType = useTodoStore(state => state.filterType);
  const setFilterType = useTodoStore(state => state.setFilterType);

  return (
    <div className="flex flex-col gap-2 items-center w-full mt-4">
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-96">
        {filtersBase.map(filter => (
          <button
            key={filter.type}
            onClick={() => setFilterType(filter.type)}
            className={`${CSS_CLASSES.FILTER_BUTTON} ${
              filterType === filter.type
                ? CSS_CLASSES.FILTER_BUTTON_ACTIVE
                : CSS_CLASSES.FILTER_BUTTON_INACTIVE
            } w-full sm:w-auto flex-1`}
          >
            {t(filter.labelKey, filter.fallback)}
          </button>
        ))}
      </div>
    </div>
  );
}
