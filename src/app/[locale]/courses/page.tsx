import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, Locale } from "@/shared/lib/i18n";
import { getAllCoursesForLocale } from "@/shared/content";
import { Course, CourseCard } from "@/entities/course";
import CoursesEmptyState from "@/app/courses/_components/empty-state";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tt = await getT(locale);
  return createMetadata({
    title: tt("header.nav.courses"),
    canonical: absoluteUrl(`/${locale}/courses`),
    alternatesPath: "/courses",
    locale,
    description:
      "Курсы Unity Academy: веб-разработка, искусственный интеллект, создание контента, Android, SMM и soft skills.",
  });
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tt = await getT(locale);
  const raw = await getAllCoursesForLocale(locale);
  const courses: Course[] = raw.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    imageUrl: r.imageUrl,
    tags: r.tags,
  }));

  return (
    <main>
      <JsonLd
        id="breadcrumbs-courses"
        data={buildBreadcrumbsJsonLd([
          { name: tt("common.home"), href: `/${locale}` },
          { name: tt("header.nav.courses"), href: `/${locale}/courses` },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">
            {tt("header.nav.courses")}
          </h1>
          {courses.length === 0 ? (
            <div className="mt-8">
              <CoursesEmptyState />
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <CourseCard key={c.slug} {...c} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
