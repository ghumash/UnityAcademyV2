"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { locales, defaultLocale } from "@/shared/lib/i18n/config";
import { getDictionarySync } from "./sync";

type Locale = (typeof locales)[number] & string;

function resolveLocaleFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  return (locales as readonly string[]).includes(first)
    ? (first as Locale)
    : (defaultLocale as Locale);
}

export function useDictionary() {
  const pathname = usePathname() || "/";
  const locale = useMemo(() => resolveLocaleFromPath(pathname), [pathname]);
  const dict = getDictionarySync(locale);

  return { dict };
}
