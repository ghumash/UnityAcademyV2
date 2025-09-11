import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { AppAutoBreadcrumb } from "@/widgets";
import { getCoursesConfig, getCourseHeroConfig } from "@/shared/config/courses";
import { IntroHero } from "@/entities/course";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getT(locale);

  return createMetadata({
    title: t(`courses.list.${slug}.title`),
    canonical: absoluteUrl(`/${locale}/courses/${slug}`),
    alternatesPath: `/courses/${slug}`,
    locale,
    description: t(`courses.list.${slug}.description`),
  });
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getT(locale);
  const courseHeroConfig = await getCourseHeroConfig(locale, slug);
  const courses = await getCoursesConfig(locale);

  const courseExists = courses.list.some((course) => course.id === slug);
  if (!courseExists) {
    notFound();
  }

  return (
    <main id="main" className="sm:mt-36 md:mt-40">
      <JsonLd
        id="breadcrumbs-course"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.home"), href: `/${locale}` },
          { name: t("common.navigation.courses"), href: `/${locale}/courses` },
          {
            name: t(`courses.list.${slug}.title`),
            href: `/${locale}/courses/${slug}`,
          },
        ])}
      />

      <IntroHero
        title={courseHeroConfig.title}
        description={courseHeroConfig.description}
        level={courseHeroConfig.level}
        format={courseHeroConfig.format}
        duration={courseHeroConfig.duration}
        lessonsCount={courseHeroConfig.lessonsCount}
        projectsCount={courseHeroConfig.projectsCount}
        price={courseHeroConfig.price}
        originalPrice={courseHeroConfig.originalPrice}
      />
    </main>
  );
}
