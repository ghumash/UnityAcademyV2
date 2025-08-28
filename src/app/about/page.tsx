import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config";
import { Person } from "@/features/person";
import { TeamSection } from "@/widgets";

export const metadata: Metadata = createMetadata({
  title: "О нас",
  canonical: absoluteUrl("/about"),
  description: siteConfig.description,
});

async function getTeam(): Promise<Person[]> {
  // Источник данных подключим позже (CMS/BaaS). Пока — пусто.
  return [];
}

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <main>
      <JsonLd
        id="breadcrumbs-about"
        data={buildBreadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "О нас", href: "/about" },
        ])}
      />

      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">О нас</h1>
          <p className="mt-3 max-w-prose text-muted-foreground">
            Unity Academy — современная IT-академия в Ванадзоре. Мы обучаем
            подростков и молодёжь веб-разработке, искусственному интеллекту,
            созданию контента, Android, SMM и навыкам карьеры. Упор на практику,
            менторство и трудоустройство лучших выпускников.
          </p>
        </Container>
      </Section>

      <TeamSection people={team} />
    </main>
  );
}
