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

  const filteredTodos = useMemo(() => {
    if (!searchQuery.trim()) return todos;
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [todos, searchQuery]);

  const { sortedTodos } = useTodoSort(filteredTodos, sortOrder);

  if (filteredTodos.length === 0 && !searchQuery) {
    return (
      <div className="mt-6">
        <div className={CSS_CLASSES.EMPTY}>{UI_TEXT.EMPTY_STATE}</div>
      </div>
    );
  }

  if (filteredTodos.length === 0 && searchQuery) {
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
