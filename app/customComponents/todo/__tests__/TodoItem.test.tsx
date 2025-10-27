import { render, screen } from '@testing-library/react';
import TodoItem from '@/app/customComponents/todo/TodoItem';
import { useTodoStore } from '@/app/store/todoStore';
import { useTodoEdit } from '@/app/hooks/useTodoEdit';
import { Todo } from '@/app/types/todo';

jest.mock('@/app/store/todoStore');
jest.mock('@/app/hooks/useTodoEdit');

const mockUseTodoStore = useTodoStore as jest.MockedFunction<
  typeof useTodoStore
>;
const mockUseTodoEdit = useTodoEdit as jest.MockedFunction<typeof useTodoEdit>;

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    text: 'Test todo',
    completed: false,
    createdAt: new Date(),
  };

  const mockToggleTodo = jest.fn();
  const mockRemoveTodo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTodoStore.mockReturnValue({
      toggleTodo: mockToggleTodo,
      removeTodo: mockRemoveTodo,
    } as ReturnType<typeof useTodoStore>);

    mockUseTodoEdit.mockReturnValue({
      isEditing: false,
      editText: mockTodo.text,
      inputRef: { current: null },
      handleEdit: jest.fn(),
      handleSave: jest.fn(),
      handleCancel: jest.fn(),
      handleKeyDown: jest.fn(),
      setEditText: jest.fn(),
    });
  });

  it('should render todo text', () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('should show completed state', () => {
    const completedTodo: Todo = {
      ...mockTodo,
      completed: true,
    };
    render(<TodoItem todo={completedTodo} />);
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('should render with checkbox', () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});
