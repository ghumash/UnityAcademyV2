import * as path from "node:path";
import * as fs from "node:fs/promises";
import matter from "gray-matter";
import type { Locale } from "@/shared/lib/i18n";
import { PageFrontmatter, type NormalizedPage } from "./schema";

const ROOT = path.join(process.cwd(), "src", "content", "pages");

function byLocaleDir(locale: Locale) {
  return path.join(ROOT, locale);
}

export async function readPageFile(
  locale: Locale,
  slug: string
): Promise<NormalizedPage | null> {
  const file = path.join(byLocaleDir(locale), `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = matter(raw);
    const parsed = PageFrontmatter.safeParse(data);
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
      description: fm.description,
      updatedAt,
      draft: fm.draft ?? false,
      body: content || undefined,
    };
  } catch {
    return null;
  }
}

/** Вернуть страницу; если draft — null. */
export async function getPageBySlugLocale(
  locale: Locale,
  slug: string
): Promise<NormalizedPage | null> {
  const p = await readPageFile(locale, slug);
  if (!p || p.draft) return null;
  return p;
}
