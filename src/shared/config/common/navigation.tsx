import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import { Briefcase, Home, User, Phone } from "lucide-react";

export async function getNavigationConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    navItems: [
      {
        name: t("common.navigation.home"),
        url: "/",
        icon: <Home size={18} strokeWidth={2.5} />,
        ariaLabel: t("common.navigation.home"),
      },
      {
        name: t("common.navigation.about"),
        url: "/about",
        icon: <User size={18} strokeWidth={2.5} />,
        ariaLabel: t("common.navigation.about"),
      },
      {
        name: t("common.navigation.courses"),
        url: "/courses",
        icon: <Briefcase size={18} strokeWidth={2.5} />,
        ariaLabel: t("common.navigation.courses"),
      },
      {
        name: t("common.navigation.contacts"),
        url: "/contacts",
        icon: <Phone size={18} strokeWidth={2.5} />,
        ariaLabel: t("common.navigation.contacts"),
      },
    ],
    applyButton: {
      label: t("common.navigation.apply"),
      ariaLabel: t("common.navigation.apply"),
    },
  } as const;
}
