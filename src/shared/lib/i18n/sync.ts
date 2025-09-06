import type { Locale } from "./config";
import type { Dict } from "./types";
import { en } from "./directories/en";
import { hy } from "./directories/hy";
import { ru } from "./directories/ru";

const dicts: Record<Locale, Dict> = { ru, en, hy };

export function getDictionarySync(locale: Locale): Dict {
  return dicts[locale] ?? ru;
}
