import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config";
import { getDictionary, Locale } from "@/shared/lib/i18n";
import { TeamSection } from "@/widgets";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return createMetadata({
    title: dict.header.nav.about,
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
  const dict = await getDictionary(params.locale);
  const team: any[] = [];
  return (
    <main>
      <JsonLd
        id="breadcrumbs-about"
        data={buildBreadcrumbsJsonLd([
          { name: "Home", href: `/${params.locale}` },
          { name: dict.header.nav.about, href: `/${params.locale}/about` },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">
            {dict.header.nav.about}
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
