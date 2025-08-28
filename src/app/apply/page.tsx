import type { Metadata } from "next";
import { Container, Section } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { ApplyForm } from "@/entities/apply";

export const metadata: Metadata = createMetadata({
  title: "Подать заявку",
  canonical: absoluteUrl("/apply"),
  description: "Запишись на курс Unity Academy. Короткая форма заявки.",
});

export default function ApplyPage() {
  return (
    <main>
      <JsonLd
        id="breadcrumbs-apply"
        data={buildBreadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Подать заявку", href: "/apply" },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">Подать заявку</h1>
          <p className="mt-3 text-muted-foreground">
            Оставь контакты и выбери интересующее направление. Мы свяжемся в
            ближайшее время.
          </p>
          <div className="mt-8">
            <ApplyForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
