import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config";
import { getT, Locale } from "@/shared/lib/i18n";
import { TeamSection } from "@/widgets";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tt = await getT(locale);
  return createMetadata({
    title: tt("header.nav.about"),
    canonical: absoluteUrl(`/${locale}/about`),
    alternatesPath: "/about",
    locale,
    description: siteConfig.description,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tt = await getT(locale);
  const team: any[] = [];

  return (
    <main>
      <JsonLd
        id="breadcrumbs-about"
        data={buildBreadcrumbsJsonLd([
          { name: tt("common.home"), href: `/${locale}` },
          { name: tt("header.nav.about"), href: `/${locale}/about` },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">
            {tt("header.nav.about")}
          </h1>
          <p className="mt-3 max-w-prose text-muted-foreground">
            {siteConfig.description}
          </p>
        </Container>
      </Section>
      <TeamSection people={team as any} />
    </main>
  );
}
