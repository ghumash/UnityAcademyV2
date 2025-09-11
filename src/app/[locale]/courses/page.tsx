import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, type Locale } from "@/shared/lib/i18n";
import { getAllTagsForLocale, getAllCoursesForLocale } from "@/shared/content/courses";
import { Badge } from "@/shared/ui";

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
    description: "Курсы Unity Academy",
  });
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const [courses, tags] = await Promise.all([
    getAllCoursesForLocale(locale),
    getAllTagsForLocale(locale)
  ]);

  return (
    <main id="main" className="sm:mt-36 md:mt-40">
      <JsonLd
        id="breadcrumbs-courses"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.home"), href: `/${locale}` },
          { name: t("common.navigation.courses"), href: `/${locale}/courses` },
        ])}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("common.navigation.courses")}
        </h1>
        
        {/* Теги */}
        {tags.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Теги курсов</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Список курсов */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Доступные курсы</h2>
          {courses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <article
                  key={course.slug}
                  className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold">
                    <Link
                      href={`/${locale}/courses/${course.slug}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {course.title}
                    </Link>
                  </h3>
                  
                  {course.excerpt && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {course.excerpt}
                    </p>
                  )}
                  
                  {course.tags && course.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {course.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {course.updatedAt && (
                    <time 
                      className="mt-3 block text-xs text-muted-foreground"
                      dateTime={course.updatedAt}
                    >
                      Обновлено: {new Date(course.updatedAt).toLocaleDateString('ru-RU')}
                    </time>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Курсы пока не добавлены.</p>
          )}
        </section>
      </div>
    </main>
  );
}
