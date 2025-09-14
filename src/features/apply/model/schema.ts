import { z } from "zod";

// Типы курсов на основе существующих значений
export type CourseValue =
  | "Վեբ ծրագրավորում"
  | "Գրաֆիկ դիզայն: Photoshop, Illustrator, Canva"
  | "Երեխաների ծրագրավորում"
  | "SMM և Digital Marketing"
  | "Python ծրագրավորում"
  | "Android ծրագրավորում"
  | "UI/UX դիզայն"
  | "HR"
  | "Soft Skills";

export const ApplySchema = z.object({
  fullname: z.string().min(2, "Մուտքագրեք անուն ազգանունը"),
  email: z.string().email("Սխալ email"),
  phone: z.string().min(5, "Մուտքագրեք հեռախոսահամարը"),
  course: z.string().min(2, "Սխալ դասընթաց"),
});

export type ApplyValues = z.infer<typeof ApplySchema>;
