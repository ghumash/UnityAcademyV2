import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/shared/config";

export function createMetadata(
  input?: Partial<Pick<Metadata, "title" | "description">> & {
    canonical?: string;
  }
): Metadata {
  const title =
    typeof input?.title === "string" ? input.title : siteConfig.name;
  const description = input?.description ?? siteConfig.description;

  return {
    title: { default: siteConfig.name, template: `%s — ${siteConfig.name}` },
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: input?.canonical ?? absoluteUrl("/") },
    openGraph: {
      title,
      description,
      url: absoluteUrl("/"),
      siteName: siteConfig.name,
      type: "website",
      locale: siteConfig.locale,
      images: siteConfig.assets.ogImage
        ? [siteConfig.assets.ogImage]
        : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
