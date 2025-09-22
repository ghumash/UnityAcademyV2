import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import { siteConfig } from "@/shared/config/common";
import type { Course } from "@/entities/course";
import { COURSE_DATA } from "@/shared/lib/const";

export async function getCoursesConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    title: t("courses.general.coursesSection.title"),
    list: [
      {
        id: COURSE_DATA.web_development.key,
        title: t("courses.general.coursesSection.list.0.title"),
        description: t("courses.general.coursesSection.list.0.description"),
        duration: t("courses.general.coursesSection.list.0.duration"),
        level: "beginner",
        format: "offline",
        icon: "Code2",
        theme: "blue",
        href: `${siteConfig.routes.courses}/${COURSE_DATA.web_development.key}`,
      },
      {
        id: COURSE_DATA.graphic_design.key,
        title: t("courses.general.coursesSection.list.1.title"),
        description: t("courses.general.coursesSection.list.1.description"),
        duration: t("courses.general.coursesSection.list.1.duration"),
        level: "beginner",
        format: "offline",
        icon: "Palette",
        theme: "rose",
        href: `${siteConfig.routes.courses}/${COURSE_DATA.graphic_design.key}`,
      },
      {
        id: COURSE_DATA.scratch.key,
        title: t("courses.general.coursesSection.list.2.title"),
        description: t("courses.general.coursesSection.list.2.description"),
        duration: t("courses.general.coursesSection.list.2.duration"),
        level: "beginner",
        format: "offline",
        icon: "Puzzle",
        theme: "orange",
        href: `${siteConfig.routes.courses}/${COURSE_DATA.scratch.key}`,
      },
      {
        id: COURSE_DATA.smm.key,
        title: t("courses.general.coursesSection.list.3.title"),
        description: t("courses.general.coursesSection.list.3.description"),
        duration: t("courses.general.coursesSection.list.3.duration"),
        level: "beginner",
        format: "offline",
        icon: "Megaphone",
        theme: "cyan",
        href: `${siteConfig.routes.courses}/${COURSE_DATA.smm.key}`,
      },
      {
        id: COURSE_DATA.python.key,
        title: t("courses.general.coursesSection.list.4.title"),
        description: t("courses.general.coursesSection.list.4.description"),
        duration: t("courses.general.coursesSection.list.4.duration"),
        level: "beginner",
        format: "offline",
        icon: "Workflow",
        theme: "lime",
        href: `${siteConfig.routes.courses}/${COURSE_DATA.python.key}`,
      },
      {
        id: COURSE_DATA.android.key,
        title: t("courses.general.coursesSection.list.5.title"),
        description: t("courses.general.coursesSection.list.5.description"),
        duration: t("courses.general.coursesSection.list.5.duration"),
        level: "beginner",
        format: "offline",
        icon: "Smartphone",
        theme: "emerald",
        href: `${siteConfig.routes.courses}/${COURSE_DATA.android.key}`,
      },
      {
        id: COURSE_DATA.ui_ux.key,
        title: t("courses.general.coursesSection.list.6.title"),
        description: t("courses.general.coursesSection.list.6.description"),
        duration: t("courses.general.coursesSection.list.6.duration"),
        level: "beginner",
        format: "offline",
        icon: "LayoutDashboard",
        theme: "fuchsia",
        href: `${siteConfig.routes.courses}/${COURSE_DATA.ui_ux.key}`,
      },
      {
        id: COURSE_DATA.hr.key,
        title: t("courses.general.coursesSection.list.7.title"),
        description: t("courses.general.coursesSection.list.7.description"),
        duration: t("courses.general.coursesSection.list.7.duration"),
        level: "beginner",
        format: "offline",
        icon: "UsersRound",
        theme: "amber",
        href: `${siteConfig.routes.courses}/${COURSE_DATA.hr.key}`,
      },
      {
        id: COURSE_DATA.soft_skills.key,
        title: t("courses.general.coursesSection.list.8.title"),
        description: t("courses.general.coursesSection.list.8.description"),
        duration: t("courses.general.coursesSection.list.8.duration"),
        level: "beginner",
        format: "offline",
        icon: "MessageSquareText",
        theme: "pink",
        href: `${siteConfig.routes.courses}/${COURSE_DATA.soft_skills.key}`,
      },
    ] as const satisfies readonly Course[],
    levels: {
      beginner: t("courses.general.coursesSection.levels.beginner"),
      intermediate: t("courses.general.coursesSection.levels.intermediate"),
      advanced: t("courses.general.coursesSection.levels.advanced"),
    },
    formats: {
      online: t("courses.general.coursesSection.formats.online"),
      offline: t("courses.general.coursesSection.formats.offline"),
      hybrid: t("courses.general.coursesSection.formats.hybrid"),
    },
  } as const;
}
