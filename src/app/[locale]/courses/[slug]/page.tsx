import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  JsonLd,
  buildBreadcrumbsJsonLd,
  buildOrganizationJsonLd,
  createMetadata,
} from "@/shared/lib/seo";
import { absoluteUrl, getFormConfig, siteConfig } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { getCoursesConfig, getCoursePageConfig } from "@/shared/config/courses";
import { COURSE_DATA, IntroHero, type CourseKey } from "@/entities/course";
import {
  CallToAction,
  ContentSection,
  CourseTopics,
  CtaBanner,
  GlowingGrid,
  PhotoGallery,
  UserCard,
} from "@/widgets";
import { Container, Section } from "@/shared/ui/custom";
import { ApplyForm } from "@/features/apply";
import { ScrollToHash } from "@/shared/lib/scroll-to-hash";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getT(locale);

  return createMetadata({
    title: t(`courses.list.${slug}.courseHeroSection.title`),
    canonical: absoluteUrl(`/${locale}${siteConfig.routes.courses}/${slug}`),
    alternatesPath: `${siteConfig.routes.courses}/${slug}`,
    locale,
    description: t(`courses.list.${slug}.courseHeroSection.description`),
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
      <ScrollToHash />
      <JsonLd
        id="breadcrumbs-course"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          {
            name: t("common.navigation.courses"),
            href: `/${locale}${siteConfig.routes.courses}`,
          },
          {
            name: t(`courses.list.${slug}.title`),
            href: `/${locale}${siteConfig.routes.courses}/${slug}`,
          },
        ])}
      />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />

      <IntroHero config={coursePageConfig.courseHeroSection} />

      <Section>
        <Container className="flex lg:flex-row flex-col gap-8">
          <CourseTopics
            title={coursePageConfig.courseTopics.title}
            topics={coursePageConfig.courseTopics.topics}
          />
          {coursePageConfig.instructor.display !== false && (
            <UserCard data={coursePageConfig.instructor} />
          )}
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

      <PhotoGallery config={coursePageConfig.projects} />
      
      <Section id="form">
        <Container>
          <CallToAction
            title={coursePageConfig.callToAction.title}
            subtitle={coursePageConfig.callToAction.subtitle}
            activeTagId={coursePageConfig.callToAction.activeTagId}
          >
            <ApplyForm
              config={formConfig}
              defaultCourse={COURSE_DATA[slug as CourseKey].value}
              hideCourseSelect
            />
          </CallToAction>
        </Container>
      </Section>
      <CtaBanner config={coursePageConfig.ctaBanner} />
    </main>
  );
}
