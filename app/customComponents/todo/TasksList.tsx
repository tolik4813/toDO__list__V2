'use client';

import { memo } from 'react';
import TodoItem from '@/app/customComponents/todo/TodoItem';
import { useTodoSelectors } from '@/app/hooks/useTodoSelectors';
import { CSS_CLASSES, UI_TEXT } from '@/app/lib/constants';
import VirtualList from '@/app/customComponents/todo/VirtualList';

function TasksList() {
  const { todos } = useTodoSelectors();

  if (todos.length === 0) {
    return (
      <div className="mt-6">
        <div className={CSS_CLASSES.EMPTY}>{UI_TEXT.EMPTY_STATE}</div>
      </div>
    );
  }

  if (todos.length > 100) {
    return <VirtualList items={todos} />;
  }

  return (
    <div className={CSS_CLASSES.SPACING}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default memo(TasksList);
