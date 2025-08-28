import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, Locale } from "@/shared/lib/i18n";
import CoursesEmptyState from "@/app/courses/_components/empty-state";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const tt = await getT(params.locale);
  return createMetadata({
    title: tt("header.nav.courses"),
    canonical: absoluteUrl(`/${params.locale}/courses`),
    alternatesPath: "/courses",
    locale: params.locale,
    description:
      "Курсы Unity Academy: веб-разработка, искусственный интеллект, создание контента, Android, SMM и soft skills.",
  });
}

export default async function CoursesPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const tt = await getT(params.locale);

  return (
    <main>
      <JsonLd
        id="breadcrumbs-courses"
        data={buildBreadcrumbsJsonLd([
          { name: tt("common.home"), href: `/${params.locale}` },
          { name: tt("header.nav.courses"), href: `/${params.locale}/courses` },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">
            {tt("header.nav.courses")}
          </h1>
          <div className="mt-8">
            <CoursesEmptyState />
          </div>
        </Container>
      </Section>
    </main>
  );
}
