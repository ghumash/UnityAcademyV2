import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getDictionary, Locale } from "@/shared/lib/i18n";
import { ApplyForm } from "@/features/apply";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return createMetadata({
    title: dict.header.nav.apply,
    canonical: absoluteUrl(`/${params.locale}/apply`),
    alternatesPath: "/apply",
    locale: params.locale,
    description: "Запишись на курс Unity Academy. Короткая форма заявки.",
  });
}

export default async function ApplyPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  return (
    <main>
      <JsonLd
        id="breadcrumbs-apply"
        data={buildBreadcrumbsJsonLd([
          { name: "Home", href: `/${params.locale}` },
          { name: dict.header.nav.apply, href: `/${params.locale}/apply` },
        ])}
      />
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">
            {dict.header.nav.apply}
          </h1>
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
