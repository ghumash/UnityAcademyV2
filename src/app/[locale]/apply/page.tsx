import type { Metadata } from "next";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, getFormConfig } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { Container, Section } from "@/shared/ui/custom";
import { TextHoverEffect } from "@/shared/ui/lib";
import { ApplyForm } from "@/features/apply";
import { CallToAction } from "@/widgets";
import { getApplyConfig } from "@/shared/config/apply";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  return createMetadata({
    title: t("common.navigation.apply"),
    canonical: absoluteUrl(`/${locale}/apply`),
    alternatesPath: "/apply",
    locale,
    description: t("common.navigation.apply"),
  });
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const config = await getApplyConfig(locale);
  const formConfig = await getFormConfig(locale);

  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      <JsonLd
        id="breadcrumbs-apply"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          {
            name: t("common.navigation.apply"),
            href: `/${locale}/apply`,
          },
        ])}
      />
      <Container className="h-[200px]">
        <TextHoverEffect text={config.hero.title} as="h1" />
      </Container>

      <Section>
        <Container>
          <CallToAction
            title={config.callToAction.title}
            subtitle={config.callToAction.subtitle}
          >
            <ApplyForm config={formConfig} />
          </CallToAction>
        </Container>
      </Section>
    </main>
  );
}
