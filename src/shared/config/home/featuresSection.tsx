import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
import type { ElementType } from "react";

export type FeatureItem = {
  title: string;
  description: string;
  Icon: ElementType;
};

const ICONS = [
  IconTerminal2,
  IconEaseInOut,
  IconCurrencyDollar,
  IconCloud,
  IconRouteAltLeft,
  IconHelp,
  IconAdjustmentsBolt,
  IconHeart,
] as const;

export async function getFeaturesSectionConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    features: [
      {
        title: t("home.featuresSection.features.0.title"),
        description: t("home.featuresSection.features.0.description"),
        Icon: ICONS[0],
      },
      {
        title: t("home.featuresSection.features.1.title"),
        description: t("home.featuresSection.features.1.description"),
        Icon: ICONS[1],
      },
      {
        title: t("home.featuresSection.features.2.title"),
        description: t("home.featuresSection.features.2.description"),
        Icon: ICONS[2],
      },
      {
        title: t("home.featuresSection.features.3.title"),
        description: t("home.featuresSection.features.3.description"),
        Icon: ICONS[3],
      },
      {
        title: t("home.featuresSection.features.4.title"),
        description: t("home.featuresSection.features.4.description"),
        Icon: ICONS[4],
      },
      {
        title: t("home.featuresSection.features.5.title"),
        description: t("home.featuresSection.features.5.description"),
        Icon: ICONS[5],
      },
      {
        title: t("home.featuresSection.features.6.title"),
        description: t("home.featuresSection.features.6.description"),
        Icon: ICONS[6],
      },
      {
        title: t("home.featuresSection.features.7.title"),
        description: t("home.featuresSection.features.7.description"),
        Icon: ICONS[7],
      },
    ] as const satisfies readonly FeatureItem[],
  } as const;
}
