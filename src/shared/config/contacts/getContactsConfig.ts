import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export async function getContactsConfig(locale: Locale) {
  const t = await getT(locale);

  return {} as const;
}
