import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  email: z
    .email("Please enter a valid email address")
    .trim(),
  subject: z
    .string()
    .max(200, "Subject must be under 200 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters")
    .trim(),
  website: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
