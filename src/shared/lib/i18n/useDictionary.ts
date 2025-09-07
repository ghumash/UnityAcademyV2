"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { getDictionarySync, resolveLocaleFromPath } from "./helpers";

export function useDictionary() {
  const pathname = usePathname() || "/";
  const locale = useMemo(() => resolveLocaleFromPath(pathname), [pathname]);
  const dict = getDictionarySync(locale);

  return { dict };
}
