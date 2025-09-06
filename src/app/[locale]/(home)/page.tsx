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
import { createMetadata } from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config";
import {
  getHeroConfig,
  getCarouselConfig,
  getFeaturesSectionConfig,
  getVideoCardsCarouselConfig,
  getLogoCarouselSectionConfig,
  getCoursesConfig,
  getCtaBannerConfig,
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
    title: siteConfig.name,
    canonical: absoluteUrl(`/${locale}`),
    alternatesPath: "/",
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
  const courses = await getCoursesConfig(locale);
  const ctaBanner = await getCtaBannerConfig(locale);

  return (
    <main className="sm:mt-20 md:mt-22">
      <Hero
        title={hero.title}
        subtitle={hero.subtitle}
        actions={hero.actions}
      />
      <Carousel items={carousel.items} />
      <FeaturesSection features={features.features} />
      <VideoCardsCarousel
        title={videoCards.title}
        students={videoCards.students}
      />
      <LogoCarouselSection
        title={logoCarousel.title}
        subtitle={logoCarousel.subtitle}
      />
      <Courses
        title={courses.title}
        courses={courses.courses}
        levels={courses.levels}
        formats={courses.formats}
      />
      <CtaBanner heading={ctaBanner.heading} buttons={ctaBanner.buttons} />
    </main>
  );
}

export default HomePage;
