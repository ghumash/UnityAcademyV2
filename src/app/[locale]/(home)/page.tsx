import type { Metadata } from "next";
import type { Locale } from "@/shared/lib/i18n";
import {
  Carousel,
  Courses,
  CtaBanner,
  FeaturesSection,
  Hero,
  LogoCarouselSection,
  VideoCardsCarousel,
} from "@/widgets";
import { JsonLd, buildOrganizationJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config/common";
import {
  getHeroConfig,
  getCarouselConfig,
  getFeaturesSectionConfig,
  getVideoCardsCarouselConfig,
  getLogoCarouselSectionConfig,
  getCtaBannerConfig,
  getHomeCoursesConfig,
} from "@/shared/config/home";
import { getT } from "@/shared/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);

  return createMetadata({
    title: t("common.navigation.home"),
    canonical: absoluteUrl(`/${locale}`),
    alternatesPath: siteConfig.routes.home,
    locale,
    description: t("home.hero.title"),
  });
}

async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  // Get all component configurations
  const hero = await getHeroConfig(locale);
  const carousel = await getCarouselConfig(locale);
  const features = await getFeaturesSectionConfig(locale);
  const videoCards = await getVideoCardsCarouselConfig(locale);
  const logoCarousel = await getLogoCarouselSectionConfig(locale);
  const courses = await getHomeCoursesConfig(locale);
  const ctaBanner = await getCtaBannerConfig(locale);

  return (
    <main className="sm:mt-20 md:mt-22">
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />
      <Hero config={hero} />
      <Carousel config={carousel} />
      <FeaturesSection config={features} />
      <VideoCardsCarousel config={videoCards} />
      <LogoCarouselSection config={logoCarousel} />
      <Courses config={courses} />
      <CtaBanner config={ctaBanner} />
    </main>
  );
}

export default HomePage;
