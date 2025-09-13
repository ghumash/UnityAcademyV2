import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export async function getApplyConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    hero: {
      title: t("apply.hero.title"),
    },
    callToAction: {
      title: t("apply.callToAction.title"),
      subtitle: t("apply.callToAction.subtitle"),
    },
  } as const;
}
