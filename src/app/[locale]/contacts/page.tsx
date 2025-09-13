import type { Metadata } from "next";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, getFormConfig } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { TextHoverEffect } from "@/shared/ui/lib";
import { ContactTilesSection } from "@/widgets";
import Maps from "@/widgets/Maps/Maps";
import { FeedbackForm } from "@/features/feedback";
import { Container, Section } from "@/shared/ui/custom";
import { getContactsConfig } from "@/shared/config/contacts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  return createMetadata({
    title: t("common.navigation.contacts"),
    canonical: absoluteUrl(`/${locale}/contacts`),
    alternatesPath: "/contacts",
    locale,
    description: t("common.navigation.contacts"),
  });
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const contactsConfig = await getContactsConfig(locale);
  const formConfig = await getFormConfig(locale);

  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      <JsonLd
        id="breadcrumbs-contacts"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.home"), href: `/${locale}` },
          {
            name: t("common.navigation.contacts"),
            href: `/${locale}/contacts`,
          },
        ])}
      />
      <div className="h-[200px] max-w-[400px] mx-auto">
        <TextHoverEffect text={contactsConfig.pageTitle} as="h1" />
      </div>
      <ContactTilesSection 
        items={contactsConfig.tiles} 
        longItems={contactsConfig.longItems} 
      />
      <Section>
        <Container className="flex flex-col lg:flex-row gap-6">
          <FeedbackForm config={formConfig} />
          <Maps />
        </Container>
      </Section>
    </main>
  );
}
