import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/shared/config/common";
import { locales, type Locale } from "@/shared/lib/i18n";

type BreadcrumbItem = { name: string; href: string };

export function JsonLd({ data, id }: { data: object; id?: string }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function buildOrganizationJsonLd() {
  const sameAs = [
    siteConfig.socials.instagram,
    siteConfig.socials.facebook,
    siteConfig.socials.linkedin,
  ].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.assets.logo),
    ...(sameAs.length && { sameAs }),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contacts.email,
      telephone: siteConfig.contacts.phone,
      contactType: "customer support",
      availableLanguage: ["hy", "ru", "en"],
    },
  };
}

export function buildBreadcrumbsJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

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

  // Абсолютные URL к OG/Twitter изображениям, если для сегмента существует metadata route
  // Пример: /en/about/opengraph-image
  const ogImageUrl = (() => {
    if (!input?.alternatesPath || !input?.locale) return undefined;
    const pathSegment = input.alternatesPath === "/" ? "" : input.alternatesPath;
    const joined = `/${input.locale}${pathSegment}/opengraph-image`;
    // Уберем возможные двойные слэши (кроме протокола)
    const normalized = joined.replace(/\/{2,}/g, "/");
    return absoluteUrl(normalized);
  })();

  return {
    title: input?.title
      ? { default: input.title, template: `%s - ${siteConfig.name}` }
      : siteConfig.name,
    description,
    metadataBase: new URL(siteConfig.url),
    icons: {
      icon: [
        { url: "/images/logos/logo.svg", type: "image/svg+xml" },
        {
          url: "/images/logos/logo.svg",
          sizes: "32x32",
          type: "image/svg+xml",
        },
        {
          url: "/images/logos/logo.svg",
          sizes: "16x16",
          type: "image/svg+xml",
        },
      ],
      shortcut: "/images/logos/logo.svg",
      apple: "/images/logos/logo.svg",
    },
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
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  };
}
