import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import type { EventKey } from "@/shared/lib/const";
import { calculateDaysUntilEvent } from "@/entities/event/lib/utils";

export async function getEventPageConfig(locale: Locale, slug: EventKey) {
  const t = await getT(locale);

  const eventHeroSection = {
    title: t(`events.list.${slug}.eventHeroSection.title` ),
    description: t(`events.list.${slug}.eventHeroSection.description` ),
    // Пробуем получить переводы для date, если их нет - date будет undefined
    date: (() => {
      const dateKey = `events.list.${slug}.eventHeroSection.date`;
      const dateValue = t(dateKey);
      
      // Если перевод существует (не равен ключу), возвращаем date объект
      if (typeof dateValue === 'object' && dateValue !== dateKey) {
        return dateValue;
      }
      
      // Если переводов нет, возвращаем undefined
      return undefined;
    })(),
    duration: t(`events.list.${slug}.eventHeroSection.duration` ),
    eventType: t(`events.list.${slug}.eventHeroSection.type` ),
    formatLabel: t(`events.list.${slug}.eventHeroSection.formatLabel` ),
    requiresRegistration: t(
      `events.list.${slug}.eventHeroSection.requiresRegistration` 
    ),
    registerButtonText: t(
      `events.list.${slug}.eventHeroSection.registerButtonText` 
    ),
    soon: t("events.general.eventsSection.soon"), // Добавляем soon
    ...(t(`events.list.${slug}.eventHeroSection.maxParticipants`) && {
      maxParticipants: t(
        `events.list.${slug}.eventHeroSection.maxParticipants`
      ),
    }),
    ...(t(`events.list.${slug}.eventHeroSection.currentParticipants`) && {
      currentParticipants: t(
        `events.list.${slug}.eventHeroSection.currentParticipants`
      ),
    }),
    ...(t(`events.list.${slug}.eventHeroSection.price`) && {
      price: t(`events.list.${slug}.eventHeroSection.price`),
    }),
    ...(t(`events.list.${slug}.eventHeroSection.originalPrice`) && {
      originalPrice: t(`events.list.${slug}.eventHeroSection.originalPrice`),
    }),
    ...(t(`events.list.${slug}.eventHeroSection.sale`) && {
      sale: t(`events.list.${slug}.eventHeroSection.sale`),
    }),
    heroUILabels: {
      completed: t("events.single.hero.completed"),
      full: t("events.single.hero.full"),
      registration_open: t("events.single.hero.registration_open"),
      duration_label: t("events.single.hero.duration_label"),
      participants_label: t("events.single.hero.participants_label"),
      discount_label: t("events.single.hero.discount_label"),
      days_until: t("events.single.hero.days_until"),
      days_label: t("events.single.hero.days_label"),
      event_completed: t("events.single.hero.event_completed"),
      at_time: t("events.single.hero.at_time"),
      register_button: t("events.single.hero.register_button"),
    },
  };

  const agenda = {
    display: t(`events.list.${slug}.agenda.display`),
    title: t(`events.list.${slug}.agenda.title`),
    items: t(`events.list.${slug}.agenda.items`),
    agendaLabels: {
      subtitle: t("events.single.agenda.subtitle"),
      completion: t("events.single.agenda.completion"),
      speaker_label: t("events.single.agenda.speaker_label"),
    },
  };

  const speakers = {
    display: t(`events.list.${slug}.speakers.display`),
    title: t(`events.list.${slug}.speakers.title`),
    list: t(`events.list.${slug}.speakers.list`),
    speakersLabels: {
      subtitle: t("events.single.speakers.subtitle"),
      contact_label: t("events.single.speakers.contact_label"),
    },
  };

  const benefits = {
    title: t(`events.list.${slug}.benefits.title`),
    list: t(`events.list.${slug}.benefits.list`),
    benefitsLabels: {
      subtitle: t("events.single.benefits_component.subtitle"),
    },
  };

  const callToAction = {
    title: t(`events.list.${slug}.cta.title`),
    subtitle: t(`events.list.${slug}.cta.subtitle`),
    activeTagId: slug as EventKey,
  };

  // Calculate if event is upcoming for registration form
  const eventDate = eventHeroSection.date;
  const { isUpcoming } = eventDate ? calculateDaysUntilEvent(eventDate.fullDate) : { isUpcoming: true };

  return {
    eventHeroSection,
    agenda,
    speakers,
    benefits,
    callToAction,
    isUpcoming,
  };
}
