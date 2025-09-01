// src/shared/content/fs.ts
import "server-only";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import matter from "gray-matter";
import type { Locale } from "@/shared/lib/i18n";
import { CourseFrontmatter, type NormalizedCourse } from "./schema";

const ROOT = path.join(process.cwd(), "src", "content", "courses");

const byLocaleDir = (locale: Locale) => path.join(ROOT, locale);
const isMdx = (name: string) => name.toLowerCase().endsWith(".mdx");

async function safeReaddir(dir: string) {
  try {
    return await fs.readdir(dir);
  } catch {
    return [];
  }
}

export async function listCourseSlugs(locale: Locale): Promise<string[]> {
  const files = await safeReaddir(byLocaleDir(locale));
  return files
    .filter(isMdx)
    .map((f) => f.replace(/\.mdx$/i, ""))
    .sort();
}

export async function readCourseFile(
  locale: Locale,
  slug: string
): Promise<NormalizedCourse | null> {
  const file = path.join(byLocaleDir(locale), `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = matter(raw);

    const parsed = CourseFrontmatter.safeParse(data);
    if (!parsed.success) return null;

    const fm = parsed.data;
    const updatedAt =
      fm.updatedAt instanceof Date
        ? fm.updatedAt.toISOString()
        : fm.updatedAt
          ? new Date(fm.updatedAt).toISOString()
          : undefined;

    return {
      slug,
      locale,
      title: fm.title,
      excerpt: fm.excerpt,
      tags: fm.tags?.filter(Boolean),
      updatedAt,
      draft: fm.draft ?? false,
      cover: fm.cover,
      body: content?.trim() || undefined,
    };
  } catch {
    return null;
  }
}
