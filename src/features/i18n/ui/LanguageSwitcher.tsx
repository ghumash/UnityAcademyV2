"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui";
import { type Locale, locales } from "@/shared/lib/i18n";

type Props = { locale: Locale };

const LanguageSwitcher = React.memo(function LanguageSwitcher({
  locale,
}: Props) {
  const router = useRouter();
  const labelId = React.useId();

  const handleChange = React.useCallback(
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
    ru: "🇷🇺",
    en: "🇬🇧",
    hy: "🇦🇲",
  };

  return (
    <>
      <span id={labelId} className="sr-only">
        Language
      </span>

      <Select value={locale} onValueChange={(v) => handleChange(v as Locale)}>
        <SelectTrigger
          aria-labelledby={labelId}
          aria-label="Language"
          title={flags[locale]}
          // Small screens: icon-only (hide chevron and text), compact size
          // ≥sm: show text + chevron, normal size
          className={`
            rounded-full
            md:h-10 md:w-auto
            py-2 px-2.5
            flex items-center gap-2 justify-center
            [&_svg]:hidden
          `}
        >
          {/* Text value is hidden on small screens */}
          <span className="hidden md:inline">
            <SelectValue />
          </span>
        </SelectTrigger>

        <SelectContent align="end">
          {locales.map((l) => (
            <SelectItem key={l} value={l}>
              {flags[l]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
});

export default LanguageSwitcher;
