import type { MetadataRoute } from "next";
import { site } from "@/shared/seo/meta";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`
  };
}
