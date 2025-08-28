import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/shared/config";
import { locales } from "@/shared/lib/i18n";

const paths = ["/", "/courses", "/about", "/contacts", "/apply"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((l) =>
    paths.map((p, i) => ({
      url: absoluteUrl(`/${l}${p}`),
      lastModified: now,
      changeFrequency: i <= 1 ? "weekly" : "monthly",
      priority: p === "/" ? 1.0 : p === "/courses" ? 0.8 : 0.6,
    }))
  );
}
