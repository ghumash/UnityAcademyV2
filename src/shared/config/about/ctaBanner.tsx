import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import { siteConfig } from "@/shared/config/common";

export async function getCtaBannerConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    heading: t("about.ctaBanner.heading"),
    buttons: {
      primary: {
        text: t("about.ctaBanner.buttons.primary"),
        url: siteConfig.routes.contacts,
      },
    },
  } as const;
}
