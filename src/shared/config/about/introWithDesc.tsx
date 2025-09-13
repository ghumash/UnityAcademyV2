import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export async function getIntroWithDescConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    title: t("about.introWithDesc.title"),
    description: t("about.introWithDesc.description"),
    description_2: t("about.introWithDesc.description_2"),
    description_3: t("about.introWithDesc.description_3"),
  } as const;
}
