import type { Dict, Locale } from "./types";
import { ru, en, hy, locales } from "./";

export const defaultLocale: Locale = "hy";

export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  hy: "Հայերեն",
};

const dicts: Record<Locale, Dict> = { ru, en, hy };

export async function getDictionary(locale: Locale): Promise<Dict> {
  return dicts[locale];
}

export function getDictionarySync(locale: Locale): Dict {
  return dicts[locale] ?? hy;
}

function getByPath(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function t(dict: Dict, path: string): string {
  const v = getByPath(dict, path);
  return typeof v === "string" ? v : path;
}

export async function getT(locale: Locale) {
  const dict = await getDictionary(locale);
  return (path: string) => t(dict, path);
}

export function resolveLocaleFromPath(pathname: string): Locale {
  const first = pathname.split("/").find(Boolean);
  return (locales as readonly string[]).includes(first as Locale)
    ? (first as Locale)
    : defaultLocale;
}
