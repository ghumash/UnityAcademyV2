import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/shared/seo/meta";
import { JsonLd, buildBreadcrumbsJsonLd } from "@/shared/seo/jsonld";
import { absoluteUrl, siteConfig } from "@/shared/config";
import { Container, Section } from "@/shared/ui/custom";

export const metadata: Metadata = createMetadata({
  title: "Контакты",
  canonical: absoluteUrl("/contacts"),
  description: "Как связаться с Unity Academy и где нас найти.",
});

export default function ContactsPage() {
  const phoneHref = `tel:${siteConfig.contacts.phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${siteConfig.contacts.email}`;

  return (
    <main>
      <JsonLd
        id="breadcrumbs-contacts"
        data={buildBreadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Контакты", href: "/contacts" },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">Контакты</h1>
          <address className="mt-4 not-italic text-foreground/90">
            <div className="mb-1">{siteConfig.contacts.location}</div>
            <div className="mb-1">
              <Link href={mailHref} className="hover:underline">
                {siteConfig.contacts.email}
              </Link>
            </div>
            <div>
              <Link href={phoneHref} className="hover:underline">
                {siteConfig.contacts.phone}
              </Link>
            </div>
          </address>
        </Container>
      </Section>
    </main>
  );
}
