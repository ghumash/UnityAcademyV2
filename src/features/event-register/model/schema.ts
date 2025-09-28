import { z } from "zod";
import { EVENT_DATA, type EventKey } from "@/shared/lib/const";
import type { FormsDict } from "@/shared/lib/i18n";

// Типы событий на основе значений событий
export type EventValue = (typeof EVENT_DATA)[EventKey]["value"];

// Функция для создания схемы с локализованными сообщениями для регистрации на события
export const createEventRegisterSchema = (
  validation: FormsDict["validation"]
) => {
  return z.object({
    fullname: z
      .string()
      .min(2, validation.fullname.minLength)
      .refine(
        (name) => {
          const words = name.trim().split(/\s+/);
          return words.length >= 2 && words.every((word) => word.length >= 2);
        },
        { message: validation.fullname.invalid }
      ),
    birthday: z
      .string()
      .min(1, validation.birthday.required)
      .refine(
        (date) => {
          const parsed = new Date(date);
          return !isNaN(parsed.getTime()) && parsed < new Date();
        },
        { message: validation.birthday.invalid }
      ),
    phone: z
      .string()
      .min(1, validation.phone.required)
      .regex(/^\+374\d{8}$/, validation.phone.invalid),
    event: z.string().min(2, validation.event.invalid),
  });
};

export type EventRegisterValues = z.infer<
  ReturnType<typeof createEventRegisterSchema>
>;
