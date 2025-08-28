import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { createMetadata, JsonLd, buildBreadcrumbsJsonLd } from "@/shared/seo";
import { absoluteUrl, siteConfig } from "@/shared/config";

export const metadata: Metadata = createMetadata({
  title: "О нас",
  canonical: absoluteUrl("/about"),
  description: siteConfig.description,
});

export default function AboutPage() {
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
          <p className="mt-3 text-muted-foreground max-w-prose">
            Unity Academy — современная IT-академия в Ванадзоре. Мы обучаем
            подростков и молодёжь веб-разработке, искусственному интеллекту,
            созданию контента, Android, SMM и навыкам карьеры. Упор на практику,
            менторство и трудоустройство лучших выпускников.
          </p>
        </Container>
      </Section>
    </main>
  );
}
