import type { Metadata } from "next";
import {
  JsonLd,
  buildBreadcrumbsJsonLd,
  buildOrganizationJsonLd,
  createMetadata,
} from "@/shared/lib/seo";
import { absoluteUrl, siteConfig } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { AppAutoBreadcrumb } from "@/widgets";
import { Events } from "@/entities/event";
import { Container, Section } from "@/shared/ui/custom";
import { getEventsConfig } from "@/shared/config/events";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);

  return createMetadata({
    title: t("common.seo.events.title"),
    canonical: absoluteUrl(`/${locale}${siteConfig.routes.events}`),
    alternatesPath: siteConfig.routes.events,
    locale,
    description: t("common.seo.events.description"),
  });
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const events = await getEventsConfig(locale);

  return (
    <main id="main" className="sm:mt-36 md:mt-40">
      <JsonLd
        id="breadcrumbs-events"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          {
            name: t("common.navigation.events"),
            href: `/${locale}${siteConfig.routes.events}`,
          },
        ])}
      />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />

      <Section as="div" className="md:mb-0">
        <Container>
          <AppAutoBreadcrumb />
        </Container>
      </Section>
      <Events {...events} />
    </main>
  );
}
