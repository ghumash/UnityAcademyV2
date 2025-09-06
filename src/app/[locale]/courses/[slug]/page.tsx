import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, type Locale, locales } from "@/shared/lib/i18n";
import { Button } from "@/shared/ui";
import { getAllSlugs, getCourseBySlugLocale } from "@/shared/content";
import { getMdxToc, MdxRenderer, MdxTocNav } from "@/shared/mdx";
import { AppBreadcrumb } from "@/widgets";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getT(locale);
  const course = await getCourseBySlugLocale(locale, slug);
  const title = course
    ? course.title
    : `${t("common.nav.courses")}: ${decodeURIComponent(slug).replace(/-/g, " ")}`;
  const description = course?.excerpt ?? t("common.nav.courses");
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
  return locales.flatMap((locale) =>
    slugs.map((slug: string) => ({ locale, slug }))
  );
}

async function TocSidebar({ source }: { source: string }) {
  const items = await getMdxToc(source);
  return <MdxTocNav items={items} />;
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getT(locale);
  const course = await getCourseBySlugLocale(locale, slug);

  if (!course) notFound();

  return (
    <main id="main">
      <JsonLd
        id="breadcrumbs-course"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.home"), href: `/${locale}` },
          { name: t("common.nav.courses"), href: `/${locale}/courses` },
          { name: course!.title, href: `/${locale}/courses/${slug}` },
        ])}
      />

      <Section>
        <Container>
          <AppBreadcrumb
            items={[
              { label: t("common.nav.courses"), href: `/${locale}/courses` },
              { label: course!.title },
            ]}
          />

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
              <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
                <div>
                  <MdxRenderer source={course!.body} />
                </div>
                <TocSidebar source={course!.body} />
              </div>
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
              <Link href={`/${locale}/apply`}>{t("common.nav.apply")}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
