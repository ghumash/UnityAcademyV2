import { z } from "zod";
import type { FormsDict } from "@/shared/lib/i18n";

// Функция для создания схемы с локализованными сообщениями
export const createFeedbackSchema = (validation: FormsDict["validation"]) => {
  return z.object({
    name: z.string().min(2, validation.name.minLength),
    surname: z.string().min(2, validation.surname.minLength),
    email: z.string().email(validation.email.invalid),
    message: z.string().min(5, validation.message.minLength),
  });
};

export type FeedbackValues = z.infer<ReturnType<typeof createFeedbackSchema>>;
