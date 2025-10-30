import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, SortOrder, FilterType } from '@/app/types';

interface TodoStore {
  todos: Todo[];
  searchQuery: string;
  sortOrder: SortOrder;
  filterType: FilterType;
  addTodo: (text: string, tags?: string[]) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
  updateTodo: (id: string, text: string) => void;
  setSearchQuery: (query: string) => void;
  setSortOrder: (order: SortOrder) => void;
  setFilterType: (type: FilterType) => void;
}

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    set => ({
      todos: [],
      searchQuery: '',
      sortOrder: 'newest',
      filterType: 'all',
      addTodo: (text: string, tags?: string[]) =>
        set(state => ({
          todos: [
            ...state.todos,
            {
              id: generateId(),
              text,
              completed: false,
              createdAt: new Date(),
              tags: tags && tags.length ? tags : [],
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
      setSortOrder: (order: SortOrder) => set({ sortOrder: order }),
      setFilterType: (type: FilterType) => set({ filterType: type }),
    }),
    {
      name: 'todo-storage',
      partialize: state => ({ todos: state.todos }),
      onRehydrateStorage: () => state => {
        if (state?.todos) {
          state.todos = state.todos.map(todo => ({
            ...todo,
            createdAt:
              todo.createdAt instanceof Date
                ? todo.createdAt
                : new Date(
                    (todo.createdAt as string | number | Date) || Date.now()
                  ),
          }));
        }
      },
    }
  )
);
