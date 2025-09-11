// src/shared/content/fs.ts
import "server-only";
import type { Locale } from "@/shared/lib/i18n";
import type { NormalizedCourse } from "./schema";

// Заглушки для функций, которые раньше работали с MDX
export async function listCourseSlugs(locale: Locale): Promise<string[]> {
  return [];
}

export async function readCourseFile(
  locale: Locale,
  slug: string
): Promise<NormalizedCourse | null> {
  return null;
}
