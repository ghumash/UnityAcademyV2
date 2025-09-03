"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui";
import { Locale, localeNames, locales } from "@/shared/lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const onChange = (next: Locale) => {
    if (next === locale) return;
    const parts = pathname.split("/");
    parts[1] = next; // заменить сегмент локали
    const target = parts.join("/") || `/${next}`;
    router.replace(target);
  };

  return (
    <Select value={locale} onValueChange={(v) => onChange(v as Locale)}>
      <SelectTrigger className="rounded-full" aria-label="Language">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {locales.map((l) => (
          <SelectItem key={l} value={l}>
            {localeNames[l]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
