import React from "react";
import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
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
  icon: React.ReactNode;
};

const ICONS = [
  <Award key="award" aria-hidden size={28} />, // 0 — Փորձառու մասնագետներ
  <Users key="users" aria-hidden size={28} />, // 1 — Փոքր խմբեր, անհատական մոտեցում
  <Building2 key="building2" aria-hidden size={28} />, // 2 — Հարմարավետ կահավորված լսարաններ
  <CalendarClock key="calendar-clock" aria-hidden size={28} />, // 3 — 3 փորձնական դաս
  <Video key="video" aria-hidden size={28} />, // 4 — Դասերի տեսագրություն
  <UserCheck key="user-check" aria-hidden size={28} />, // 5 — Մենթորական մոտեցում
  <TrendingUp key="trending-up" aria-hidden size={28} />, // 6 — Կարիերային աճ
  <FileText key="file-text" aria-hidden size={28} />, // 7 — Պորտֆոլիո և ինքնակենսագրական անվճար
  <BadgeCheck key="badge-check" aria-hidden size={28} />, // 8 — Սերտիֆիկացում և թվային վավերացում
  <Briefcase key="briefcase" aria-hidden size={28} />, // 9 — Աշխատանքի առաջարկ
  <CalendarDays key="calendar-days" aria-hidden size={28} />, // 10 — «Dayoff» հանդիպումներ
  <Globe2 key="globe2" aria-hidden size={28} />, // 11 — Համայնք
] as const;

export async function getFeaturesSectionConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    features: [
      {
        title: t("home.featuresSection.features.0.title"),
        description: t("home.featuresSection.features.0.description"),
        icon: ICONS[0],
      },
      {
        title: t("home.featuresSection.features.1.title"),
        description: t("home.featuresSection.features.1.description"),
        icon: ICONS[1],
      },
      {
        title: t("home.featuresSection.features.2.title"),
        description: t("home.featuresSection.features.2.description"),
        icon: ICONS[2],
      },
      {
        title: t("home.featuresSection.features.3.title"),
        description: t("home.featuresSection.features.3.description"),
        icon: ICONS[3],
      },
      {
        title: t("home.featuresSection.features.4.title"),
        description: t("home.featuresSection.features.4.description"),
        icon: ICONS[4],
      },
      {
        title: t("home.featuresSection.features.5.title"),
        description: t("home.featuresSection.features.5.description"),
        icon: ICONS[5],
      },
      {
        title: t("home.featuresSection.features.6.title"),
        description: t("home.featuresSection.features.6.description"),
        icon: ICONS[6],
      },
      {
        title: t("home.featuresSection.features.7.title"),
        description: t("home.featuresSection.features.7.description"),
        icon: ICONS[7],
      },
      {
        title: t("home.featuresSection.features.8.title"),
        description: t("home.featuresSection.features.8.description"),
        icon: ICONS[8],
      },
      {
        title: t("home.featuresSection.features.9.title"),
        description: t("home.featuresSection.features.9.description"),
        icon: ICONS[9],
      },
      {
        title: t("home.featuresSection.features.10.title"),
        description: t("home.featuresSection.features.10.description"),
        icon: ICONS[10],
      },
      {
        title: t("home.featuresSection.features.11.title"),
        description: t("home.featuresSection.features.11.description"),
        icon: ICONS[11],
      },
    ] as const satisfies readonly FeatureItem[],
  } as const;
}
