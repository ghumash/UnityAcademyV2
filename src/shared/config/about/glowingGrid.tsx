import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import {
  Rocket,
  Briefcase,
  FileText,
  BadgeCheck,
  Mic,
  Users,
  CalendarDays,
} from "lucide-react";

export type GlowingGridItem = {
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
};

export async function getGlowingGridConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    items: [
      {
        icon: (
          <Rocket
            className="h-4 w-4 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        title: t("about.glowingGrid.items.0.title"),
        description: t("about.glowingGrid.items.0.description"),
      },
      {
        icon: (
          <Briefcase
            className="h-4 w-4 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        title: t("about.glowingGrid.items.1.title"),
        description: t("about.glowingGrid.items.1.description"),
      },
      {
        icon: (
          <FileText
            className="h-4 w-4 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        title: t("about.glowingGrid.items.2.title"),
        description: t("about.glowingGrid.items.2.description"),
      },
      {
        icon: (
          <BadgeCheck
            className="h-4 w-4 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        title: t("about.glowingGrid.items.3.title"),
        description: t("about.glowingGrid.items.3.description"),
      },
      {
        icon: (
          <Mic
            className="h-4 w-4 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        title: t("about.glowingGrid.items.4.title"),
        description: t("about.glowingGrid.items.4.description"),
      },
      {
        icon: (
          <Users
            className="h-4 w-4 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        title: t("about.glowingGrid.items.5.title"),
        description: t("about.glowingGrid.items.5.description"),
      },
      {
        icon: (
          <CalendarDays
            className="h-4 w-4 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        title: t("about.glowingGrid.items.6.title"),
        description: t("about.glowingGrid.items.6.description"),
      },
    ] as const satisfies readonly GlowingGridItem[],
  } as const;
}
