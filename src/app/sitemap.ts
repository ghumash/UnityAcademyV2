import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/shared/seo/meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 }
  ];
}
