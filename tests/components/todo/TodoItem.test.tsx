import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '@/app/customComponents/todo/TodoItem';
import { Todo } from '@/app/types';

const mockTodo: Todo = {
  id: '1',
  text: 'Test todo',
  completed: false,
  createdAt: new Date(),
};

// Mock the store
jest.mock('@/app/store/todoStore', () => ({
  useTodoStore: () => ({
    toggleTodo: jest.fn(),
    removeTodo: jest.fn(),
    updateTodo: jest.fn(),
  }),
}));

describe('TodoItem', () => {
  it('renders todo text', () => {
    render(<TodoItem todo={mockTodo} />);

    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('shows completed state when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} />);

    expect(screen.getByText('Test todo')).toHaveClass('line-through');
  });

  it('calls toggleTodo when checkbox is clicked', () => {
    const { useTodoStore } = jest.requireMock('@/app/store/todoStore');
    const mockToggleTodo = jest.fn();
    useTodoStore.mockReturnValue({
      toggleTodo: mockToggleTodo,
      removeTodo: jest.fn(),
      updateTodo: jest.fn(),
    });

    render(<TodoItem todo={mockTodo} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockToggleTodo).toHaveBeenCalledWith('1');
  });
});
