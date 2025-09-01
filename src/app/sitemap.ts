import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/shared/config";
import { getAllCoursesForLocale } from "@/shared/content/courses";
import type { Locale } from "@/shared/lib/i18n";

const LOCALES: Locale[] = ["ru", "en", "hy"];

function pathForLocale(locale: Locale, path: `/${string}` | "/") {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

function alternatesForPath(path: `/${string}` | "/") {
  return {
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, absoluteUrl(pathForLocale(l, path))])
    ),
  } as const;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Статические страницы для каждой локали
  const staticPaths: Array<`/${string}` | "/"> = [
    "/",
    "/courses",
    "/about",
    "/contacts",
    "/apply",
  ];

  for (const locale of LOCALES) {
    for (const p of staticPaths) {
      const url = absoluteUrl(pathForLocale(locale, p));
      const base = {
        url,
        alternates: alternatesForPath(p),
      } as const;

      if (p === "/") {
        entries.push({
          ...base,
          changeFrequency: "weekly",
          priority: 1.0,
        });
      } else if (p === "/courses") {
        entries.push({
          ...base,
          changeFrequency: "daily",
          priority: 0.8,
        });
      } else {
        entries.push({
          ...base,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  // Курсы (без draft), lastModified из фронтматтера
  for (const locale of LOCALES) {
    const courses = await getAllCoursesForLocale(locale);
    for (const c of courses) {
      const path = `/courses/${c.slug}` as const;
      entries.push({
        url: absoluteUrl(pathForLocale(locale, path)),
        alternates: alternatesForPath(path),
        lastModified: c.updatedAt ? new Date(c.updatedAt) : undefined,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
