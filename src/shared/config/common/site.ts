export type NavItem = { label: string; href: string };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteConfig = {
  name: "Unity Academy",
  shortName: "Unity",
  description:
    "Unity Academy-ն Վանաձորում գործող ժամանակակից կենտրոն է, որտեղ կարող ես սովորել պահանջված մասնագիտություններ նոր մեթոդներով և հնարավորություններով։",
  url: SITE_URL,
  locale: "hy-HY",
  defaultLanguage: "hy",
  defaultTheme: "dark",
  contacts: {
    email: "unityacademyarmenia@gmail.com",
    phone: "+374 99 951 915",
    emailHref: "mailto:unityacademyarmenia@gmail.com",
    phoneHref: "tel:+37499951915",
  },
  socials: {
    instagram: "https://www.instagram.com/unity_academy",
    facebook: "https://www.facebook.com/UnityAcademyArmenia",
    linkedin: "https://www.linkedin.com/company/unity-academy-armenia",
    telegram: "https://www.telegram.com/UnityAcademyArmenia",
  },
  routes: {
    home: "/",
    about: "/about",
    courses: "/courses",
    events: "/events",
    contacts: "/contacts",
    apply: "/apply",
    faq: "/faq",
  },
  assets: {
    logo: "/images/logos/logo.svg",
  },
} as const;

export function absoluteUrl(path = "/") {
  const base = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
