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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tt = await getT(locale);
  const page = await getPageBySlugLocale(locale, "about");
  return createMetadata({
    title: page?.title ?? tt("header.nav.about"),
    canonical: absoluteUrl(`/${locale}/about`),
    alternatesPath: "/about",
    locale,
    description: page?.description ?? tt("header.nav.about"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tt = await getT(locale);
  const page = await getPageBySlugLocale(locale, "about");

  return (
    <main id="main">
      <JsonLd
        id="breadcrumbs-about"
        data={buildBreadcrumbsJsonLd([
          { name: tt("common.home"), href: `/${locale}` },
          { name: page?.title ?? tt("header.nav.about"), href: `/${locale}/about` },
        ])}
      />
      <Section>
        <Container>
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${locale}`}>{tt("common.home")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {page?.title ?? tt("header.nav.about")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {page?.title ?? tt("header.nav.about")}
          </h1>

          {page?.body ? (
            <div className="mt-6">
              <MdxRenderer source={page.body} />
            </div>
          ) : null}
        </Container>
      </Section>
    </main>
  );
}
