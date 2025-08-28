import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import Link from "next/link";
import { absoluteUrl } from "@/shared/config";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { Button } from "@/shared/ui";

export const metadata: Metadata = createMetadata({
  title: "Курсы",
  canonical: absoluteUrl("/courses"),
  description:
    "Курсы Unity Academy: веб-разработка, искусственный интеллект, создание контента, Android, SMM и soft skills.",
});

export default function CoursesPage() {
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
          <p className="mt-3 text-muted-foreground">
            Мы готовим практиков: от основ до продакшена. Скоро здесь появится
            каталог с программами и наборами групп.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/apply">Подать заявку</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
