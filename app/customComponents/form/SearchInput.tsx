'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { CSS_CLASSES } from '@/app/lib/constants';
import { useUiStore } from '@/app/store/uiStore';
import { useTodoStore } from '@/app/store/todoStore';
import { useTranslate } from '@/app/hooks/useTranslate';

export default function SearchInput() {
  const { t } = useTranslate();
  const [searchQuery, setSearchQuery] = useState('');
  const todos = useTodoStore(state => state.todos);
  const setSearchQueryStore = useUiStore(state => state.setSearchQuery);

  useEffect(() => {
    setSearchQueryStore(searchQuery);
  }, [searchQuery, setSearchQueryStore]);

  const filteredTodosCount = useMemo(() => {
    if (!searchQuery.trim()) return todos.length;
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    ).length;
  }, [todos, searchQuery]);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col gap-2 mt-4 items-center w-full">
      <div className="relative w-full sm:w-auto">
        <Input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={t('app.search', 'Search tasks...')}
          className="bg-gray-800 border-yellow-500 text-white placeholder-gray-400 focus-visible:border-yellow-400 focus-visible:ring-yellow-400/50 focus-visible:ring-[2px] focus-visible:outline-none w-full sm:w-96 transition-all duration-200 focus:scale-[1.02] pr-8"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            x
          </button>
        )}
      </div>
      {searchQuery && (
        <div className="text-sm text-gray-400 text-center">
          {t('todo.found', 'Found')}: {filteredTodosCount}{' '}
          {t('todo.tasks', 'tasks')}
        </div>
      )}
    </div>
  );
}
