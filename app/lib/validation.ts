import { z } from 'zod';

export const todoFormSchema = z.object({
  text: z
    .string()
    .min(1, 'Task text is required')
    .max(400, 'Task text must be less than 200 characters')
    .trim(),
});
