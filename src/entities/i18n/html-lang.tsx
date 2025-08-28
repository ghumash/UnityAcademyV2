"use client";

import { Locale } from "@/shared/lib/i18n";
import { useEffect } from "react";

export default function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";
    document.documentElement.setAttribute("data-locale", locale);
  }, [locale]);

  return null;
}
