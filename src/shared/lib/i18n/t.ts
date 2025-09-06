import type { Locale } from "./config";
import type { Dict } from "./types";
import { getDictionary } from "./get-dictionary";

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
