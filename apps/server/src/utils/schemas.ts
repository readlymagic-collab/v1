import { z } from 'zod';

export const sessionSchema = z.object({
  body: z.object({
    level: z.number().min(1).max(3),
    score: z.number().min(0),
    total: z.number().min(1),
    accuracy: z.number().min(0).max(100),
  }),
});
