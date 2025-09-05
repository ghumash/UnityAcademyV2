import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import { ComponentType, SVGProps } from "react";

export type LogoItem = { 
  id: number; 
  name: string; 
  img: ComponentType<SVGProps<SVGSVGElement>>; 
};

export async function getLogoCarouselSectionConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    title: t("home.logoCarouselSection.title"),
    subtitle: t("home.logoCarouselSection.subtitle"),
  } as const;
}
