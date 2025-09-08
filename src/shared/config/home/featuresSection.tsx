import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  Users,
  Building2,
  CalendarClock,
  Video,
  UserCheck,
  TrendingUp,
  FileText,
  BadgeCheck,
  Briefcase,
  CalendarDays,
  Globe2,
} from "lucide-react";

export type FeatureItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const ICONS = [
  Award, // 0 — Փորձառու մասնագետներ
  Users, // 1 — Փոքր խմբեր, անհատական մոտեցում
  Building2, // 2 — Հարմարավետ կահավորված լսարաններ
  CalendarClock, // 3 — 3 փորձնական դաս
  Video, // 4 — Դասերի տեսագրություն
  UserCheck, // 5 — Մենթորական մոտեցում
  TrendingUp, // 6 — Կարիերային աճ
  FileText, // 7 — Պորտֆոլիո և ինքնակենսագրական անվճար
  BadgeCheck, // 8 — Սերտիֆիկացում և թվային վավերացում
  Briefcase, // 9 — Աշխատանքի առաջարկ
  CalendarDays, // 10 — «Dayoff» հանդիպումներ
  Globe2, // 11 — Համայնք
] as const;

export async function getFeaturesSectionConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    features: [
      {
        title: t("home.featuresSection.features.0.title"),
        description: t("home.featuresSection.features.0.description"),
        Icon: ICONS[0],
      },
      {
        title: t("home.featuresSection.features.1.title"),
        description: t("home.featuresSection.features.1.description"),
        Icon: ICONS[1],
      },
      {
        title: t("home.featuresSection.features.2.title"),
        description: t("home.featuresSection.features.2.description"),
        Icon: ICONS[2],
      },
      {
        title: t("home.featuresSection.features.3.title"),
        description: t("home.featuresSection.features.3.description"),
        Icon: ICONS[3],
      },
      {
        title: t("home.featuresSection.features.4.title"),
        description: t("home.featuresSection.features.4.description"),
        Icon: ICONS[4],
      },
      {
        title: t("home.featuresSection.features.5.title"),
        description: t("home.featuresSection.features.5.description"),
        Icon: ICONS[5],
      },
      {
        title: t("home.featuresSection.features.6.title"),
        description: t("home.featuresSection.features.6.description"),
        Icon: ICONS[6],
      },
      {
        title: t("home.featuresSection.features.7.title"),
        description: t("home.featuresSection.features.7.description"),
        Icon: ICONS[7],
      },
      {
        title: t("home.featuresSection.features.8.title"),
        description: t("home.featuresSection.features.8.description"),
        Icon: ICONS[8],
      },
      {
        title: t("home.featuresSection.features.9.title"),
        description: t("home.featuresSection.features.9.description"),
        Icon: ICONS[9],
      },
      {
        title: t("home.featuresSection.features.10.title"),
        description: t("home.featuresSection.features.10.description"),
        Icon: ICONS[10],
      },
      {
        title: t("home.featuresSection.features.11.title"),
        description: t("home.featuresSection.features.11.description"),
        Icon: ICONS[11],
      },
    ] as const satisfies readonly FeatureItem[],
  } as const;
}
