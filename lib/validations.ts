import { z } from "zod";

export const timeEntrySchema = z.object({
  date: z.string().min(1, "Date is required"),
  project: z.string().min(1, "Project is required"),
  hours: z
    .number()
    .positive("Hours must be a positive number")
    .max(24, "Max 24 hours"),
  description: z.string().min(1, "Description is required"),
});

export type TimeEntryFormValues = z.infer<typeof timeEntrySchema>;
