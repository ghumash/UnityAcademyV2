import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { Locale } from "@/shared/lib/i18n";
import CoursesEmptyState from "@/app/courses/_components/empty-state";

export function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Metadata {
  return createMetadata({
    title: "Курсы",
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
  return (
    <main>
      <JsonLd
        id="breadcrumbs-courses"
        data={buildBreadcrumbsJsonLd([
          { name: "Главная", href: `/${params.locale}` },
          { name: "Курсы", href: `/${params.locale}/courses` },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">Курсы</h1>
          <div className="mt-8">
            <CoursesEmptyState />
          </div>
        </Container>
      </Section>
    </main>
  );
}
