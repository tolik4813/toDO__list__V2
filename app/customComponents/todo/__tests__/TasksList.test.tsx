import { render, screen } from '@testing-library/react';
import TasksList from '@/app/customComponents/todo/TasksList';
import { useTodoSelectors } from '@/app/hooks/useTodoSelectors';
import { Todo } from '@/app/types/todo';

jest.mock('@/app/hooks/useTodoSelectors');

const mockUseTodoSelectors = useTodoSelectors as jest.MockedFunction<
  typeof useTodoSelectors
>;

describe('TasksList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty state when no todos', () => {
    mockUseTodoSelectors.mockReturnValue({
      todos: [],
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      removeTodo: jest.fn(),
      clearCompleted: jest.fn(),
      updateTodo: jest.fn(),
      completedTodos: [],
      activeTodos: [],
      todoCount: { total: 0, completed: 0, active: 0 },
    });

    render(<TasksList />);
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it('should render list of todos', () => {
    const mockTodo: Todo = {
      id: '1',
      text: 'Test todo',
      completed: false,
      createdAt: new Date(),
    };

    mockUseTodoSelectors.mockReturnValue({
      todos: [mockTodo],
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      removeTodo: jest.fn(),
      clearCompleted: jest.fn(),
      updateTodo: jest.fn(),
      completedTodos: [],
      activeTodos: [mockTodo],
      todoCount: { total: 1, completed: 0, active: 1 },
    });

    render(<TasksList />);
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('should render multiple todos', () => {
    const todos: Todo[] = [
      { id: '1', text: 'Todo 1', completed: false, createdAt: new Date() },
      { id: '2', text: 'Todo 2', completed: true, createdAt: new Date() },
      { id: '3', text: 'Todo 3', completed: false, createdAt: new Date() },
    ];

    mockUseTodoSelectors.mockReturnValue({
      todos,
      addTodo: jest.fn(),
      toggleTodo: jest.fn(),
      removeTodo: jest.fn(),
      clearCompleted: jest.fn(),
      updateTodo: jest.fn(),
      completedTodos: [todos[1]],
      activeTodos: [todos[0], todos[2]],
      todoCount: { total: 3, completed: 1, active: 2 },
    });

    render(<TasksList />);
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toBeInTheDocument();
  });
});
