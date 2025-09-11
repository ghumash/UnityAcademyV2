import type { Locale } from "@/shared/lib/i18n";
import type { NormalizedPage } from "./schema";

// Заглушки для функций, которые раньше работали с MDX
export async function readPageFile(
  _locale: Locale,
  _slug: string
): Promise<NormalizedPage | null> {
  return null;
}

/** Вернуть страницу; если draft — null. */
export async function getPageBySlugLocale(
  _locale: Locale,
  _slug: string
): Promise<NormalizedPage | null> {
  return null;
}
