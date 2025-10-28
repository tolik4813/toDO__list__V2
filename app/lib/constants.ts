export const APP_CONFIG = {
  MAX_TASK_LENGTH: 200,
  MIN_TASK_LENGTH: 1,
  ANIMATION_DURATION: 200,
} as const;

export const UI_TEXT = {
  PLACEHOLDER: 'Enter your task...',
  ADD_BUTTON: 'Add Task',
  EMPTY_STATE: 'No tasks yet. Add your first task above!',
  ERROR_REQUIRED: 'Task cannot be empty',
  ERROR_TOO_LONG: 'Task is too long',
  ERROR_UNEXPECTED: 'An unexpected error occurred. Please try again.',
  ERROR_NETWORK: 'Network error. Please check your connection.',
  SORT_NEWEST: 'Newest First',
  SORT_OLDEST: 'Oldest First',
  SORT_A_Z: 'A-Z',
  SORT_Z_A: 'Z-A',
  SORT_LABEL: 'Sort by',
} as const;

const BASE_STYLES = {
  CONTAINER: 'flex flex-col gap-2',
  ROW: 'flex flex-col sm:flex-row justify-center gap-2',
  SPACING: 'mt-6 space-y-2',
} as const;

const FORM_STYLES = {
  INPUT:
    'bg-gray-800 border-yellow-500 text-white placeholder-gray-400 focus-visible:border-yellow-400 focus-visible:ring-yellow-400/50 focus-visible:ring-[2px] focus-visible:outline-none w-full sm:w-66 transition-all duration-200 focus:scale-[1.02]',
  BUTTON:
    'bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-md transition-all duration-200 w-full sm:w-auto hover:scale-105 active:scale-95',
  CLEAR_BUTTON:
    'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-2 rounded-md transition-all duration-200 hover:scale-105 active:scale-95 text-sm',
  ERROR:
    'text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-md p-2 animate-in fade-in duration-300',
} as const;

const TODO_STYLES = {
  ITEM: 'flex items-center justify-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded-md hover:border-yellow-500/50 transition-all duration-200 ease-in-out transform hover:scale-[1.02]',
  ITEM_COMPLETED:
    'flex items-center justify-center gap-3 p-3 bg-gray-800/60 border border-gray-600 rounded-md hover:border-yellow-500/30 transition-all duration-200 ease-in-out transform hover:scale-[1.02] opacity-75',
  TEXT: 'mt-1 text-white flex-1 break-all whitespace-normal transition-colors duration-200',
  TEXT_COMPLETED: 'line-through text-gray-400',
  CHECKBOX:
    'border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500 data-[state=checked]:text-black flex-shrink-0 transition-all duration-200',
  EDIT_BUTTON:
    'mb-1 text-yellow-400 hover:text-yellow-300 hover:transition-all duration-200 hover:scale-150 flex-shrink-0',
  DELETE_BUTTON:
    'text-red-400 hover:text-red-300 hover:transition-all duration-200 hover:scale-150 flex-shrink-0 p-1',
  EDIT_INPUT:
    'bg-gray-700 border-blue-500 text-white placeholder-gray-400 focus-visible:border-blue-400 focus-visible:ring-blue-400/50 focus-visible:ring-[2px] focus-visible:outline-none flex-1 transition-all duration-200',
  SEARCH_INPUT:
    'bg-gray-800 border-yellow-500 text-white placeholder-gray-400 focus-visible:border-yellow-400 focus-visible:ring-yellow-400/50 focus-visible:ring-[2px] focus-visible:outline-none w-full sm: transition-all duration-200 focus:scale-[1.02]',
  EMPTY: 'text-center text-gray-400 py-8 animate-pulse',
} as const;

export const CSS_CLASSES = {
  ...BASE_STYLES,
  ...FORM_STYLES,
  ...TODO_STYLES,
} as const;
