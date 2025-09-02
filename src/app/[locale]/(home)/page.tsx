import type { Metadata } from "next";
import type { Locale } from "@/shared/lib/i18n";
import { Section, Container } from "@/shared/ui/custom";
import { TeamSection } from "@/widgets";
import { peopleMock } from "@/entities/person";
import { createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { GlowingGrid, GridItemData } from "@/widgets";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";

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
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">Unity Academy</h1>
          <p className="mt-3 text-muted-foreground">
            Стартовый каркас готов. Двигаемся по шагам.
          </p>
          <GlowingGrid
            items={items}
            glow={{ proximity: 64, spread: 80, borderWidth: 3, glow: true }}
          />
        </Container>
      </Section>

      <TeamSection people={peopleMock} />
    </main>
  );
}
