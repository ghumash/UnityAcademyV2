export type NavItem = { label: string; href: string };

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

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
