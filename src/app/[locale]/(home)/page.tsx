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
import { absoluteUrl } from "@/shared/config";
import { hero } from "@/shared/config/home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata({
    title: "Unity Academy",
    canonical: absoluteUrl(`/${locale}`),
    alternatesPath: "/",
    locale,
    description:
      "Стартовый каркас Unity Academy. Веб, AI, Android, контент и карьера.",
  });
}

export default async function HomePage() {
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
      <Carousel />
      <FeaturesSection />
      <VideoCardsCarousel />
      <LogoCarouselSection />
      <Courses />
      <CtaBanner
        heading="Գրանցվիր անվճար խորհրդատվության՝ գտնելու քո ուղղությունը ՏՏ-ում"
        buttons={{
          primary: {
            text: "Գրանցվել",
            url: "/contact",
          },
        }}
      />
    </main>
  );
}
