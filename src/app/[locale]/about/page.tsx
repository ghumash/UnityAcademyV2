import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config";
import { Locale } from "@/shared/lib/i18n";
import { TeamSection } from "@/widgets";

export function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Metadata {
  return createMetadata({
    title: "О нас",
    canonical: absoluteUrl(`/${params.locale}/about`),
    alternatesPath: "/about",
    locale: params.locale,
    description: siteConfig.description,
  });
}

export default async function AboutPage({
  params,
}: {
  params: { locale: Locale };
}) {
  // данные позже
  const team: any[] = [];
  return (
    <main>
      <JsonLd
        id="breadcrumbs-about"
        data={buildBreadcrumbsJsonLd([
          { name: "Главная", href: `/${params.locale}` },
          { name: "О нас", href: `/${params.locale}/about` },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">О нас</h1>
          <p className="mt-3 max-w-prose text-muted-foreground">
            {siteConfig.description}
          </p>
        </Container>
      </Section>
      <TeamSection people={team as any} />
    </main>
  );
}
