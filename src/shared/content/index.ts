// src/shared/content/index.ts
export type { NormalizedCourse } from "./schema";
export type { CourseLite } from "./courses";

export {
  getAllCoursesForLocale,
  getCourseBySlugLocale,
  getAllTagsForLocale,
  searchFilterCourses,
} from "./courses";

export { listCourseSlugs } from "./fs";

// агрегатор слагов по всем локалям (для SSG)
import type { Locale } from "@/shared/lib/i18n";
import { listCourseSlugs as _list } from "./fs";

const LOCALES: Locale[] = ["ru", "en", "hy"];

export async function getAllSlugs(): Promise<string[]> {
  const all = await Promise.all(LOCALES.map((l) => _list(l)));
  return Array.from(new Set(all.flat())).sort();
}
