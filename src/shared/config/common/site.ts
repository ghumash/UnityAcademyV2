export type NavItem = { label: string; href: string };

import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export async function getSiteConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    name: t("common.site.name"),
    shortName: t("common.site.shortName"),
    description: t("common.site.description"),
    locale: t("common.site.locale"),

    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    contacts: {
      email: "unityacademyarmenia@gmail.com",
      phone: "+374 99 951 915",
      location: "Vanadzor, Armenia",
    },
    socials: {
      instagram: "https://www.instagram.com/unity_academy",
      facebook: "https://www.facebook.com/UnityAcademyArmenia",
      linkedin: "https://www.linkedin.com/company/unity-academy-armenia",
    },
    assets: {
      logo: "/logo.svg",
      ogImage: "/og.png",
    },
  } as const;
}

export const siteConfig = {
  name: "Unity Academy",
  shortName: "Unity",
  description:
    "Современная IT-академия в Ванадзоре: веб, AI, контент, Android, SMM, soft skills.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "ru-RU",
  contacts: {
    email: "unityacademyarmenia@gmail.com",
    phone: "+374 99 951 915",
    location: "Vanadzor, Armenia",
  },
  socials: {
    instagram: "https://www.instagram.com/unity_academy",
    facebook: "https://www.facebook.com/UnityAcademyArmenia",
    linkedin: "https://www.linkedin.com/company/unity-academy-armenia",
  },
  navMain: [
    { label: "Курсы", href: "/courses" },
    { label: "О нас", href: "/about" },
    { label: "Контакты", href: "/contacts" },
  ] as NavItem[],
  cta: { label: "Подать заявку", href: "/apply" },
  assets: {
    logo: "/logo.svg",
    ogImage: "/og.png",
  },
} as const;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function absoluteUrl(path = "/") {
  const base = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
