import { EVENT_DATA } from "@/shared/lib/const";
import { getT, type Locale } from "@/shared/lib/i18n";
import { Code2 } from "lucide-react";
import { siteConfig } from "../common";

export async function getEventsConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    title: t("events.general.eventsSection.title"),
    soon: t("events.general.eventsSection.soon"),
    list: [
      {
        id: EVENT_DATA.graphic_design_open_class.key,
        title: t("events.general.eventsSection.list.0.title"),
        description: t("events.general.eventsSection.list.0.description"),
        // Пробуем получить переводы для date, если их нет - date будет undefined
        date: (() => {
          const monthKey = "events.general.eventsSection.list.0.date.month";
          const dayKey = "events.general.eventsSection.list.0.date.day";
          const timeKey = "events.general.eventsSection.list.0.date.time";
          
          const month = t(monthKey);
          const day = t(dayKey);
          const time = t(timeKey);
          
          // Если переводы существуют (не равны ключам), возвращаем date объект
          if (month !== monthKey && day !== dayKey && time !== timeKey) {
            return { month, day, time };
          }
          
          // Если переводов нет, возвращаем undefined
          return undefined;
        })(),
        duration: t("events.general.eventsSection.list.0.duration"),
        type: t("events.general.eventsSection.list.0.type"),
        icon: <Code2 className="w-5 h-5 text-primary" />,
        href: `${siteConfig.routes.events}/${EVENT_DATA.graphic_design_open_class.key}`,
        requiresRegistration: true,
        maxParticipants: 20,
        currentParticipants: 12,
      },
    ] as const,
    cardLabels: {
      completed: t("events.single.card.completed"),
      full: t("events.single.card.full"),
      registration_open: t("events.single.card.registration_open"),
      participants_label: t("events.single.card.participants_label"),
      details: t("events.single.card.details"),
      learn_more: t("events.single.card.learn_more"),
    },
  } as const;
}
