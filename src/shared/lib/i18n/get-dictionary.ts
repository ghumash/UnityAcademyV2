import type { Locale } from "./config";
import type { Dict } from "./types";
import { ru, en, hy } from "./";

const dicts: Record<Locale, Dict> = { ru, en, hy };

export type { Dict };

export async function getDictionary(locale: Locale): Promise<Dict> {
  return dicts[locale];
}
