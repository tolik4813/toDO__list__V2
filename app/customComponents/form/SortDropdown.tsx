'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUiStore } from '@/app/store/uiStore';
import { SortOrder } from '@/app/types';
import { UI_TEXT } from '@/app/lib/constants';
import { useTranslate } from '@/app/hooks/useTranslate';

export default function SortDropdown() {
  const { t } = useTranslate();
  const sortOrder = useUiStore(state => state.sortOrder);
  const setSortOrder = useUiStore(state => state.setSortOrder);

  const handleValueChange = (value: string) => {
    setSortOrder(value as SortOrder);
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full mt-4">
      <label className="text-sm text-gray-400 w-full sm:w-96 text-center">
        {t('app.sort.label', UI_TEXT.SORT_LABEL)}
      </label>
      <Select value={sortOrder} onValueChange={handleValueChange}>
        <SelectTrigger className="bg-gray-800 border-yellow-500 text-white hover:bg-gray-700 hover:border-yellow-400 focus-visible:border-yellow-400 focus-visible:ring-yellow-400/50 focus-visible:ring-[2px] w-full sm:w-96 transition-all duration-200 hover:scale-[1.01]">
          <SelectValue placeholder={t('app.sort.label', UI_TEXT.SORT_LABEL)} />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-white">
          <SelectItem
            value="newest"
            className="hover:bg-yellow-500/20 focus:bg-yellow-500/20"
          >
            {t('app.sort.newest', UI_TEXT.SORT_NEWEST)}
          </SelectItem>
          <SelectItem
            value="oldest"
            className="hover:bg-yellow-500/20 focus:bg-yellow-500/20"
          >
            {t('app.sort.oldest', UI_TEXT.SORT_OLDEST)}
          </SelectItem>
          <SelectItem
            value="a-z"
            className="hover:bg-yellow-500/20 focus:bg-yellow-500/20"
          >
            {t('app.sort.az', UI_TEXT.SORT_A_Z)}
          </SelectItem>
          <SelectItem
            value="z-a"
            className="hover:bg-yellow-500/20 focus:bg-yellow-500/20"
          >
            {t('app.sort.za', UI_TEXT.SORT_Z_A)}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
