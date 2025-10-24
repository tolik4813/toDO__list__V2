import { create } from 'zustand';
import { Todo } from '@/app/types/todo';

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useTodoStore = create<TodoStore>(set => ({
  todos: [],
  addTodo: (text: string) =>
    set(state => ({
      todos: [
        ...state.todos,
        {
          id: generateId(),
          text,
          completed: false,
          createdAt: new Date(),
        },
      ],
    })),
  toggleTodo: (id: string) =>
    set(state => ({
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  removeTodo: (id: string) =>
    set(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    })),
}));
