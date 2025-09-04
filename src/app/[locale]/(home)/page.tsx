import type { Metadata } from "next";
import type { Locale } from "@/shared/lib/i18n";
import { Carousel, FeaturesSection, Hero, TeamSection } from "@/widgets";
import { peopleMock } from "@/entities/person";
import { createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { GlowingGrid, GridItemData } from "@/widgets";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
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

const items: GridItemData[] = [
  {
    icon: <Box className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: "Do things the right way",
    description: "Running out of copy so I'll write anything.",
  },
  {
    icon: <Settings className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: "The best AI code editor ever.",
    description:
      "Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me.",
  },
  {
    icon: <Lock className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: "You should buy Aceternity UI Pro",
    description: "It's the best money you'll ever spend",
  },
  {
    icon: <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: "This card is also built by Cursor",
    description: "I'm not even kidding. Ask my mom if you don't believe me.",
  },
  {
    icon: <Search className="h-4 w-4 text-black dark:text-neutral-400" />,
    title: "Coming soon on Aceternity UI",
    description: "I'm writing the code as I record this, no shit.",
  },
];

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
      <GlowingGrid
        items={items}
        glow={{ proximity: 64, spread: 80, borderWidth: 3, glow: true }}
      />
      <TeamSection people={peopleMock} />
    </main>
  );
}
