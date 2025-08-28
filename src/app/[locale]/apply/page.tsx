import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { Locale } from "@/shared/lib/i18n";
import { ApplyForm } from "@/features/apply";

export function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Metadata {
  return createMetadata({
    title: "Подать заявку",
    canonical: absoluteUrl(`/${params.locale}/apply`),
    alternatesPath: "/apply",
    locale: params.locale,
    description: "Запишись на курс Unity Academy. Короткая форма заявки.",
  });
}

export default function ApplyPage({ params }: { params: { locale: Locale } }) {
  return (
    <main>
      <JsonLd
        id="breadcrumbs-apply"
        data={buildBreadcrumbsJsonLd([
          { name: "Главная", href: `/${params.locale}` },
          { name: "Подать заявку", href: `/${params.locale}/apply` },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">Подать заявку</h1>
          <p className="mt-3 text-muted-foreground">
            Оставь контакты и выбери направление. Мы свяжемся.
          </p>
          <div className="mt-8">
            <ApplyForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
