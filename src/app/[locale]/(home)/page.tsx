import type { Metadata } from "next";
import type { Locale } from "@/shared/lib/i18n";
import {
  Carousel,
  CtaBanner,
  FeaturesSection,
  Hero,
  LogoCarouselSection,
  VideoCardsCarousel,
} from "@/widgets";
import { createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { home } from "@/shared/config";

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
      {home.hero.display && (
        <Hero
          title={home.hero.title}
          subtitle={home.hero.subtitle}
          actions={home.hero.actions}
          titleClassName="text-5xl md:text-6xl font-extrabold"
          subtitleClassName="text-lg md:text-xl max-w-[600px]"
          actionsClassName="mt-8"
        />
      )}
      <Carousel />
      <FeaturesSection />
      <VideoCardsCarousel />
      <LogoCarouselSection />
      <CtaBanner
        heading="Գրանցվիր անվճար խորհրդատվության՝ գտնելու քո ուղղությունը ՏՏ-ում"
        buttons={{
          primary: {
            text: "Գրանցվել",
            url: "/",
          },
        }}
      />
    </main>
  );
}
