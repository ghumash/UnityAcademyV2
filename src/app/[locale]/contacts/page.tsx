import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, type Locale } from "@/shared/lib/i18n";
import { getPageBySlugLocale } from "@/shared/content/pages";
import { MdxRenderer } from "@/shared/mdx";
import { ContactForm } from "@/features/contact";
import { AppBreadcrumb } from "@/widgets";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "contacts");

  return createMetadata({
    title: page?.title ?? t("common.navigation.contacts"),
    canonical: absoluteUrl(`/${locale}/contacts`),
    alternatesPath: "/contacts",
    locale,
    description: page?.description ?? t("common.navigation.contacts"),
  });
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "contacts");

  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      <JsonLd
        id="breadcrumbs-contacts"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.home"), href: `/${locale}` },
          {
            name: page?.title ?? t("common.navigation.contacts"),
            href: `/${locale}/contacts`,
          },
        ])}
      />
      <Section>
        <Container>
          <AppBreadcrumb
            items={[
              { label: t("common.navigation.home"), href: "/" },
              { label: t("common.navigation.contacts") },
            ]}
          />

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {page?.title ?? t("common.navigation.contacts")}
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
