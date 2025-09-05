import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import {
  Code,
  Brain,
  Palette,
  Bot,
  Globe,
  MapPin,
  Share2,
  Clock,
  GraduationCap,
  Megaphone,
  Users,
  Smartphone,
  ArrowBigDown,
} from "lucide-react";

export type Level = "beginner" | "intermediate" | "advanced";
export type Format = "online" | "offline" | "hybrid";
export type Theme = "indigo" | "purple" | "orange" | "emerald" | "cyan" | "rose";

export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g. "3 месяца"
  level: Level;
  format: Format;
  /** lucide icon name to render on the card header */
  icon?: keyof typeof _ICONS;
  /** visual theme color */
  theme?: Theme;
  /** optional link to course page */
  href?: string;
};

const _ICONS = {
  Code,
  Brain,
  Palette,
  Bot,
  Globe,
  MapPin,
  Share2,
  Clock,
  GraduationCap,
  Megaphone,
  Users,
  Smartphone,
  ArrowBigDown,
};

const THEME_ICON_MAPPING = [
  "Code", "Brain", "Palette", "Bot", "Globe", "MapPin"
] as const;

const THEME_MAPPING = [
  "indigo", "purple", "orange", "emerald", "cyan", "rose"
] as const;

export async function getCoursesConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    title: t("home.courses.title"),
    courses: [
      {
        id: "web-development",
        title: t("home.courses.courses.0.title"),
        description: t("home.courses.courses.0.description"),
        duration: t("home.courses.courses.0.duration"),
        level: "beginner" as Level,
        format: "offline" as Format,
        icon: THEME_ICON_MAPPING[0],
        theme: THEME_MAPPING[0] as Theme,
        href: "/courses/web-development",
      },
      {
        id: "ai-fundamentals",
        title: t("home.courses.courses.1.title"),
        description: t("home.courses.courses.1.description"),
        duration: t("home.courses.courses.1.duration"),
        level: "intermediate" as Level,
        format: "hybrid" as Format,
        icon: THEME_ICON_MAPPING[1],
        theme: THEME_MAPPING[1] as Theme,
        href: "/courses/ai-fundamentals",
      },
      {
        id: "graphic-design",
        title: t("home.courses.courses.2.title"),
        description: t("home.courses.courses.2.description"),
        duration: t("home.courses.courses.2.duration"),
        level: "beginner" as Level,
        format: "offline" as Format,
        icon: THEME_ICON_MAPPING[2],
        theme: THEME_MAPPING[2] as Theme,
        href: "/courses/graphic-design",
      },
      {
        id: "android-development",
        title: t("home.courses.courses.3.title"),
        description: t("home.courses.courses.3.description"),
        duration: t("home.courses.courses.3.duration"),
        level: "intermediate" as Level,
        format: "online" as Format,
        icon: THEME_ICON_MAPPING[3],
        theme: THEME_MAPPING[3] as Theme,
        href: "/courses/android-development",
      },
      {
        id: "smm-content",
        title: t("home.courses.courses.4.title"),
        description: t("home.courses.courses.4.description"),
        duration: t("home.courses.courses.4.duration"),
        level: "beginner" as Level,
        format: "hybrid" as Format,
        icon: THEME_ICON_MAPPING[4],
        theme: THEME_MAPPING[4] as Theme,
        href: "/courses/smm-content",
      },
      {
        id: "soft-skills",
        title: t("home.courses.courses.5.title"),
        description: t("home.courses.courses.5.description"),
        duration: t("home.courses.courses.5.duration"),
        level: "beginner" as Level,
        format: "offline" as Format,
        icon: THEME_ICON_MAPPING[5],
        theme: THEME_MAPPING[5] as Theme,
        href: "/courses/soft-skills",
      },
    ] as const satisfies readonly Course[],
    levels: {
      beginner: t("home.courses.levels.beginner"),
      intermediate: t("home.courses.levels.intermediate"),
      advanced: t("home.courses.levels.advanced"),
    },
    formats: {
      online: t("home.courses.formats.online"),
      offline: t("home.courses.formats.offline"),
      hybrid: t("home.courses.formats.hybrid"),
    },
  } as const;
}
