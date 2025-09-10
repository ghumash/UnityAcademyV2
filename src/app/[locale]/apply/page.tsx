import type { Metadata } from "next";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, type Locale } from "@/shared/lib/i18n";
import { getPageBySlugLocale } from "@/shared/content/pages";
import { Container, Section } from "@/shared/ui/custom";
import { TextHoverEffect } from "@/shared/ui/lib";
import { ApplyForm } from "@/features/apply";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "apply");
  return createMetadata({
    title: page?.title ?? t("common.navigation.apply"),
    canonical: absoluteUrl(`/${locale}/apply`),
    alternatesPath: "/apply",
    locale,
    description: page?.description ?? t("common.navigation.apply"),
  });
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "apply");

  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      <JsonLd
        id="breadcrumbs-apply"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          {
            name: page?.title ?? t("common.navigation.apply"),
            href: `/${locale}/apply`,
          },
        ])}
      />
      <Container className="h-[200px]">
        <TextHoverEffect text="Գրանցման հայտ" as="h1" />
      </Container>

      <Section>
        <Container className="flex flex-col lg:flex-row gap-6">
          <ApplyForm />
        </Container>
      </Section>
    </main>
  );
}
