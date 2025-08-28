import type { Metadata } from "next";

export const site = {
  name: "Unity Academy",
  url: "https://example.com",
  titleTemplate: "%s — Unity Academy",
  description:
    "Современная IT-академия в Ванадзоре: веб, AI, контент, Android, SMM, soft skills."
};

export function absoluteUrl(path = "/") {
  const base = site.url.endsWith("/") ? site.url.slice(0, -1) : site.url;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata(
  input?: Partial<Pick<Metadata, "title" | "description">> & { canonical?: string }
): Metadata {
  const title =
    typeof input?.title === "string"
      ? input.title
      : site.name;
  const description = input?.description ?? site.description;

  return {
    title: { default: site.name, template: site.titleTemplate },
    description,
    metadataBase: new URL(site.url),
    alternates: { canonical: input?.canonical ?? absoluteUrl("/") },
    openGraph: {
      title,
      description,
      url: absoluteUrl("/"),
      siteName: site.name,
      type: "website",
      locale: "ru_RU"
    },
    twitter: { card: "summary_large_image", title, description }
  };
}
