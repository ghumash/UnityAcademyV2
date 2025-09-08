import type { Metadata } from "next";
import { Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, type Locale } from "@/shared/lib/i18n";
import { getPageBySlugLocale } from "@/shared/content/pages";
import { FaqAccordion } from "@/widgets";
import { TextHoverEffect } from "@/shared/ui/lib";
import { Button } from "@/shared/ui";
import { Link } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "faq");

  return createMetadata({
    title: page?.title ?? t("common.navigation.faq"),
    canonical: absoluteUrl(`/${locale}/faq`),
    alternatesPath: "/faq",
    locale,
    description: page?.description ?? t("common.navigation.faq"),
  });
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "faq");

  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      <JsonLd
        id="breadcrumbs-contacts"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.home"), href: `/${locale}` },
          {
            name: page?.title ?? t("common.navigation.faq"),
            href: `/${locale}/faq`,
          },
        ])}
      />
      <Container>
        <TextHoverEffect text="Հաճախ տրվող հարցեր" as="h1" />
      </Container>
      <FaqAccordion />
    </main>
  );
}
