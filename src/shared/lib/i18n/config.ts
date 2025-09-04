export const locales = ["hy", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "hy";

export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  hy: "Հայերեն",
};
