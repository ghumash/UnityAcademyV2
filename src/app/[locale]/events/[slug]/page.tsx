import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  JsonLd,
  buildBreadcrumbsJsonLd,
  buildOrganizationJsonLd,
  createMetadata,
} from "@/shared/lib/seo";
import { absoluteUrl, getFormConfig, siteConfig } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { getEventsConfig, getEventPageConfig } from "@/shared/config/events";
import { EVENT_DATA, EVENT_KEYS, type EventKey } from "@/shared/lib/const";
import { AppAutoBreadcrumb, CallToAction } from "@/widgets";
import {
  EventHero,
  EventAgenda,
  EventSpeakers,
  EventBenefits,
} from "@/entities/event";
import { Container, Section } from "@/shared/ui/custom";
import { EventRegisterForm } from "@/features/event-register";
import { ScrollToHash } from "@/shared/lib/scroll-to-hash";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: EventKey }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getT(locale);

  return createMetadata({
    title: t(`events.list.${slug}.eventHeroSection.title`),
    canonical: absoluteUrl(`/${locale}${siteConfig.routes.events}/${slug}`),
    alternatesPath: `${siteConfig.routes.events}/${slug}`,
    locale,
    description: t(`events.list.${slug}.eventHeroSection.description`),
  });
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: EventKey }>;
}) {
  const { locale, slug } = await params;
  const t = await getT(locale);
  const events = await getEventsConfig(locale);
  const formConfig = await getFormConfig(locale);
  const eventPageConfig = await getEventPageConfig(locale, slug);
  const eventExists = events.list.some((event) => event.id === slug);

  if (!eventExists) {
    notFound();
  }

  return (
    <main id="main" className="sm:mt-36 md:mt-40">
      <ScrollToHash />
      <JsonLd
        id="breadcrumbs-event"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          {
            name: t("common.navigation.events"),
            href: `/${locale}${siteConfig.routes.events}`,
          },
          {
            name: t(`events.list.${slug}.eventHeroSection.title`),
            href: `/${locale}${siteConfig.routes.events}/${slug}`,
          },
        ])}
      />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />

      <Section>
        <Container>
          <AppAutoBreadcrumb />
        </Container>
      </Section>

      <EventHero config={eventPageConfig.eventHeroSection} />

      <EventAgenda
        title={eventPageConfig.agenda.title}
        items={eventPageConfig.agenda.items}
        display={eventPageConfig.agenda.display}
        agendaLabels={eventPageConfig.agenda.agendaLabels}
      />

      <EventSpeakers
        title={eventPageConfig.speakers.title}
        list={eventPageConfig.speakers.list}
        display={eventPageConfig.speakers.display}
        speakersLabels={eventPageConfig.speakers.speakersLabels}
      />

      <EventBenefits
        title={eventPageConfig.benefits.title}
        list={eventPageConfig.benefits.list}
        benefitsLabels={eventPageConfig.benefits.benefitsLabels}
      />

      {eventPageConfig.isUpcoming && (
        <Section id="form">
          <Container>
            <CallToAction
              title={eventPageConfig.callToAction.title}
              subtitle={eventPageConfig.callToAction.subtitle}
              activeTagId={eventPageConfig.callToAction.activeTagId}
              keys={EVENT_KEYS}
              data={EVENT_DATA}
            >
              <EventRegisterForm
                config={formConfig}
                defaultEvent={EVENT_DATA[slug].value}
              />
            </CallToAction>
          </Container>
        </Section>
      )}
    </main>
  );
}
