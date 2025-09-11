import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, type Locale, locales } from "@/shared/lib/i18n";
import { Button } from "@/shared/ui";
import { AppAutoBreadcrumb } from "@/widgets";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getT(locale);
  const description = t("common.navigation.courses");

  return createMetadata({
    title: "some title",
    canonical: absoluteUrl(`/${locale}/courses/${slug}`),
    alternatesPath: `/courses/${slug}`,
    locale,
    description,
  });
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getT(locale);
  notFound();

  return (
    <main id="main" className="sm:mt-36 md:mt-40">
      <JsonLd
        id="breadcrumbs-course"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.home"), href: `/${locale}` },
          { name: t("common.navigation.courses"), href: `/${locale}/courses` },
        ])}
      />

      <Section>
        <Container>
          <AppAutoBreadcrumb />
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {t(`courses.${slug}.title`)}
          </h1>
          <p className="mt-3 max-w-prose text-muted-foreground">
            {t(`courses.${slug}.description`)}
          </p>
        </Container>
      </Section>
    </main>
  );
}
