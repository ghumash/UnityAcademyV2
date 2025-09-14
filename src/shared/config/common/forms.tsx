import { getDictionary } from "@/shared/lib/i18n";
import type { Locale, FormsDict } from "@/shared/lib/i18n";

export async function getFormConfig(locale: Locale): Promise<FormsDict> {
  const dict = await getDictionary(locale);
  return dict.common.forms;
}
