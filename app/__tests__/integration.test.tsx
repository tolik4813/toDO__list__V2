import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useTodoStore } from '@/app/store/todoStore';
import InputTasks from '@/app/customComponents/form/InputTasks';
import TasksList from '@/app/customComponents/todo/TasksList';
import TodoItem from '@/app/customComponents/todo/TodoItem';

const resetStore = () => {
  useTodoStore.setState({ todos: [] });
};

describe('Todo App Integration Tests', () => {
  beforeEach(() => {
    resetStore();
  });

  it('should add a new todo and display it in the list', async () => {
    render(
      <>
        <InputTasks />
        <TasksList />
      </>
    );

    const input = screen.getByPlaceholderText(/Enter your task/i);
    const addButton = screen.getByRole('button', { name: /Add Task/i });

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    const state = useTodoStore.getState();
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].text).toBe('New Task');
  });

  it('should toggle todo completion status', async () => {
    const todo = {
      id: '1',
      text: 'Test Task',
      completed: false,
      createdAt: new Date(),
    };

    useTodoStore.getState().addTodo(todo.text);

    render(<TasksList />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(screen.getByText('Test Task')).toHaveClass('line-through');
    });

    const state = useTodoStore.getState();
    expect(state.todos[0].completed).toBe(true);
  });

  it('should delete a todo from the list', async () => {
    useTodoStore.getState().addTodo('Task 1');
    useTodoStore.getState().addTodo('Task 2');

    render(<TasksList />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button', {
      name: /Delete task/i,
    });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    const state = useTodoStore.getState();
    expect(state.todos).toHaveLength(1);
  });

  it('should clear all completed todos', async () => {
    useTodoStore.getState().addTodo('Active Task');
    useTodoStore.getState().addTodo('Completed Task');

    const state = useTodoStore.getState();
    state.toggleTodo(state.todos[1].id);

    render(
      <>
        <InputTasks />
        <TasksList />
      </>
    );

    const clearButton = screen.getByRole('button', {
      name: /Clear completed/i,
    });
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.queryByText('Completed Task')).not.toBeInTheDocument();
      expect(screen.getByText('Active Task')).toBeInTheDocument();
    });

    // Перевіряємо store
    const updatedState = useTodoStore.getState();
    expect(updatedState.todos).toHaveLength(1);
    expect(updatedState.todos[0].text).toBe('Active Task');
  });
});
