'use client';

import { memo, useMemo } from 'react';
import TodoItem from '@/app/customComponents/todo/TodoItem';
import { useTodoSelectors } from '@/app/hooks/useTodoSelectors';
import { useTodoSort } from '@/app/hooks/useTodoSort';
import { useUiStore } from '@/app/store/uiStore';
import { CSS_CLASSES, UI_TEXT } from '@/app/lib/constants';
import { useTranslate } from '@/app/hooks/useTranslate';

function TasksList() {
  const { t } = useTranslate();
  const { todos } = useTodoSelectors();
  const searchQuery = useUiStore(state => state.searchQuery);
  const sortOrder = useUiStore(state => state.sortOrder);
  const filterType = useUiStore(state => state.filterType);

  const filteredTodos = useMemo(() => {
    let result = todos;

    if (searchQuery.trim()) {
      result = result.filter(todo =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (filterType === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    return result;
  }, [todos, searchQuery, filterType]);

  const { sortedTodos } = useTodoSort(filteredTodos, sortOrder);

  const hasNoResults = sortedTodos.length === 0;

  if (hasNoResults && !searchQuery && filterType === 'all') {
    return (
      <div className="mt-6">
        <div className={CSS_CLASSES.EMPTY}>
          {t('todo.empty', UI_TEXT.EMPTY_STATE)}
        </div>
      </div>
    );
  }

  if (hasNoResults) {
    return (
      <div className="mt-6">
        <div className={CSS_CLASSES.EMPTY}>
          {t('todo.nothing', 'Nothing found')}
        </div>
      </div>
    );
  }

  return (
    <div className={CSS_CLASSES.SPACING}>
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default memo(TasksList);
