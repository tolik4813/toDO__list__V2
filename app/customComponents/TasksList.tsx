'use client';

import TodoItem from '@/app/customComponents/TodoItem';
import { useTodoStore } from '@/app/store/todoStore';
import { CSS_CLASSES } from '@/app/lib/constants';

export default function TasksList() {
  const todos = useTodoStore(state => state.todos);

  if (todos.length === 0) {
    return (
      <div className="mt-6">
        <div className={CSS_CLASSES.EMPTY_STATE}>
          No tasks yet. Add your first task above!
        </div>
      </div>
    );
  }

  return (
    <div className={CSS_CLASSES.TASKS_CONTAINER}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
