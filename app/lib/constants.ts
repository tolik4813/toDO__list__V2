export const CSS_CLASSES = {
  INPUT:
    'bg-gray-800 border-yellow-500 text-white placeholder-gray-400 focus-visible:border-yellow-400 focus-visible:ring-yellow-400/50 focus-visible:ring-[2px] focus-visible:outline-none',

  BUTTON_PRIMARY:
    'bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-md transition-colors',

  CHECKBOX:
    'border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500 data-[state=checked]:text-black mt-0.5 flex-shrink-0',

  TODO_ITEM:
    'flex items-start gap-3 p-3 bg-gray-800 border border-gray-700 rounded-md hover:border-yellow-500/50 transition-colors',
  TODO_TEXT: 'text-white flex-1 break-all whitespace-normal',
  TODO_TEXT_COMPLETED: 'line-through text-gray-400',

  ERROR_CONTAINER:
    'text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-md p-2',

  FORM_CONTAINER: 'flex flex-col gap-2',
  FORM_ROW: 'flex justify-center gap-2',
  TASKS_CONTAINER: 'mt-6 space-y-2',
  EMPTY_STATE: 'text-center text-gray-400 py-8',
} as const;
