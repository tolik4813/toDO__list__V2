export const useTodoSelectors = jest.fn(() => ({
  todos: [],
  addTodo: jest.fn(),
  toggleTodo: jest.fn(),
  removeTodo: jest.fn(),
  clearCompleted: jest.fn(),
  updateTodo: jest.fn(),
  completedTodos: [],
  activeTodos: [],
  todoCount: { total: 0, completed: 0, active: 0 },
}));
