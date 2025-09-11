// src/shared/content/courses.ts
import "server-only";
import type { Locale } from "@/shared/lib/i18n";
import { listCourseSlugs, readCourseFile } from "./fs";
import type { NormalizedCourse } from "./schema";

/**
 * Облегченная версия курса для списков и превью
 * Содержит только основные поля без тела контента
 * 
 * @example
 * const courseLite: CourseLite = {
 *   slug: "unity-basics",
 *   title: "Основы Unity",
 *   excerpt: "Изучаем базовые концепции",
 *   tags: ["unity", "gamedev"],
 *   updatedAt: "2024-01-15T10:00:00.000Z"
 * };
 */
export type CourseLite = {
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  updatedAt?: string; // ISO
};

/**
 * Сортирует курсы по дате обновления (новые первыми)
 * Курсы без даты помещаются в конец списка
 */
const sortByUpdatedDesc = (
  a: { updatedAt?: string },
  b: { updatedAt?: string }
) => {
  const ta = a.updatedAt ? Date.parse(a.updatedAt) : 0;
  const tb = b.updatedAt ? Date.parse(b.updatedAt) : 0;
  return tb - ta;
};

/**
 * Получает все опубликованные курсы для указанной локали
 * Исключает черновики, сортирует по дате обновления
 * 
 * @param locale - Локаль для поиска курсов
 * @returns Массив облегченных объектов курсов
 * 
 * @example
 * // Использование в компоненте списка курсов
 * const courses = await getAllCoursesForLocale("ru");
 * return (
 *   <div>
 *     {courses.map(course => (
 *       <CourseCard key={course.slug} course={course} />
 *     ))}
 *   </div>
 * );
 */
export async function getAllCoursesForLocale(
  locale: Locale
): Promise<CourseLite[]> {
  const slugs = await listCourseSlugs(locale);
  const entries = await Promise.all(
    slugs.map((s) => readCourseFile(locale, s))
  );
  const items = (entries.filter(Boolean) as NormalizedCourse[]).filter(
    (c) => !c.draft
  );

  return items
    .map<CourseLite>(({ slug, title, excerpt, tags, updatedAt }) => ({
      slug,
      title,
      excerpt,
      tags,
      updatedAt,
    }))
    .sort(sortByUpdatedDesc);
}

/**
 * Получает полные данные курса по слагу и локали
 * Возвращает null для черновиков и несуществующих курсов
 * 
 * @param locale - Локаль курса
 * @param slug - Уникальный идентификатор курса
 * @returns Полный объект курса или null
 * 
 * @example
 * // Использование в динамической странице курса
 * export default async function CoursePage({ params }) {
 *   const course = await getCourseBySlugLocale(params.locale, params.slug);
 *   if (!course) notFound();
 *   return <CourseContent course={course} />;
 * }
 */
export async function getCourseBySlugLocale(
  locale: Locale,
  slug: string
): Promise<NormalizedCourse | null> {
  const c = await readCourseFile(locale, slug);
  if (!c || c.draft) return null;
  return c;
}

/**
 * Получает все уникальные теги курсов для указанной локали
 * Теги сортируются в алфавитном порядке
 * 
 * @param locale - Локаль для поиска тегов
 * @returns Отсортированный массив уникальных тегов
 * 
 * @example
 * // Использование в компоненте фильтра тегов
 * const tags = await getAllTagsForLocale("ru");
 * return (
 *   <TagFilter>
 *     {tags.map(tag => (
 *       <TagButton key={tag} tag={tag} />
 *     ))}
 *   </TagFilter>
 * );
 */
export async function getAllTagsForLocale(locale: Locale): Promise<string[]> {
  const all = await getAllCoursesForLocale(locale);
  const set = new Set<string>();
  for (const c of all) (c.tags ?? []).forEach((tg) => tg && set.add(tg));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Поиск и фильтрация курсов по тексту и тегу
 * Поиск ведется по названию, описанию и тегам курса
 * 
 * @param locale - Локаль для поиска
 * @param options - Параметры поиска
 * @param options.q - Текст для поиска (необязательно)
 * @param options.tag - Точное совпадение тега (необязательно)
 * @returns Отфильтрованный массив курсов
 * 
 * @example
 * // Поиск курсов по тексту
 * const courses = await searchFilterCourses("ru", { q: "unity" });
 * 
 * // Фильтрация по тегу
 * const gamedevCourses = await searchFilterCourses("ru", { tag: "gamedev" });
 * 
 * // Комбинированный поиск
 * const filtered = await searchFilterCourses("ru", { 
 *   q: "основы", 
 *   tag: "unity" 
 * });
 */
export async function searchFilterCourses(
  locale: Locale,
  { q, tag }: { q?: string; tag?: string }
): Promise<CourseLite[]> {
  const all = await getAllCoursesForLocale(locale);
  const qq = (q ?? "").trim().toLowerCase();
  const tt = (tag ?? "").trim().toLowerCase();

  return all.filter((c) => {
    const matchesQ =
      !qq ||
      c.title.toLowerCase().includes(qq) ||
      (c.excerpt ? c.excerpt.toLowerCase().includes(qq) : false) ||
      (c.tags ?? []).some((tg) => tg.toLowerCase().includes(qq));

    const matchesTag =
      !tt || (c.tags ?? []).some((tg) => tg.toLowerCase() === tt);
    return matchesQ && matchesTag;
  });
}
