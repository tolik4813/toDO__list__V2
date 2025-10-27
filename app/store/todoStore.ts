import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo } from '@/app/types/todo';

interface TodoStore {
  todos: Todo[];
  searchQuery: string;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
  updateTodo: (id: string, text: string) => void;
  setSearchQuery: (query: string) => void;
}

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    set => ({
      todos: [],
      searchQuery: '',
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
      clearCompleted: () =>
        set(state => ({
          todos: state.todos.filter(todo => !todo.completed),
        })),
      updateTodo: (id: string, text: string) =>
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, text: text.trim() } : todo
          ),
        })),
      setSearchQuery: (query: string) => set({ searchQuery: query }),
    }),
    {
      name: 'todo-storage',
      partialize: state => ({ todos: state.todos }),
    }
  )
);
