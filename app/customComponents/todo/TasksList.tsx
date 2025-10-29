'use client';

import { memo, useMemo } from 'react';
import TodoItem from '@/app/customComponents/todo/TodoItem';
import { useTodoSelectors } from '@/app/hooks/useTodoSelectors';
import { useTodoSort } from '@/app/hooks/useTodoSort';
import { useTodoStore } from '@/app/store/todoStore';
import { CSS_CLASSES, UI_TEXT } from '@/app/lib/constants';
import VirtualList from '@/app/customComponents/todo/VirtualList';

function TasksList() {
  const { todos } = useTodoSelectors();
  const searchQuery = useTodoStore(state => state.searchQuery);
  const sortOrder = useTodoStore(state => state.sortOrder);
  const filterType = useTodoStore(state => state.filterType);

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
        <div className={CSS_CLASSES.EMPTY}>{UI_TEXT.EMPTY_STATE}</div>
      </div>
    );
  }

  if (hasNoResults) {
    return (
      <div className="mt-6">
        <div className={CSS_CLASSES.EMPTY}>Nothing found</div>
      </div>
    );
  }

  if (sortedTodos.length > 100) {
    return <VirtualList items={sortedTodos} />;
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
