// src/shared/content/schema.ts
import { z } from "zod";

/**
 * Схема метаданных курса из frontmatter
 * Используется для валидации данных курса перед обработкой
 * 
 * @example
 * const frontmatter = {
 *   title: "Основы Unity",
 *   excerpt: "Изучаем базовые концепции",
 *   tags: ["unity", "gamedev"],
 *   updatedAt: "2024-01-15",
 *   draft: false,
 *   cover: "https://example.com/cover.jpg"
 * };
 * const validated = CourseFrontmatter.parse(frontmatter);
 */
export const CourseFrontmatter = z.object({
  title: z.string().min(1),
  excerpt: z.string().trim().optional(),
  tags: z.array(z.string().min(1)).optional(),
  updatedAt: z.union([z.string(), z.date()]).optional(),
  draft: z.boolean().optional(),
  cover: z.string().url().optional(),
});
export type CourseFrontmatter = z.infer<typeof CourseFrontmatter>;

/**
 * Нормализованная структура курса для использования в приложении
 * Все даты приведены к ISO строкам, локаль указана явно
 * 
 * @example
 * const course: NormalizedCourse = {
 *   slug: "unity-basics",
 *   locale: "ru",
 *   title: "Основы Unity",
 *   excerpt: "Изучаем базовые концепции",
 *   tags: ["unity", "gamedev"],
 *   updatedAt: "2024-01-15T10:00:00.000Z",
 *   draft: false,
 *   cover: "https://example.com/cover.jpg",
 *   body: "# Содержимое курса\n\nТекст курса..."
 * };
 */
export const NormalizedCourse = z.object({
  slug: z.string().min(1),
  locale: z.union([z.literal("ru"), z.literal("en"), z.literal("hy")]),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  tags: z.array(z.string().min(1)).optional(),
  updatedAt: z.string().optional(), // ISO string only
  draft: z.boolean().optional(),
  cover: z.string().url().optional(),
  body: z.string().optional(),
});
export type NormalizedCourse = z.infer<typeof NormalizedCourse>;
