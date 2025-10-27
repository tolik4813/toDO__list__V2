import { render, screen } from '@testing-library/react';
import InputTasks from '@/app/customComponents/form/InputTasks';
import { useTodoForm } from '@/app/hooks/useTodoForm';
import { useTodoSelectors } from '@/app/hooks/useTodoSelectors';

jest.mock('@/app/hooks/useTodoForm');
jest.mock('@/app/hooks/useTodoSelectors');

const mockUseTodoForm = useTodoForm as jest.MockedFunction<typeof useTodoForm>;
const mockUseTodoSelectors = useTodoSelectors as jest.MockedFunction<
  typeof useTodoSelectors
>;

describe('InputTasks', () => {
  const mockClearCompleted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTodoSelectors.mockReturnValue({
      todos: [],
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      removeTodo: jest.fn(),
      clearCompleted: mockClearCompleted,
      updateTodo: jest.fn(),
      completedTodos: [],
      activeTodos: [],
      todoCount: { total: 0, completed: 0, active: 0 },
    });
  });

  it('should render input field', () => {
    mockUseTodoForm.mockReturnValue({
      text: '',
      error: null,
      isSubmitting: false,
      handleSubmit: jest.fn(),
      handleInputChange: jest.fn(),
      clearError: jest.fn(),
    });

    render(<InputTasks />);
    expect(screen.getByPlaceholderText(/Enter your task/i)).toBeInTheDocument();
  });

  it('should render add button', () => {
    mockUseTodoForm.mockReturnValue({
      text: '',
      error: null,
      isSubmitting: false,
      handleSubmit: jest.fn(),
      handleInputChange: jest.fn(),
      clearError: jest.fn(),
    });

    render(<InputTasks />);
    expect(
      screen.getByRole('button', { name: /Add Task/i })
    ).toBeInTheDocument();
  });

  it('should disable button when submitting', () => {
    mockUseTodoForm.mockReturnValue({
      text: '',
      error: null,
      isSubmitting: true,
      handleSubmit: jest.fn(),
      handleInputChange: jest.fn(),
      clearError: jest.fn(),
    });

    render(<InputTasks />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Adding...');
  });

  it('should show error message', () => {
    mockUseTodoForm.mockReturnValue({
      text: '',
      error: {
        message: 'Task cannot be empty',
        type: 'validation',
      },
      isSubmitting: false,
      handleSubmit: jest.fn(),
      handleInputChange: jest.fn(),
      clearError: jest.fn(),
    });

    render(<InputTasks />);
    expect(screen.getByText('Task cannot be empty')).toBeInTheDocument();
  });
});
