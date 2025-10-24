import { useCallback } from 'react';
import { useTodoStore } from '@/app/store/todoStore';

export const useTodoSelectors = () => {
  const todos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const removeTodo = useTodoStore(state => state.removeTodo);
  const clearCompleted = useTodoStore(state => state.clearCompleted);
  const updateTodo = useTodoStore(state => state.updateTodo);

  const completedTodos = useCallback(
    () => todos.filter(todo => todo.completed),
    [todos]
  );

  const activeTodos = useCallback(
    () => todos.filter(todo => !todo.completed),
    [todos]
  );

  const todoCount = useCallback(
    () => ({
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length,
      active: todos.filter(todo => !todo.completed).length,
    }),
    [todos]
  );

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
    updateTodo,
    completedTodos: completedTodos(),
    activeTodos: activeTodos(),
    todoCount: todoCount(),
  };
};
