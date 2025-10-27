// Mock for useTodoEdit hook
export const useTodoEdit = jest.fn(() => ({
  isEditing: false,
  editText: '',
  inputRef: { current: null },
  handleEdit: jest.fn(),
  handleSave: jest.fn(),
  handleCancel: jest.fn(),
  handleKeyDown: jest.fn(),
  setEditText: jest.fn(),
}));
