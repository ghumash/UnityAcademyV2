import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import {
  Target,
  Eye,
  HeartHandshake,
  GraduationCap,
  LifeBuoy,
  Users,
  Search,
  Sparkles,
  Wrench,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export type ContentItem = {
  icon?: React.ReactNode;
  title?: string;
  description: string | React.ReactNode;
};

export type ContentBlock = {
  title: string;
  headerIcon: React.ReactNode;
  items: ContentItem[];
};

export async function getContentSectionConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    blocks: [
      {
        title: t("about.contentSection.blocks.0.title"),
        headerIcon: <Target className="size-4" />,
        items: [
          {
            description: t("about.contentSection.blocks.0.items.0.description"),
          },
          {
            description: t("about.contentSection.blocks.0.items.1.description"),
          },
          {
            description: t("about.contentSection.blocks.0.items.2.description"),
          },
        ],
      },
      {
        title: t("about.contentSection.blocks.1.title"),
        headerIcon: <Eye className="size-4" />,
        items: [
          {
            description: t("about.contentSection.blocks.1.items.0.description"),
          },
          {
            icon: <GraduationCap className="size-5" />,
            title: t("about.contentSection.blocks.1.items.1.title"),
            description: t("about.contentSection.blocks.1.items.1.description"),
          },
          {
            icon: <LifeBuoy className="size-5" />,
            title: t("about.contentSection.blocks.1.items.2.title"),
            description: t("about.contentSection.blocks.1.items.2.description"),
          },
          {
            icon: <Users className="size-5" />,
            title: t("about.contentSection.blocks.1.items.3.title"),
            description: t("about.contentSection.blocks.1.items.3.description"),
          },
          {
            icon: <Search className="size-5" />,
            title: t("about.contentSection.blocks.1.items.4.title"),
            description: t("about.contentSection.blocks.1.items.4.description"),
          },
          {
            icon: <Sparkles className="size-5" />,
            title: t("about.contentSection.blocks.1.items.5.title"),
            description: t("about.contentSection.blocks.1.items.5.description"),
          },
          {
            description: t("about.contentSection.blocks.1.items.6.description"),
          },
        ],
      },
      {
        title: t("about.contentSection.blocks.2.title"),
        headerIcon: <HeartHandshake className="size-4" />,
        items: [
          {
            icon: <HeartHandshake className="size-5" />,
            title: t("about.contentSection.blocks.2.items.0.title"),
            description: t("about.contentSection.blocks.2.items.0.description"),
          },
          {
            icon: <Wrench className="size-5" />,
            title: t("about.contentSection.blocks.2.items.1.title"),
            description: t("about.contentSection.blocks.2.items.1.description"),
          },
          {
            icon: <TrendingUp className="size-5" />,
            title: t("about.contentSection.blocks.2.items.2.title"),
            description: t("about.contentSection.blocks.2.items.2.description"),
          },
          {
            icon: <Users className="size-5" />,
            title: t("about.contentSection.blocks.2.items.3.title"),
            description: t("about.contentSection.blocks.2.items.3.description"),
          },
          {
            icon: <ShieldCheck className="size-5" />,
            title: t("about.contentSection.blocks.2.items.4.title"),
            description: t("about.contentSection.blocks.2.items.4.description"),
          },
        ],
      },
    ] as const satisfies readonly ContentBlock[],
    badge: {
      icon: <Sparkles className="size-3" />,
      text: t("about.contentSection.badge.text"),
    },
  } as const;
}
