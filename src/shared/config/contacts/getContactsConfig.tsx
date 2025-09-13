import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import {
  Send,
  Mail,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";

export type ContactTileConfig = {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: {
    label: string;
    href: string;
    external?: boolean;
  } | null;
  variant?: "social" | "info";
};

export type LongInfoItemConfig = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export async function getContactsConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    pageTitle: t("contacts.pageTitle"),
    tiles: [
      {
        icon: (
          <Send
            className="h-5 w-5 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        title: t("contacts.tiles.0.title"),
        description: t("contacts.tiles.0.description"),
        action: {
          label: t("contacts.tiles.0.action.label"),
          href: "https://t.me/unity_academy",
          external: true,
        },
        variant: "social" as const,
      },
      {
        icon: (
          <Mail
            className="h-5 w-5 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        title: t("contacts.tiles.1.title"),
        description: t("contacts.tiles.1.description"),
        action: {
          label: t("contacts.tiles.1.action.label"),
          href: "mailto:unityacademyarmenia@gmail.com",
          external: true,
        },
        variant: "social" as const,
      },
      {
        icon: (
          <Instagram
            className="h-5 w-5 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        title: t("contacts.tiles.2.title"),
        description: t("contacts.tiles.2.description"),
        action: {
          label: t("contacts.tiles.2.action.label"),
          href: "https://www.instagram.com/unity_academy",
          external: true,
        },
        variant: "social" as const,
      },
      {
        icon: (
          <Facebook
            className="h-5 w-5 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        title: t("contacts.tiles.3.title"),
        description: t("contacts.tiles.3.description"),
        action: {
          label: t("contacts.tiles.3.action.label"),
          href: "https://www.facebook.com/UnityAcademyArmenia",
          external: true,
        },
        variant: "social" as const,
      },
    ] as const satisfies readonly ContactTileConfig[],
    longItems: [
      {
        icon: (
          <MapPin
            className="h-5 w-5 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        label: t("contacts.longItems.0.label"),
        value: t("contacts.longItems.0.value"),
        href: "https://maps.app.goo.gl/saMHAc8tjFqtZo3H9",
        external: true,
      },
      {
        icon: (
          <Phone
            className="h-5 w-5 text-black dark:text-neutral-400"
            aria-hidden="true"
          />
        ),
        label: t("contacts.longItems.1.label"),
        value: t("contacts.longItems.1.value"),
        href: "tel:+37499951915",
        external: true,
      },
    ] as const satisfies readonly LongInfoItemConfig[],
  } as const;
}
