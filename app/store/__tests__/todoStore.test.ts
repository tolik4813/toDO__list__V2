import { renderHook, act } from '@testing-library/react';
import { useTodoStore } from '@/app/store/todoStore';

describe('useTodoStore', () => {
  beforeEach(() => {
    useTodoStore.setState({
      todos: [],
    });
  });

  it('should add todo', () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.addTodo('Test task');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Test task');
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('should toggle todo', () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.addTodo('Test task');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(true);
  });

  it('should remove todo', () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.addTodo('Test task');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.removeTodo(todoId);
    });

    expect(result.current.todos).toHaveLength(0);
  });

  it('should clear completed todos', () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.addTodo('Task 1');
      result.current.addTodo('Task 2');
      result.current.addTodo('Task 3');
    });

    const task2Id = result.current.todos[1].id;
    const task3Id = result.current.todos[2].id;

    act(() => {
      result.current.toggleTodo(task2Id);
      result.current.toggleTodo(task3Id);
    });

    expect(result.current.todos.filter(t => t.completed)).toHaveLength(2);

    act(() => {
      result.current.clearCompleted();
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Task 1');
  });

  it('should update todo', () => {
    const { result } = renderHook(() => useTodoStore());

    act(() => {
      result.current.addTodo('Test task');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.updateTodo(todoId, 'Updated task');
    });

    expect(result.current.todos[0].text).toBe('Updated task');
  });
});
