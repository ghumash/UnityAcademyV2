import type { Metadata } from "next";
import {
  JsonLd,
  buildBreadcrumbsJsonLd,
  buildOrganizationJsonLd,
  createMetadata,
} from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { CtaBanner, IntroWithDesc } from "@/widgets";
import { GlowingGrid, TeamSection, ContentSection } from "@/widgets";
import { getCtaBannerConfig } from "@/shared/config/home";
import { getGlowingGridConfig } from "@/shared/config/about/glowingGrid";
import { getContentSectionConfig } from "@/shared/config/about/contentSection";
import {
  getIntroWithDescConfig,
  getTeamSectionConfig,
} from "@/shared/config/about";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  return createMetadata({
    title: t("common.navigation.about"),
    canonical: absoluteUrl(`/${locale}${siteConfig.routes.about}`),
    alternatesPath: siteConfig.routes.about,
    locale,
    description: t("about.introWithDesc.description_2"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);

  const ctaBanner = await getCtaBannerConfig(locale);
  const glowingGrid = await getGlowingGridConfig(locale);
  const contentSection = await getContentSectionConfig(locale);
  const introWithDesc = await getIntroWithDescConfig(locale);
  const teamSection = await getTeamSectionConfig(locale);

  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      <JsonLd
        id="breadcrumbs-about"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          {
            name: t("common.navigation.about"),
            href: `/${locale}${siteConfig.routes.about}`,
          },
        ])}
      />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />
      <IntroWithDesc config={introWithDesc} />
      <ContentSection config={contentSection} />
      <GlowingGrid config={glowingGrid} />
      <TeamSection config={teamSection} />
      <CtaBanner config={ctaBanner} />
    </main>
  );
}
