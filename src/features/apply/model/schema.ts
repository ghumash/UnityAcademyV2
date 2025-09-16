import { z } from "zod";
import { COURSE_DATA, type CourseKey } from "@/entities/course";
import type { FormsDict } from "@/shared/lib/i18n";

// Типы курсов на основе значений курсов
export type CourseValue = typeof COURSE_DATA[CourseKey]["value"];

// Функция для создания схемы с локализованными сообщениями
export const createApplySchema = (validation: FormsDict["validation"]) => {
  return z.object({
    fullname: z.string().min(2, validation.fullname.minLength),
    birthday: z.string().min(1, validation.birthday.required).refine(
      (date) => {
        const parsed = new Date(date);
        return !isNaN(parsed.getTime()) && parsed < new Date();
      },
      { message: validation.birthday.invalid }
    ),
    phone: z.string()
      .min(1, validation.phone.required)
      .regex(/^\+374\d{8}$/, validation.phone.invalid),
    telegram: z.string()
      .min(1, validation.telegram.required)
      .regex(/^@[a-zA-Z0-9_]{5,32}$/, validation.telegram.invalid),
    course: z.string().min(2, validation.course.invalid),
  });
};

export type ApplyValues = z.infer<ReturnType<typeof createApplySchema>>;
