import type { Metadata } from "next";
import {
  JsonLd,
  buildBreadcrumbsJsonLd,
  buildOrganizationJsonLd,
  createMetadata,
} from "@/shared/seo";
import { absoluteUrl } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { peopleMock } from "@/entities/person";
import { CtaBanner, IntroWithDesc } from "@/widgets";
import { GlowingGrid, TeamSection, ContentSection } from "@/widgets";
import { getCtaBannerConfig } from "@/shared/config/home";
import { getGlowingGridConfig } from "@/shared/config/about/glowingGrid";
import { getContentSectionConfig } from "@/shared/config/about/contentSection";
import { getIntroWithDescConfig } from "@/shared/config/about";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  return createMetadata({
    title: t("common.navigation.about"),
    canonical: absoluteUrl(`/${locale}/about`),
    alternatesPath: "/about",
    locale,
    description: t("common.navigation.about"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = await params;
  const t = await getT(locale);

  const ctaBanner = await getCtaBannerConfig(locale);
  const glowingGrid = await getGlowingGridConfig(locale);
  const contentSection = await getContentSectionConfig(locale);
  const introWithDesc = await getIntroWithDescConfig(locale);

  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      <JsonLd
        id="breadcrumbs-about"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          { name: t("common.navigation.about"), href: `/${locale}/about` },
        ])}
      />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />
      <IntroWithDesc config={introWithDesc} />
      <ContentSection config={contentSection} />
      <GlowingGrid config={glowingGrid} />
      <TeamSection people={peopleMock} />
      <CtaBanner config={ctaBanner} />
    </main>
  );
}
