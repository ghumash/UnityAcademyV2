import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export async function getCtaBannerConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    heading: t("about.ctaBanner.heading"),
    buttons: {
      primary: {
        text: t("about.ctaBanner.buttons.primary"),
        url: "/contact",
      },
    },
  } as const;
}
