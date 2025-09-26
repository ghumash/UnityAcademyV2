import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import type { ComponentType, SVGProps } from "react";

export type LogoItem = {
  name: string;
  img: ComponentType<SVGProps<SVGSVGElement>> | string;
  href: string;
};

export async function getLogoCarouselSectionConfig(locale: Locale) {
  const t = await getT(locale);

  const logos: LogoItem[] = [
    {
      name: "ARDA",
      img: "/images/logos/arda.jpg",
      href: "https://www.ardaglobal.org/",
    },
  ];

  return {
    title: t("home.logoCarouselSection.title"),
    subtitle: t("home.logoCarouselSection.subtitle"),
    logos,
  } as const;
}
