import { useMemo } from 'react';
import { Todo } from '@/app/types/todo';
import { SortOrder } from '@/app/store/todoStore';

export const useTodoSort = (todos: Todo[], sortOrder: SortOrder) => {
  const sortedTodos = useMemo(() => {
    const todosCopy = [...todos];

    switch (sortOrder) {
      case 'newest':
        return todosCopy.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
      case 'oldest':
        return todosCopy.sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        );
      case 'a-z':
        return todosCopy.sort((a, b) => a.text.localeCompare(b.text));
      case 'z-a':
        return todosCopy.sort((a, b) => b.text.localeCompare(a.text));
      default:
        return todosCopy;
    }
  }, [todos, sortOrder]);

  return { sortedTodos };
};
