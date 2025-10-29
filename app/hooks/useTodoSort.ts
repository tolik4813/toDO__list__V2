import { useMemo } from 'react';
import { Todo } from '@/app/types/todo';
import { SortOrder } from '@/app/store/uiStore';

const getDateValue = (date: Date | string): number => {
  if (date instanceof Date) {
    return date.getTime();
  }
  return new Date(date).getTime();
};

export const useTodoSort = (todos: Todo[], sortOrder: SortOrder) => {
  const sortedTodos = useMemo(() => {
    const todosCopy = [...todos];

    switch (sortOrder) {
      case 'newest':
        return todosCopy.sort(
          (a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt)
        );
      case 'oldest':
        return todosCopy.sort(
          (a, b) => getDateValue(a.createdAt) - getDateValue(b.createdAt)
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
