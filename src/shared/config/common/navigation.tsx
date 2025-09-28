import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import { siteConfig } from "./site";
import { GraduationCap, Home, User, Phone, Calendar } from "lucide-react";

export async function getNavigationConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    navItems: [
      {
        name: t("common.navigation.home"),
        url: siteConfig.routes.home,
        icon: <Home size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />,
        ariaLabel: t("common.navigation.home"),
      },
      {
        name: t("common.navigation.about"),
        url: siteConfig.routes.about,
        icon: <User size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />,
        ariaLabel: t("common.navigation.about"),
      },
      {
        name: t("common.navigation.courses"),
        url: siteConfig.routes.courses,
        icon: <GraduationCap size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />,
        ariaLabel: t("common.navigation.courses"),
      },
      {
        name: t("common.navigation.events"),
        url: siteConfig.routes.events,
        icon: <Calendar size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />,
        ariaLabel: t("common.navigation.events"),
      },
      {
        name: t("common.navigation.contacts"),
        url: siteConfig.routes.contacts,
        icon: <Phone size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />,
        ariaLabel: t("common.navigation.contacts"),
      },
    ],
    applyButton: {
      label: t("common.navigation.apply"),
      ariaLabel: t("common.navigation.apply"),
    },
  } as const;
}
