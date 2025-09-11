import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export async function getFooterConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    sections: {
      company: {
        title: t("common.footer.resources.title"),
        links: [
          { name: t("common.footer.resources.home"), href: "/" },
          { name: t("common.footer.resources.about"), href: "/about" },
          { name: t("common.footer.resources.courses"), href: "/courses" },
          { name: t("common.footer.resources.contacts"), href: "/contacts" },
          { name: t("common.footer.resources.faq"), href: "/faq" },
        ],
      },
      social: {
        title: t("common.footer.social.title"),
        links: [
          { name: "Instagram", href: "https://instagram.com/unityacademy" },
          { name: "Facebook", href: "https://facebook.com/unityacademy" },
          {
            name: "LinkedIn",
            href: "https://linkedin.com/company/unityacademy",
          },
          { name: "YouTube", href: "https://youtube.com/@unityacademy" },
        ],
      },
    },
    copyright: t("common.footer.copyright"),
    description: t("common.footer.description"),
  } as const;
}
