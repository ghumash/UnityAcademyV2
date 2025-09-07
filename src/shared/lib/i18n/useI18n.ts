"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { getDictionarySync, resolveLocaleFromPath, t } from "./helpers";
import type { Locale, Dict } from "./types";

export function useI18n() {
  const pathname = usePathname() || "/";
  const locale: Locale = useMemo(
    () => resolveLocaleFromPath(pathname),
    [pathname]
  );
  const dict: Dict = useMemo(() => getDictionarySync(locale), [locale]);

  const tt = useMemo(() => {
    return (path: string) => t(dict, path);
  }, [dict]);

  return { locale, dict, t: tt };
}
