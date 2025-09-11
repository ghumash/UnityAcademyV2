// src/shared/content/fs.ts
import "server-only";
import type { Locale } from "@/shared/lib/i18n";
import type { NormalizedCourse } from "./schema";

/**
 * Получает список слагов всех курсов для указанной локали
 * В текущей реализации возвращает пустой массив (курсы хранятся в базе данных)
 * 
 * @param locale - Локаль для поиска курсов ("ru" | "en" | "hy")
 * @returns Массив слагов курсов
 * 
 * @example
 * // Использование в generateStaticParams для SSG
 * const slugs = await listCourseSlugs("ru");
 * // ["unity-basics", "advanced-scripting"]
 */
export async function listCourseSlugs(_locale: Locale): Promise<string[]> {
  return [];
}

/**
 * Читает данные курса по слагу и локали
 * В текущей реализации возвращает null (курсы хранятся в базе данных)
 * 
 * @param locale - Локаль курса
 * @param slug - Уникальный идентификатор курса
 * @returns Нормализованный объект курса или null если не найден
 * 
 * @example
 * // Использование в page.tsx для получения контента
 * const course = await readCourseFile("ru", "unity-basics");
 * if (course && !course.draft) {
 *   return <CoursePage course={course} />;
 * }
 */
export async function readCourseFile(
  _locale: Locale,
  _slug: string
): Promise<NormalizedCourse | null> {
  return null;
}
