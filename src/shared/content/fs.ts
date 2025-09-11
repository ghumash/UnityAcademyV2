// src/shared/content/fs.ts
import "server-only";
import type { Locale } from "@/shared/lib/i18n";
import type { NormalizedCourse } from "./schema";

// Заглушки для функций, которые раньше работали с MDX
export async function listCourseSlugs(_locale: Locale): Promise<string[]> {
  return [];
}

export async function readCourseFile(
  _locale: Locale,
  _slug: string
): Promise<NormalizedCourse | null> {
  return null;
}
