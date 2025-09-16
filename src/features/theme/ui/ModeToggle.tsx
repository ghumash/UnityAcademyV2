"use client";

import { memo } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/shared/ui";
import { Moon, Sun, Monitor } from "lucide-react";
import { useI18n } from "@/shared/lib/i18n";

export const ModeToggle = memo(() => {
  const { setTheme, theme } = useTheme();
  const { locale } = useI18n();

  // Переводы для темы
  const themeTranslations = {
    ru: {
      switchToLight: "Переключить на светлую тему",
      switchToDark: "Переключить на тёмную тему",
      switchToSystem: "Переключить на системную тему",
    },
    en: {
      switchToLight: "Switch to light theme",
      switchToDark: "Switch to dark theme",
      switchToSystem: "Switch to system theme",
    },
    hy: {
      switchToLight: "Անցնել բաց թեմային",
      switchToDark: "Անցնել մուգ թեմային",
      switchToSystem: "Անցնել համակարգային թեմային",
    },
  };


  const cycleTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("system");
        break;
      case "system":
      default:
        setTheme("light");
        break;
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="size-4" />;
      case "dark":
        return <Moon className="size-4" />;
      case "system":
      default:
        return <Monitor className="size-4" />;
    }
  };

  const t = themeTranslations[locale];
  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return t.switchToDark;
      case "dark":
        return t.switchToSystem;
      case "system":
      default:
        return t.switchToLight;
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycleTheme}
      aria-label={getThemeLabel()}
      className="rounded-full transition-all duration-200 hover:scale-105"
    >
      <div className="transition-all duration-200">{getThemeIcon()}</div>
      <span className="sr-only">{getThemeLabel()}</span>
    </Button>
  );
});
