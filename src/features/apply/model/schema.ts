import { z } from "zod";
import { COURSE_DATA } from "@/entities/course";

// Типы курсов на основе существующих значений
export type CourseValue = typeof COURSE_DATA[keyof typeof COURSE_DATA]["value"];

export const ApplySchema = z.object({
  fullname: z.string().min(2, "Մուտքագրեք անուն ազգանունը"),
  email: z.string().email("Սխալ email"),
  phone: z.string().min(5, "Մուտքագրեք հեռախոսահամարը"),
  course: z.string().min(2, "Սխալ դասընթաց"),
});

export type ApplyValues = z.infer<typeof ApplySchema>;
