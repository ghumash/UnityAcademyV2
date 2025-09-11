import type { Metadata } from "next";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config/common";
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
    canonical: absoluteUrl(`/${locale}/courses`),
    alternatesPath: "/courses",
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
          { name: t("common.home"), href: `/${locale}` },
          { name: t("common.navigation.courses"), href: `/${locale}/courses` },
        ])}
      />

      <Section as="div" className="md:mb-0">
        <Container>
          <AppAutoBreadcrumb />
        </Container>
      </Section>
      <Courses
        title={courses.title}
        list={courses.list}
        levels={courses.levels}
        formats={courses.formats}
      />
    </main>
  );
}
