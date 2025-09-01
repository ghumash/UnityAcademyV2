// src/shared/content/courses.ts
import "server-only";
import type { Locale } from "@/shared/lib/i18n";
import { listCourseSlugs, readCourseFile } from "./fs";
import type { NormalizedCourse } from "./schema";

export type CourseLite = {
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  updatedAt?: string; // ISO
};

const sortByUpdatedDesc = (
  a: { updatedAt?: string },
  b: { updatedAt?: string }
) => {
  const ta = a.updatedAt ? Date.parse(a.updatedAt) : 0;
  const tb = b.updatedAt ? Date.parse(b.updatedAt) : 0;
  return tb - ta;
};

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

export async function getCourseBySlugLocale(
  locale: Locale,
  slug: string
): Promise<NormalizedCourse | null> {
  const c = await readCourseFile(locale, slug);
  if (!c || c.draft) return null;
  return c;
}

export async function getAllTagsForLocale(locale: Locale): Promise<string[]> {
  const all = await getAllCoursesForLocale(locale);
  const set = new Set<string>();
  for (const c of all) (c.tags ?? []).forEach((t) => t && set.add(t));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

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
      (c.tags ?? []).some((t) => t.toLowerCase().includes(qq));

    const matchesTag =
      !tt || (c.tags ?? []).some((t) => t.toLowerCase() === tt);
    return matchesQ && matchesTag;
  });
}
