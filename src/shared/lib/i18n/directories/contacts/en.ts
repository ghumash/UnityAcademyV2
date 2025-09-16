import type { ContactDict } from "./types";

export const contacts: ContactDict = {
  pageTitle: "Contact",
  tiles: [
    {
      title: "Join our community",
      description: "Join the Telegram channel where you'll find job announcements, interesting events and information about other programs",
      action: {
        label: "Go",
      },
    },
    {
      title: "Email",
      description: "We respond during business hours.",
      action: {
        label: "Go",
      },
    },
    {
      title: "Instagram",
      description: "Stories, reels, course launches and updates.",
      action: {
        label: "Go",
      },
    },
    {
      title: "Facebook",
      description: "Stories, shorts, course launches and updates.",
      action: {
        label: "Go",
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
