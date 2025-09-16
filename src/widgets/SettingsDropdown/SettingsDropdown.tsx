"use client";

import { memo } from "react";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  Button,
} from "@/shared/ui";
import { LanguageSwitcher } from "@/features/i18n";
import { ModeToggle } from "@/features/theme";
import type { Locale } from "@/shared/lib/i18n";
import dynamic from "next/dynamic";

interface SettingsDropdownProps {
  locale: Locale;
}

const SettingsDropdownComponent = memo(({ locale }: SettingsDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-9 w-9 hover:bg-muted"
          aria-label="Настройки"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto min-w-0">
        <div className="p-2">
          <LanguageSwitcher locale={locale} />
          <DropdownMenuSeparator/>
          <ModeToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export const SettingsDropdown = dynamic(
  () => Promise.resolve(SettingsDropdownComponent),
  {
    ssr: false,
  }
);
