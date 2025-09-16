"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { type Locale, locales } from "@/shared/lib/i18n";

type Props = { locale: Locale };

export const LanguageSwitcher = memo(({ locale }: Props) => {
  const router = useRouter();

  const handleChange = useCallback(
    (next: string) => {
      const nextLocale = next as Locale;
      if (nextLocale === locale) return;

      const url = new URL(window.location.href);
      const segs = url.pathname.split("/"); // ["", "en", ...] or ["", ...]
      const hasLocale = locales.includes(segs[1] as Locale);

      if (hasLocale) segs[1] = nextLocale;
      else segs.splice(1, 0, nextLocale);

      url.pathname = segs.join("/").replace(/\/+/g, "/");
      router.replace(`${url.pathname}${url.search}${url.hash}`, {
        scroll: false,
      });
    },
    [locale, router]
  );

  const flags: Record<Locale, string> = {
    hy: "🇦🇲",
    en: "🇺🇸",
    ru: "🇷🇺",
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="rounded-full h-9 w-9 p-0 border hover:bg-muted [&>svg]:hidden justify-center">
        <SelectValue>
          <span className="text-base">{flags[locale]}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" className="w-auto min-w-0 p-2">
        {locales.map((l) => (
          <SelectItem
            key={l}
            value={l}
            className="cursor-pointer rounded-full h-9 w-9 p-0 flex items-center justify-center mb-1 last:mb-0 [&>span:first-child]:hidden"
          >
            <span className="text-base">{flags[l]}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
