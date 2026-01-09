
import { z } from 'npm:zod@3.22.4';

export const businessContextSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  website: z.string().url("Invalid URL format").optional().or(z.literal('')),
  description: z.string().optional()
});

export const diagnosticAnswerSchema = z.object({
  question_id: z.string(),
  answer_value: z.union([z.string(), z.array(z.string())])
});

export const systemSelectionSchema = z.object({
  system_ids: z.array(z.string()).max(3, "Select up to 3 systems")
});

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']),
  phase: z.string().optional()
});

export const validateBusinessContext = (data: unknown) => businessContextSchema.safeParse(data);
export const validateTask = (data: unknown) => taskSchema.safeParse(data);
