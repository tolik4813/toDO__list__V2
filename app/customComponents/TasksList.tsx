'use client';

import TodoItem from '@/app/customComponents/TodoItem';
import { useTodoStore } from '@/app/store/todoStore';

export default function TasksList() {
  const todos = useTodoStore(state => state.todos);

  if (todos.length === 0) {
    return (
      <div className="mt-6">
        <div className="text-center text-gray-400 py-8">
          No tasks yet. Add your first task above!
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
