import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа").max(64, "Слишком длинное имя"),
  email: z.string().email({ message: "Некорректный email" }),
  message: z
    .string()
    .min(10, "Минимум 10 символов")
    .max(2000, "Слишком длинное сообщение"),
  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: "Нужно согласие на обработку данных",
    }),
  hp: z.string().optional(),
  ts: z.number().optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;
