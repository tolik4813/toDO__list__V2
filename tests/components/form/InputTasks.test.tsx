import { render, screen } from '@testing-library/react';
import InputTasks from '@/app/customComponents/form/InputTasks';

// Mock the useTodoForm hook
jest.mock('@/app/hooks/useTodoForm', () => ({
  useTodoForm: () => ({
    text: '',
    error: null,
    isSubmitting: false,
    handleSubmit: jest.fn(),
    handleInputChange: jest.fn(),
    clearError: jest.fn(),
  }),
}));

describe('InputTasks', () => {
  it('renders input and button', () => {
    render(<InputTasks />);

    expect(screen.getByPlaceholderText(/enter your task/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add task/i })
    ).toBeInTheDocument();
  });

  it('shows clear completed button when there are completed tasks', () => {
    // Mock useTodoSelectors to return completed tasks
    jest.doMock('@/app/hooks/useTodoSelectors', () => ({
      useTodoSelectors: () => ({
        clearCompleted: jest.fn(),
        todoCount: { completed: 1 },
      }),
    }));

    render(<InputTasks />);

    expect(screen.getByTitle(/clear completed/i)).toBeInTheDocument();
  });
});
