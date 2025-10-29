import { renderHook, act } from '@testing-library/react';
import { useTodoForm } from '@/app/hooks/useTodoForm';

// Mock the store
jest.mock('@/app/store/todoStore', () => ({
  useTodoStore: () => ({
    addTodo: jest.fn(),
  }),
}));

// Mock the validation hook
jest.mock('@/app/hooks/useValidation', () => ({
  useValidation: () => ({
    error: null,
    clearError: jest.fn(),
    setValidationError: jest.fn(),
  }),
}));

describe('useTodoForm', () => {
  it('should initialize with empty text', () => {
    const { result } = renderHook(() => useTodoForm());

    expect(result.current.text).toBe('');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should update text on input change', () => {
    const { result } = renderHook(() => useTodoForm());

    act(() => {
      result.current.handleInputChange({
        target: { value: 'New task' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.text).toBe('New task');
  });

  it('should handle form submission', async () => {
    const mockAddTodo = jest.fn();
    const { useTodoStore } = jest.requireMock('@/app/store/todoStore');
    useTodoStore.mockReturnValue({
      addTodo: mockAddTodo,
    });

    const { result } = renderHook(() => useTodoForm());

    act(() => {
      result.current.handleInputChange({
        target: { value: 'Test task' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
        nativeEvent: new Event('submit'),
        currentTarget: null,
        target: null,
        bubbles: false,
        cancelable: false,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: false,
        timeStamp: Date.now(),
        type: 'submit',
      } as React.FormEvent);
    });

    expect(mockAddTodo).toHaveBeenCalledWith('Test task');
  });
});
