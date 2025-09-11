// src/shared/content/index.ts

// Экспорт типов для использования в компонентах
export type { NormalizedCourse } from "./schema";
export type { CourseLite } from "./courses";

// Экспорт основных функций для работы с курсами
export {
  getAllCoursesForLocale,
  getCourseBySlugLocale,
  getAllTagsForLocale,
  searchFilterCourses,
} from "./courses";

// Экспорт функций для работы с файловой системой
export { listCourseSlugs } from "./fs";

/**
 * Агрегатор слагов по всем локалям для статической генерации (SSG)
 * Собирает уникальные слаги курсов со всех поддерживаемых языков
 * 
 * @returns Отсортированный массив уникальных слагов курсов
 * 
 * @example
 * // Использование в generateStaticParams для предварительной генерации страниц
 * export async function generateStaticParams() {
 *   const slugs = await getAllSlugs();
 *   return slugs.map(slug => ({ slug }));
 * }
 */
import type { Locale } from "@/shared/lib/i18n";
import { listCourseSlugs as _list } from "./fs";

const LOCALES: Locale[] = ["ru", "en", "hy"];

export async function getAllSlugs(): Promise<string[]> {
  const all = await Promise.all(LOCALES.map((l) => _list(l)));
  return Array.from(new Set(all.flat())).sort();
}
