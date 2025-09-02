import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, Locale } from "@/shared/lib/i18n";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui";
import { getPageBySlugLocale } from "@/shared/content/pages";
import { MdxRenderer } from "@/shared/mdx";
import { ContactForm } from "@/features/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tt = await getT(locale);
  const page = await getPageBySlugLocale(locale, "contacts");
  return createMetadata({
    title: page?.title ?? tt("nav.contacts"),
    canonical: absoluteUrl(`/${locale}/contacts`),
    alternatesPath: "/contacts",
    locale,
    description: page?.description ?? tt("nav.contacts"),
  });
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tt = await getT(locale);
  const page = await getPageBySlugLocale(locale, "contacts");

  return (
    <main id="main">
      <JsonLd
        id="breadcrumbs-contacts"
        data={buildBreadcrumbsJsonLd([
          { name: tt("common.home"), href: `/${locale}` },
          {
            name: page?.title ?? tt("nav.contacts"),
            href: `/${locale}/contacts`,
          },
        ])}
      />
      <Section>
        <Container>
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${locale}`}>{tt("common.home")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {page?.title ?? tt("nav.contacts")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {page?.title ?? tt("nav.contacts")}
          </h1>

          {page?.body ? (
            <div className="mt-6">
              <MdxRenderer source={page.body} />
            </div>
          ) : null}

          <div className="mt-8">
            <ContactForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
