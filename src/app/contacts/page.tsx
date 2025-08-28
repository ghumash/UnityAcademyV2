import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import Link from "next/link";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config";
import { ContactForm } from "@/entities/contact";

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

          <div className="my-8 h-px w-full bg-border" />

          <h2 className="text-xl font-semibold tracking-tight">Написать нам</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Заполни форму — ответим на почту как можно скорее.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
