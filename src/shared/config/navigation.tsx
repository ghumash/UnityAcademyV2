import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import { Briefcase, Home, User, Phone } from "lucide-react";

export async function getNavigationConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    navItems: [
      { 
        name: t("navigation.home"), 
        url: "/", 
        icon: <Home size={18} strokeWidth={2.5} />,
        ariaLabel: t("navigation.home")
      },
      { 
        name: t("navigation.about"), 
        url: "/about", 
        icon: <User size={18} strokeWidth={2.5} />,
        ariaLabel: t("navigation.about")
      },
      {
        name: t("navigation.courses"),
        url: "/courses",
        icon: <Briefcase size={18} strokeWidth={2.5} />,
        ariaLabel: t("navigation.courses")
      },
      {
        name: t("navigation.contacts"),
        url: "/contacts",
        icon: <Phone size={18} strokeWidth={2.5} />,
        ariaLabel: t("navigation.contacts")
      },
    ],
    applyButton: {
      label: t("navigation.apply"),
      ariaLabel: t("navigation.apply")
    }
  } as const;
}

export async function getFooterConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    sections: {
      company: {
        title: t("footer.company.title"),
        links: [
          { name: t("footer.company.about"), href: "/about" },
          { name: t("footer.company.courses"), href: "/courses" },
          { name: t("footer.company.contacts"), href: "/contacts" },
        ]
      },
      support: {
        title: t("footer.support.title"),
        links: [
          { name: t("footer.support.help"), href: "/help" },
          { name: t("footer.support.faq"), href: "/faq" },
          { name: t("footer.support.privacy"), href: "/privacy" },
          { name: t("footer.support.terms"), href: "/terms" },
        ]
      },
      social: {
        title: t("footer.social.title"),
        links: [
          { name: "Instagram", href: "https://instagram.com/unityacademy" },
          { name: "Facebook", href: "https://facebook.com/unityacademy" },
          { name: "LinkedIn", href: "https://linkedin.com/company/unityacademy" },
          { name: "YouTube", href: "https://youtube.com/@unityacademy" },
        ]
      }
    },
    copyright: t("footer.copyright"),
    description: t("footer.description")
  } as const;
}
