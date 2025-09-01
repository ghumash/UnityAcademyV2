import { Locale } from "./config";
import en from "./directories/en";
import hy from "./directories/hy";
import ru from "./directories/ru";
import { Dict } from "./types";

const dicts: Record<Locale, Dict> = { ru, en, hy };

export function getDictionarySync(locale: Locale): Dict {
  return dicts[locale] ?? ru;
}
