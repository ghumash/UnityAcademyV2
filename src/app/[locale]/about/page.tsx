import type { Metadata } from "next";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, type Locale } from "@/shared/lib/i18n";
import { peopleMock } from "@/entities/person";
import { GlowingGrid, type GridItemData, TeamSection } from "@/widgets";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { getPageBySlugLocale } from "@/shared/content/pages";
import { TextGenerateEffect } from "@/shared/ui/lib";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "about");

  return createMetadata({
    title: page?.title ?? t("common.navigation.about"),
    canonical: absoluteUrl(`/${locale}/about`),
    alternatesPath: "/about",
    locale,
    description: page?.description ?? t("common.navigation.about"),
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

const title = "Ովքե՞ր ենք մենք";

const description = `Մենք տալիս ենք ավելին, քան պարզապես դասընթացներ.
Մենք համայնք ենք նրանց համար, ովքեր ձգտում են աճել մասնագիտապես,
անձնապես և ճիշտ արժեքներով, ովքեր ցանկանում են զարգացնել իրենց հմտությունները և գտնել կարիերայի հնարավորություններ:`;

const description_2 = `Սա այն վայրն է, որտեղ գիտելիքը վերածվում է մասնագիտության,
 պրակտիկան դառնում է հաջողության հիմք, իսկ ամուր համայնքը աջակցում է քեզ ամեն քայլափոխի:`;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "about");

  return (
    <main id="main" className="sm:mt-20 md:mt-26">
      <JsonLd
        id="breadcrumbs-about"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          {
            name: t("common.navigation.about"),
            href: `/${locale}/about`,
          },
        ])}
      />
      <TextGenerateEffect as="h2" duration={2} filter={false} words={title} />
      <TextGenerateEffect
        as="h2"
        duration={2}
        filter={false}
        words={description}
      />
      <TextGenerateEffect
        as="h2"
        duration={2}
        filter={false}
        words={description_2}
      />
      <GlowingGrid
        items={items}
        glow={{ proximity: 64, spread: 80, borderWidth: 3, glow: true }}
      />
      <TeamSection people={peopleMock} />
    </main>
  );
}
