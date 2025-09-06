import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import type { Course } from "@/widgets/Courses/types";

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
        level: "beginner",
        format: "offline",
        icon: "Code",
        theme: "indigo",
        href: "/courses/web-development",
      },
      {
        id: "ai-fundamentals",
        title: t("home.courses.courses.1.title"),
        description: t("home.courses.courses.1.description"),
        duration: t("home.courses.courses.1.duration"),
        level: "intermediate",
        format: "hybrid",
        icon: "Brain",
        theme: "purple",
        href: "/courses/ai-fundamentals",
      },
      {
        id: "graphic-design",
        title: t("home.courses.courses.2.title"),
        description: t("home.courses.courses.2.description"),
        duration: t("home.courses.courses.2.duration"),
        level: "beginner",
        format: "offline",
        icon: "Palette",
        theme: "orange",
        href: "/courses/graphic-design",
      },
      {
        id: "android-development",
        title: t("home.courses.courses.3.title"),
        description: t("home.courses.courses.3.description"),
        duration: t("home.courses.courses.3.duration"),
        level: "intermediate",
        format: "online",
        icon: "Smartphone",
        theme: "emerald",
        href: "/courses/android-development",
      },
      {
        id: "smm-content",
        title: t("home.courses.courses.4.title"),
        description: t("home.courses.courses.4.description"),
        duration: t("home.courses.courses.4.duration"),
        level: "beginner",
        format: "hybrid",
        icon: "Megaphone",
        theme: "cyan",
        href: "/courses/smm-content",
      },
      {
        id: "soft-skills",
        title: t("home.courses.courses.5.title"),
        description: t("home.courses.courses.5.description"),
        duration: t("home.courses.courses.5.duration"),
        level: "beginner",
        format: "offline",
        icon: "Users",
        theme: "rose",
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
