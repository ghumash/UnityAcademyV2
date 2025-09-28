import { siteConfig } from "@/shared/config/common";
import type { FooterDict } from "./types";

export const footer: FooterDict = {
  resources: {
    title: "Resources",
    home: "Home",
    about: "About us",
    courses: "Courses",
    events: "Events",
    contacts: "Contacts",
    faq: "FAQ",
  },
  social: {
    title: "Social Networks",
  },
  copyright: "All rights reserved.",
  description: `${siteConfig.name} is a modern center operating in Vanadzor, where you can learn in-demand professions with new methods and opportunities.`,
};
