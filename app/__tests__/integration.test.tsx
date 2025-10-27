import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useTodoStore } from '@/app/store/todoStore';
import InputTasks from '@/app/customComponents/form/InputTasks';
import TasksList from '@/app/customComponents/todo/TasksList';
import TodoItem from '@/app/customComponents/todo/TodoItem';

// Перезавантажуємо store для кожного тесту
const resetStore = () => {
  useTodoStore.setState({ todos: [] });
};

describe('Todo App Integration Tests', () => {
  beforeEach(() => {
    resetStore();
  });

  it('should add a new todo and display it in the list', async () => {
    // Рендеримо компоненти разом
    const { rerender } = render(
      <>
        <InputTasks />
        <TasksList />
      </>
    );

    // Знаходимо input і кнопку
    const input = screen.getByPlaceholderText(/Enter your task/i);
    const addButton = screen.getByRole('button', { name: /Add Task/i });

    // Вводимо текст і додаємо завдання
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    // Очікуємо появу завдання
    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    // Перевіряємо що завдання в store
    const state = useTodoStore.getState();
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].text).toBe('New Task');
  });

  it('should toggle todo completion status', async () => {
    // Спочатку додаємо завдання
    const todo = {
      id: '1',
      text: 'Test Task',
      completed: false,
      createdAt: new Date(),
    };

    useTodoStore.getState().addTodo(todo.text);

    // Рендеримо список
    render(<TasksList />);

    // Знаходимо checkbox
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    // Клікаємо на checkbox
    fireEvent.click(checkbox);

    // Перевіряємо що завдання тепер виконане
    await waitFor(() => {
      expect(screen.getByText('Test Task')).toHaveClass('line-through');
    });

    // Перевіряємо store
    const state = useTodoStore.getState();
    expect(state.todos[0].completed).toBe(true);
  });

  it('should delete a todo from the list', async () => {
    // Додаємо кілька завдань
    useTodoStore.getState().addTodo('Task 1');
    useTodoStore.getState().addTodo('Task 2');

    render(<TasksList />);

    // Перевіряємо що обидва завдання відображаються
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    // Видаляємо одне завдання
    const deleteButtons = screen.getAllByRole('button', {
      name: /Delete task/i,
    });
    fireEvent.click(deleteButtons[0]);

    // Перевіряємо що залишилося тільки одне завдання
    await waitFor(() => {
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    // Перевіряємо store
    const state = useTodoStore.getState();
    expect(state.todos).toHaveLength(1);
  });

  it('should clear all completed todos', async () => {
    // Додаємо різні завдання
    useTodoStore.getState().addTodo('Active Task');
    useTodoStore.getState().addTodo('Completed Task');

    // Позначаємо друге як виконане
    const state = useTodoStore.getState();
    state.toggleTodo(state.todos[1].id);

    render(
      <>
        <InputTasks />
        <TasksList />
      </>
    );

    // Знаходимо кнопку очищення
    const clearButton = screen.getByRole('button', {
      name: /Clear completed/i,
    });
    fireEvent.click(clearButton);

    // Перевіряємо що залишилося тільки активне завдання
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
