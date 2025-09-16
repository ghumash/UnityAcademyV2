"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  Button,
} from "@/shared/ui";
import { type Locale, locales } from "@/shared/lib/i18n";

type Props = { locale: Locale };

export const LanguageSwitcher = memo(({ locale }: Props) => {
  const router = useRouter();

  const handleChange = useCallback(
    (next: Locale) => {
      if (next === locale) return;

      const url = new URL(window.location.href);
      const segs = url.pathname.split("/"); // ["", "en", ...] or ["", ...]
      const hasLocale = locales.includes(segs[1] as Locale);

      if (hasLocale) segs[1] = next;
      else segs.splice(1, 0, next);

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-9 w-9 hover:bg-muted border"
          aria-label="Language"
          title={`Current language: ${flags[locale]}`}
        >
          <span className="text-base">{flags[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto min-w-0">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => handleChange(l)}
            className={`cursor-pointer ${l === locale ? "bg-muted" : ""}`}
          >
            <span className="mr-2">{flags[l]}</span>
            <span className="capitalize">{l}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
