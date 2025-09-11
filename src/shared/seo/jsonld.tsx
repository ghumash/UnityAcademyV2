import { siteConfig, absoluteUrl } from "@/shared/config/common";

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
    sameAs: sameAs.length ? sameAs : undefined,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contacts.email,
      telephone: siteConfig.contacts.phone,
      contactType: "customer support",
      availableLanguage: ["ru", "en", "hy"],
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
