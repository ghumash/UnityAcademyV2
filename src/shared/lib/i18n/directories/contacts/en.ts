import type { ContactDict } from "./types";

export const en = {
  pageTitle: "Contacts",
  tiles: [
    {
      title: "Join our community",
      description: "Join our Telegram channel where you'll find job announcements, interesting events and information about other programs",
      action: {
        label: "Go to",
      },
    },
    {
      title: "Email address",
      description: "We respond during business hours.",
      action: {
        label: "Go to",
      },
    },
    {
      title: "Instagram",
      description: "Stories, reels, course launches and updates.",
      action: {
        label: "Go to",
      },
    },
    {
      title: "Facebook",
      description: "Stories, shorts, course launches and updates.",
      action: {
        label: "Go to",
      },
    },
  ],
  longItems: [
    {
      label: "Address",
      value: "Vanadzor, Vardanants Street, 116A",
    },
    {
      label: "Phone",
      value: "+374 99 951 915",
    },
  ],
} as const;
