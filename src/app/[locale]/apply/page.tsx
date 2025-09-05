import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, Locale } from "@/shared/lib/i18n";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui";
import { getPageBySlugLocale } from "@/shared/content/pages";
import { MdxRenderer } from "@/shared/mdx";
import { ApplyForm } from "@/features/apply";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "apply");
  return createMetadata({
    title: page?.title ?? t("nav.apply"),
    canonical: absoluteUrl(`/${locale}/apply`),
    alternatesPath: "/apply",
    locale,
    description: page?.description ?? t("nav.apply"),
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
          { name: t("common.home"), href: `/${locale}` },
          { name: page?.title ?? t("nav.apply"), href: `/${locale}/apply` },
        ])}
      />
      <Section>
        <Container>
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${locale}`}>{t("common.home")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {page?.title ?? t("nav.apply")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {page?.title ?? t("nav.apply")}
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
