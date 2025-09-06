import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, type Locale } from "@/shared/lib/i18n";
import { getPageBySlugLocale } from "@/shared/content/pages";
import { MdxRenderer } from "@/shared/mdx";
import { ApplyForm } from "@/features/apply";
import { AppBreadcrumb } from "@/widgets";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "apply");
  return createMetadata({
    title: page?.title ?? t("common.navigation.apply"),
    canonical: absoluteUrl(`/${locale}/apply`),
    alternatesPath: "/apply",
    locale,
    description: page?.description ?? t("common.navigation.apply"),
  });
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "apply");

  return (
    <main id="main">
      <JsonLd
        id="breadcrumbs-apply"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          { name: page?.title ?? t("common.navigation.apply"), href: `/${locale}/apply` },
        ])}
      />
      <Section>
        <Container>
          <AppBreadcrumb
            items={[
              { label: t("common.navigation.home"), href: "/" },
              { label: t("common.navigation.apply") },
            ]}
          />

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {page?.title ?? t("common.navigation.apply")}
          </h1>

          {page?.body ? (
            <div className="mt-6">
              <MdxRenderer source={page.body} />
            </div>
          ) : null}

          <div className="mt-8">
            <ApplyForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
