import { render, screen } from '@testing-library/react';
import TasksList from '@/app/customComponents/todo/TasksList';

// Mock the hooks
jest.mock('@/app/hooks/useTodoSelectors', () => ({
  useTodoSelectors: () => ({
    todos: [],
  }),
}));

jest.mock('@/app/hooks/useTodoSort', () => ({
  useTodoSort: () => ({
    sortedTodos: [],
  }),
}));

jest.mock('@/app/store/uiStore', () => ({
  useUiStore: () => ({
    searchQuery: '',
    sortOrder: 'newest',
    filterType: 'all',
  }),
}));

describe('TasksList', () => {
  it('renders empty state when no todos', () => {
    render(<TasksList />);

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('renders nothing found when filtered results are empty', () => {
    // Mock with search query but no results
    jest.doMock('@/app/store/uiStore', () => ({
      useUiStore: () => ({
        searchQuery: 'test',
        sortOrder: 'newest',
        filterType: 'all',
      }),
    }));

    render(<TasksList />);

    expect(screen.getByText(/nothing found/i)).toBeInTheDocument();
  });
});
