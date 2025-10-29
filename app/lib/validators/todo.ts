import { z } from 'zod';
import { APP_CONFIG, UI_TEXT } from '@/app/lib/constants';

export const todoFormSchema = z.object({
  text: z
    .string()
    .min(APP_CONFIG.MIN_TASK_LENGTH, UI_TEXT.ERROR_REQUIRED)
    .max(APP_CONFIG.MAX_TASK_LENGTH, UI_TEXT.ERROR_TOO_LONG)
    .trim(),
});

export type TodoFormData = z.infer<typeof todoFormSchema>;
