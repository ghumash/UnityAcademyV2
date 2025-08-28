import { z } from "zod";

export const ApplicationSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа").max(64, "Слишком длинное имя"),
  email: z.string().email("Некорректный email"),
  phone: z.string().min(5, "Укажи телефон").max(32, "Слишком длинный телефон"),
  course: z.string().min(1, "Выбери курс"),
  message: z.string().max(1000, "Максимум 1000 символов").optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: "Нужно согласие на обработку данных",
    }),

  // антиспам-поля (клиент может не прислать — валидно)
  hp: z.string().optional(),
  ts: z.number().optional(), // timestamp начала заполнения
});

export type ApplicationInput = z.infer<typeof ApplicationSchema>;
