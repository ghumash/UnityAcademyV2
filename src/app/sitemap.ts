import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/shared/config/common";
import { locales, type Locale } from "@/shared/lib/i18n";

function pathForLocale(locale: Locale, path: `/${string}` | "/") {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

function alternatesForPath(path: `/${string}` | "/") {
  return {
    languages: Object.fromEntries(
      locales.map((l) => [l, absoluteUrl(pathForLocale(l, path))])
    ),
  } as const;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Статические страницы с конфигурацией
  const staticPages = [
    { path: siteConfig.routes.home, changeFrequency: "weekly" as const, priority: 1.0 },
    {
      path: siteConfig.routes.courses,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      path: siteConfig.routes.about,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: siteConfig.routes.contacts,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      path: siteConfig.routes.apply,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      path: siteConfig.routes.faq,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ] as const;

  // Добавляем статические страницы для каждой локали
  for (const locale of locales) {
    for (const page of staticPages) {
      const url = absoluteUrl(pathForLocale(locale, page.path));
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: alternatesForPath(page.path),
      });
    }
  }

  const courseIds = [
    "web_development",
    "graphic_design",
    "scratch",
    "smm",
    "python",
    "android",
    "ui_ux",
    "hr",
    "soft_skills",
  ];
  for (const locale of locales) {
    for (const courseId of courseIds) {
      const coursePath = `${siteConfig.routes.courses}/${courseId}` as const;
      const url = absoluteUrl(pathForLocale(locale, coursePath));
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: alternatesForPath(coursePath),
      });
    }
  }

  return entries;
}
