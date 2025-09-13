import type { Metadata } from "next";
import { JsonLd, buildBreadcrumbsJsonLd, buildOrganizationJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { AppAutoBreadcrumb, Courses } from "@/widgets";
import { Container, Section } from "@/shared/ui/custom";
import { getCoursesConfig } from "@/shared/config/courses";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);

  return createMetadata({
    title: t("common.navigation.courses"),
    canonical: absoluteUrl(`/${locale}${siteConfig.routes.courses}`),
    alternatesPath: siteConfig.routes.courses,
    locale,
    description: t("common.navigation.courses"),
  });
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const courses = await getCoursesConfig(locale);

  return (
    <main id="main" className="sm:mt-36 md:mt-40">
      <JsonLd
        id="breadcrumbs-courses"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          { name: t("common.navigation.courses"), href: `/${locale}${siteConfig.routes.courses}` },
        ])}
      />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />

      <Section as="div" className="md:mb-0">
        <Container>
          <AppAutoBreadcrumb />
        </Container>
      </Section>
      <Courses config={courses} />
    </main>
  );
}
