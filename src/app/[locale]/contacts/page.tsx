import type { Metadata } from "next";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, type Locale } from "@/shared/lib/i18n";
import { getPageBySlugLocale } from "@/shared/content/pages";
import { TextHoverEffect } from "@/shared/ui/lib";
import { ExampleContactTiles } from "@/widgets";
import Maps from "@/widgets/Maps/Maps";
import { FeedbackForm } from "@/features/feedback";
import { Container, Section } from "@/shared/ui/custom";

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
      <div className="h-[200px] max-w-[400px] mx-auto">
        <TextHoverEffect text="Կապ" as="h1" />
      </div>
      <ExampleContactTiles />
      <Section>
        <Container className="flex flex-col lg:flex-row gap-6">
          <FeedbackForm />
          <Maps />
        </Container>
      </Section>
    </main>
  );
}
