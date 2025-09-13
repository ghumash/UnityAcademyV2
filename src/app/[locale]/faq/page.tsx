import type { Metadata } from "next";
import { Container, Section } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, buildOrganizationJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { FaqAccordion } from "@/widgets";
import { TextHoverEffect } from "@/shared/ui/lib";
import { getFaqConfig } from "@/shared/config/faq";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const faqConfig = await getFaqConfig(locale);
  return createMetadata({
    title: faqConfig.page.title,
    canonical: absoluteUrl(`/${locale}${siteConfig.routes.faq}`),
    alternatesPath: siteConfig.routes.faq,
    locale,
    description: faqConfig.page.description,
  });
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const faqConfig = await getFaqConfig(locale);

  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      <JsonLd
        id="breadcrumbs-faq"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          {
            name: faqConfig.page.title,
            href: `/${locale}${siteConfig.routes.faq}`,
          },
        ])}
      />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />
      <Container>
        <TextHoverEffect text={faqConfig.page.title} as="h1" />
      </Container>
      <Section>
        <Container className="max-w-2xl">
          <FaqAccordion data={faqConfig.items} />
        </Container>
      </Section>
    </main>
  );
}
