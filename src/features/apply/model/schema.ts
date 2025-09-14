import { z } from "zod";
import { COURSE_DATA, type CourseKey } from "@/entities/course";

// Типы курсов на основе значений курсов
export type CourseValue = typeof COURSE_DATA[CourseKey]["value"];

export const ApplySchema = z.object({
  fullname: z.string().min(2, "Մուտքագրեք անուն ազգանունը"),
  email: z.string().email("Սխալ email"),
  phone: z.string().min(5, "Մուտքագրեք հեռախոսահամարը"),
  telegram: z.string()
    .min(1, "Մուտքագրեք Telegram username")
    .regex(/^@[a-zA-Z0-9_]{5,32}$/, "Telegram username-ը պետք է սկսվի @ նշանով և լինի 5-32 նիշ"),
  course: z.string().min(2, "Սխալ դասընթաց"),
});

export type ApplyValues = z.infer<typeof ApplySchema>;
