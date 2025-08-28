"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale, localeNames } from "./config";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui";

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
      <SelectTrigger className="w-[104px]" aria-label="Language">
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
