import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/shared/config/common";
import { locales, type Locale } from "@/shared/lib/i18n";

export function createMetadata(input?: {
  title?: string;
  description?: string;
  canonical?: string; // абсолютный URL
  alternatesPath?: string; // относительный путь без локали, например "/contacts"
  locale?: Locale; // текущая локаль
}): Metadata {
  const title =
    typeof input?.title === "string" ? input.title : siteConfig.name;
  const description = input?.description ?? siteConfig.description;

  // alternates.languages
  const languages = input?.alternatesPath
    ? Object.fromEntries(
        locales.map((l) => [l, absoluteUrl(`/${l}${input.alternatesPath!}`)])
      )
    : undefined;

  return {
    title: { default: siteConfig.name, template: `%s — ${siteConfig.name}` },
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: input?.canonical ?? absoluteUrl("/"),
      languages,
    },
    openGraph: {
      title,
      description,
      url: input?.canonical ?? absoluteUrl("/"),
      siteName: siteConfig.name,
      type: "website",
      locale: input?.locale
        ? `${input.locale}-${input.locale.toUpperCase()}`
        : siteConfig.locale,
      images: siteConfig.assets.ogImage
        ? [siteConfig.assets.ogImage]
        : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
