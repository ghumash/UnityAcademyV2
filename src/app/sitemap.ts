import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/shared/config";
import { locales } from "@/shared/lib/i18n";
import { getAllSlugs } from "@/shared/content/courses";

const basePaths = ["/", "/courses", "/about", "/contacts", "/apply"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const slugs = await getAllSlugs();

  const staticUrls: MetadataRoute.Sitemap = locales.flatMap((l) =>
    basePaths.map((p, i) => ({
      url: absoluteUrl(`/${l}${p}`),
      lastModified: now,
      changeFrequency: (i <= 1 ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: p === "/" ? 1.0 : p === "/courses" ? 0.8 : 0.6,
    }))
  );

  const courseUrls: MetadataRoute.Sitemap = locales.flatMap((l) =>
    slugs.map((slug) => ({
      url: absoluteUrl(`/${l}/courses/${slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  return [...staticUrls, ...courseUrls];
}
