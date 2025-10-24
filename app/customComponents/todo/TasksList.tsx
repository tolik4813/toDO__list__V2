'use client';

import { memo } from 'react';
import TodoItem from '@/app/customComponents/todo/TodoItem';
import { useTodoStore } from '@/app/store/todoStore';
import { CSS_CLASSES, UI_TEXT } from '@/app/lib/constants';

function TasksList() {
  const todos = useTodoStore(state => state.todos);

  if (todos.length === 0) {
    return (
      <div className="mt-6">
        <div className={CSS_CLASSES.EMPTY}>{UI_TEXT.EMPTY_STATE}</div>
      </div>
    );
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
