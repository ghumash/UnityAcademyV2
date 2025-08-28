import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import Link from "next/link";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config";
import { ContactForm } from "@/entities/contact";
import { getDictionary, Locale } from "@/shared/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return createMetadata({
    title: dict.header.nav.contacts,
    canonical: absoluteUrl(`/${params.locale}/contacts`),
    alternatesPath: "/contacts",
    locale: params.locale,
    description: "Как связаться с Unity Academy и где нас найти.",
  });
}

export default async function ContactsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const phoneHref = `tel:${siteConfig.contacts.phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${siteConfig.contacts.email}`;

  return (
    <main>
      <JsonLd
        id="breadcrumbs-contacts"
        data={buildBreadcrumbsJsonLd([
          { name: "Home", href: `/${params.locale}` },
          {
            name: dict.header.nav.contacts,
            href: `/${params.locale}/contacts`,
          },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">
            {dict.header.nav.contacts}
          </h1>
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
