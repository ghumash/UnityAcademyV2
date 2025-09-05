import Link from "next/link";
import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, Locale } from "@/shared/lib/i18n";
import { peopleMock } from "@/entities/person";
import { GlowingGrid, GridItemData, TeamSection } from "@/widgets";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui";
import { getPageBySlugLocale } from "@/shared/content/pages";
import { MdxRenderer } from "@/shared/mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "about");

  return createMetadata({
    title: page?.title ?? t("common.header.nav.about"),
    canonical: absoluteUrl(`/${locale}/about`),
    alternatesPath: "/about",
    locale,
    description: page?.description ?? t("header.nav.about"),
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "about");

  return (
    <main id="main">
      <JsonLd
        id="breadcrumbs-about"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.home"), href: `/${locale}` },
          {
            name: page?.title ?? t("header.nav.about"),
            href: `/${locale}/about`,
          },
        ])}
      />
      <Section>
        <Container>
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${locale}`}>{t("common.home")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {page?.title ?? t("header.nav.about")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {page?.title ?? t("header.nav.about")}
          </h1>

          {page?.body ? (
            <div className="mt-6">
              <MdxRenderer source={page.body} />
            </div>
          ) : null}
        </Container>
      </Section>
      <GlowingGrid
        items={items}
        glow={{ proximity: 64, spread: 80, borderWidth: 3, glow: true }}
      />
      <TeamSection people={peopleMock} locale={locale} />
    </main>
  );
}
