import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, Locale, locales } from "@/shared/lib/i18n";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Button,
} from "@/shared/ui";
import { getAllSlugs, getCourseBySlugLocale } from "@/shared/content";
import { MdxRenderer } from "@/shared/mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tt = await getT(locale);
  const course = await getCourseBySlugLocale(locale, slug);
  const title = course
    ? course.title
    : `${tt("header.nav.courses")}: ${decodeURIComponent(slug).replace(/-/g, " ")}`;
  const description = course?.excerpt ?? tt("header.nav.courses");
  return createMetadata({
    title,
    canonical: absoluteUrl(`/${locale}/courses/${slug}`),
    alternatesPath: `/courses/${slug}`,
    locale,
    description,
  });
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tt = await getT(locale);
  const course = await getCourseBySlugLocale(locale, slug);

  if (!course) {
    notFound();
  }

  return (
    <main>
      <JsonLd
        id="breadcrumbs-course"
        data={buildBreadcrumbsJsonLd([
          { name: tt("common.home"), href: `/${locale}` },
          { name: tt("header.nav.courses"), href: `/${locale}/courses` },
          { name: course!.title, href: `/${locale}/courses/${slug}` },
        ])}
      />

      <Section>
        <Container>
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${locale}`}>{tt("common.home")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${locale}/courses`}>
                    {tt("header.nav.courses")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{course!.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {course!.title}
          </h1>
          {course!.excerpt ? (
            <p className="mt-3 max-w-prose text-muted-foreground">
              {course!.excerpt}
            </p>
          ) : null}

          {course!.body ? (
            <div className="mt-8">
              <MdxRenderer source={course!.body} />
            </div>
          ) : (
            <div className="mt-8 rounded-lg border p-6">
              <p className="text-sm text-muted-foreground">
                Контент курса появится после подключения рендера MDX.
              </p>
            </div>
          )}

          <div className="mt-8">
            <Button asChild>
              <Link href={`/${locale}/apply`}>{tt("header.nav.apply")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
