import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import { siteConfig } from "./site";

export async function getFooterConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    sections: {
      company: {
        title: t("common.footer.resources.title"),
        links: [
          { name: t("common.footer.resources.home"), href: siteConfig.routes.home },
          { name: t("common.footer.resources.about"), href: siteConfig.routes.about },
          { name: t("common.footer.resources.courses"), href: siteConfig.routes.courses },
          { name: t("common.footer.resources.events"), href: siteConfig.routes.events },
          { name: t("common.footer.resources.contacts"), href: siteConfig.routes.contacts },
          { name: t("common.footer.resources.faq"), href: siteConfig.routes.faq },
        ],
      },
      social: {
        title: t("common.footer.social.title"),
        links: [
          { name: "Instagram", href: siteConfig.socials.instagram },
          { name: "Facebook", href: siteConfig.socials.facebook },
          { name: "LinkedIn", href: siteConfig.socials.linkedin },
          { name: "Telegram", href: siteConfig.socials.telegram },
        ],
      },
    },
    copyright: t("common.footer.copyright"),
    description: t("common.footer.description"),
  } as const;
}
