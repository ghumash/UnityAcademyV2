import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import CoursesEmptyState from "./_components/empty-state";
import { Course, CourseCard } from "@/entities/course";

export const metadata: Metadata = createMetadata({
  title: "Курсы",
  canonical: absoluteUrl("/courses"),
  description:
    "Курсы Unity Academy: веб-разработка, искусственный интеллект, создание контента, Android, SMM и soft skills.",
});

async function getCourses(): Promise<Course[]> {
  // Подключим CMS/БД позже — пока возвращаем пустой список без моков.
  return [];
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main>
      <JsonLd
        id="breadcrumbs-courses"
        data={buildBreadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Курсы", href: "/courses" },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">Курсы</h1>

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
