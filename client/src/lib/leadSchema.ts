import { z } from "zod";

export const insertLeadSchema = z.object({
  email: z.string().email(),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
