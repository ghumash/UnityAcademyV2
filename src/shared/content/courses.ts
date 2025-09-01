import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import { type Locale } from "@/shared/lib/i18n";
import { cache } from "react";

const CONTENT_DIR = path.join(process.cwd(), "content", "courses");

const Localized = z.object({
  ru: z.string().optional(),
  en: z.string().optional(),
  hy: z.string().optional(),
});

const Frontmatter = z.object({
  slug: z.string().optional(),
  published: z.boolean().optional().default(true),
  order: z.number().optional().default(0),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
  title: Localized,
  excerpt: Localized.optional(),
});

export type CourseFront = z.infer<typeof Frontmatter>;
export type CourseRecord = CourseFront & {
  slug: string; // гарантируем
  body: string; // содержимое MDX как сырой текст (рендер позже)
  filePath: string;
};

async function readCourseFiles(): Promise<CourseRecord[]> {
  let entries: string[] = [];
  try {
    entries = await fs.readdir(CONTENT_DIR);
  } catch {
    return []; // нет директории — ок
  }

  const files = entries.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const items: CourseRecord[] = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    const parsed = Frontmatter.safeParse(data);
    if (!parsed.success) continue;

    const fm = parsed.data;
    const slug = (fm.slug ?? file.replace(/\.(mdx|md)$/, "")).toLowerCase();

    items.push({
      ...fm,
      slug,
      body: content?.trim() ?? "",
      filePath,
    });
  }

  return items;
}

const loadAll = cache(async () => {
  const all = await readCourseFiles();
  // нормализуем и сортируем
  return all
    .filter((c) => c.published !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
});

export async function getAllCoursesForLocale(locale: Locale) {
  const all = await loadAll();
  return all.map((c) => ({
    slug: c.slug,
    title: c.title[locale] ?? c.slug,
    excerpt: c.excerpt?.[locale],
    imageUrl: c.image,
    tags: c.tags ?? [],
    order: c.order ?? 0,
  }));
}

export async function getCourseBySlugLocale(locale: Locale, slug: string) {
  const all = await loadAll();
  const c = all.find((x) => x.slug === slug);
  if (!c) return null;
  return {
    slug: c.slug,
    title: c.title[locale] ?? c.slug,
    excerpt: c.excerpt?.[locale],
    imageUrl: c.image,
    tags: c.tags ?? [],
    order: c.order ?? 0,
    body: c.body,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const all = await loadAll();
  return all.map((c) => c.slug);
}
