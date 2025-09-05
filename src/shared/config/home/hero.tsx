import { HeroAction } from "@/widgets";
import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export async function getHeroConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    title: t("home.hero.title"),
    subtitle: t("home.hero.subtitle"),
    actions: [
      {
        label: t("home.hero.actions.mission"),
        href: "/about",
        variant: "outline" as const,
      },
      {
        label: t("home.hero.actions.courses"),
        href: "/courses",
        variant: "default" as const,
      },
    ] as HeroAction[],
  } as const;
}
