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
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    alternateName: "Unity Academy",
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.assets.logo),
    description: siteConfig.description,
    ...(sameAs.length && { sameAs }),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contacts.email,
      telephone: siteConfig.contacts.phone,
      contactType: "customer support",
      availableLanguage: ["hy", "ru", "en"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vanadzor",
      addressCountry: "AM",
    },
    foundingDate: "2025",
    knowsAbout: [
      "Programming",
      "Web Development",
      "Mobile Development",
      "UI/UX Design",
      "Digital Marketing",
      "Python",
      "JavaScript",
      "Android Development",
      "Graphic Design"
    ],
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
      item: {
        "@type": "WebPage",
        "@id": absoluteUrl(item.href),
        name: item.name,
        url: absoluteUrl(item.href),
      },
    })),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["hy", "ru", "en"],
  };
}

export function buildEducationalOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteConfig.url}#educational-organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: absoluteUrl(siteConfig.assets.logo),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vanadzor",
      addressRegion: "Lori Province",
      addressCountry: "AM",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contacts.email,
      telephone: siteConfig.contacts.phone,
      contactType: "admissions",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Courses",
      itemListElement: [
        {
          "@type": "Course",
          name: "Web Development",
          description: "HTML, CSS, JavaScript, React course",
          provider: {
            "@id": `${siteConfig.url}#educational-organization`,
          },
        },
        {
          "@type": "Course",
          name: "Python Programming",
          description: "Learn Python programming from basics to advanced",
          provider: {
            "@id": `${siteConfig.url}#educational-organization`,
          },
        },
        {
          "@type": "Course",
          name: "UI/UX Design",
          description: "User Interface and User Experience Design",
          provider: {
            "@id": `${siteConfig.url}#educational-organization`,
          },
        },
        {
          "@type": "Course",
          name: "Android Development",
          description: "Mobile app development for Android",
          provider: {
            "@id": `${siteConfig.url}#educational-organization`,
          },
        },
      ],
    },
  };
}

export function createMetadata(input?: {
  title?: string;
  description?: string;
  canonical?: string; // абсолютный URL
  alternatesPath?: string; // относительный путь без локали, например "/contacts"
  locale?: Locale; // текущая локаль
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}): Metadata {
  const title =
    typeof input?.title === "string" ? input.title : siteConfig.name;
  const description = input?.description ?? siteConfig.description;
  const ogImage = input?.ogImage ?? "/images/logos/logo.svg";
  const ogType = input?.ogType ?? "website";

  // alternates.languages
  const languages = input?.alternatesPath
    ? Object.fromEntries(
        locales.map((l) => [l, absoluteUrl(`/${l}${input.alternatesPath!}`)])
      )
    : undefined;

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
    keywords: input?.keywords,
    authors: input?.authors?.map(name => ({ name })),
    openGraph: {
      title,
      description,
      url: input?.canonical ?? absoluteUrl("/"),
      siteName: siteConfig.name,
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`,
        },
      ],
      locale: input?.locale ?? "hy",
      ...(input?.publishedTime && { publishedTime: input.publishedTime }),
      ...(input?.modifiedTime && { modifiedTime: input.modifiedTime }),
      ...(input?.section && { section: input.section }),
      ...(input?.tags && { tags: input.tags }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage,
      // creator: siteConfig.socials.twitter ? `@${siteConfig.socials.twitter.split('/').pop()}` : undefined,
      // site: siteConfig.socials.twitter ? `@${siteConfig.socials.twitter.split('/').pop()}` : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Добавьте ваши коды верификации
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
    },
  };
}
