import { z } from "zod";

export const FeedbackSchema = z.object({
  name: z.string().min(2, "Մուտքագրեք ձեր անունը"),
  surname: z.string().min(2, "Մուտքագրեք ձեր ազգանունը"),
  email: z.string().email("Սխալ email"),
  message: z.string().min(5, "Գրեք հաղորդագրություն (նվազ. 5 նշան)"),
});

export type FeedbackValues = z.infer<typeof FeedbackSchema>;
