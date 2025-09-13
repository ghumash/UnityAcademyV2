import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd, buildBreadcrumbsJsonLd, buildOrganizationJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, getFormConfig, siteConfig } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { getCoursesConfig, getCoursePageConfig } from "@/shared/config/courses";
import { IntroHero } from "@/entities/course";
import {
  CallToAction,
  ContentSection,
  CourseTopics,
  CtaBanner,
  GlowingGrid,
  UserCard,
} from "@/widgets";
import { Container, Section } from "@/shared/ui/custom";
import { ApplyForm, type CourseValue } from "@/features/apply";

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
  const courses = await getCoursesConfig(locale);
  const formConfig = await getFormConfig(locale);
  const coursePageConfig = await getCoursePageConfig(locale, slug);
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
          { name: t("common.navigation.courses"), href: `/${locale}${siteConfig.routes.courses}` },
          {
            name: t(`courses.list.${slug}.title`),
            href: `/${locale}${siteConfig.routes.courses}/${slug}`,
          },
        ])}
      />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />

      <IntroHero config={coursePageConfig.courseHeroSection} />

      <Section>
        <Container className="flex flex-row gap-8">
          <CourseTopics
            title={coursePageConfig.courseTopics.title}
            topics={coursePageConfig.courseTopics.topics}
          />
          <UserCard data={coursePageConfig.instructor} />
        </Container>
      </Section>

      <ContentSection
        config={coursePageConfig.contentSection}
        itemsGridCols={{ sm: 1, lg: 1 }}
      />

      <GlowingGrid
        config={coursePageConfig.glowingGrid}
        glow={{ proximity: 64, spread: 80, borderWidth: 3, glow: true }}
      />
      <Section id="form">
        <Container>
          <CallToAction
            title={coursePageConfig.callToAction.title}
            subtitle={coursePageConfig.callToAction.subtitle}
            activeTagId={coursePageConfig.callToAction.activeTagId}
          >
            <ApplyForm
              config={formConfig}
              defaultCourse={
                coursePageConfig.courseHeroSection.title as CourseValue
              }
              hideCourseSelect
            />
          </CallToAction>
        </Container>
      </Section>
      <CtaBanner config={coursePageConfig.ctaBanner} />
    </main>
  );
}
