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
  const t = await getT(locale);
  
  // Get all component configurations
  const hero = await getHeroConfig(locale);
  const carousel = await getCarouselConfig(locale);
  const features = await getFeaturesSectionConfig(locale);
  const videoCards = await getVideoCardsCarouselConfig(locale);
  const logoCarousel = await getLogoCarouselSectionConfig(locale);
  const courses = await getCoursesConfig(locale);

  return (
    <main>
      {hero.display && (
        <Hero
          title={hero.title}
          subtitle={hero.subtitle}
          actions={hero.actions}
          titleClassName="text-5xl md:text-6xl font-extrabold"
          subtitleClassName="text-lg md:text-xl max-w-[600px]"
          actionsClassName="mt-8"
        />
      )}
      <Carousel items={carousel.items} />
      <FeaturesSection features={features.features} />
      <VideoCardsCarousel title={videoCards.title} students={videoCards.students} />
      <LogoCarouselSection title={logoCarousel.title} subtitle={logoCarousel.subtitle} />
      <Courses 
        title={courses.title}
        courses={courses.courses}
        levels={courses.levels}
        formats={courses.formats}
      />
      <CtaBanner
        heading={t("home.ctaBanner.heading")}
        buttons={{
          primary: {
            text: t("home.ctaBanner.buttons.primary"),
            url: "/contact",
          },
        }}
      />
    </main>
  );
}

export default HomePage;
