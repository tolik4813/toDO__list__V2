import { render, screen } from '@testing-library/react';
import { ToDoContainer } from '@/app/customComponents/layout/ToDoContainer';

// Mock all the stores
jest.mock('@/app/store/todoStore', () => ({
  useTodoStore: () => ({
    todos: [],
    addTodo: jest.fn(),
    toggleTodo: jest.fn(),
    removeTodo: jest.fn(),
    clearCompleted: jest.fn(),
    updateTodo: jest.fn(),
  }),
}));

jest.mock('@/app/store/uiStore', () => ({
  useUiStore: () => ({
    searchQuery: '',
    sortOrder: 'newest',
    filterType: 'all',
    setSearchQuery: jest.fn(),
    setSortOrder: jest.fn(),
    setFilterType: jest.fn(),
  }),
}));

jest.mock('@/app/store/i18nStore', () => ({
  useI18nStore: () => ({
    language: 'en',
    setLanguage: jest.fn(),
    toggleLanguage: jest.fn(),
  }),
}));

describe('ToDoContainer Integration', () => {
  it('renders the complete todo app', () => {
    render(<ToDoContainer />);

    expect(screen.getByText(/my custom to-do app/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search tasks/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your task/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add task/i })
    ).toBeInTheDocument();
  });

  it('shows empty state when no todos', () => {
    render(<ToDoContainer />);

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });
});
