import type { SeoDict } from "./types";
import { siteConfig } from "@/shared/config/common";

export const seo: SeoDict = {
  home: {
    title: "IT Education in Vanadzor",
    description: `Learn programming, design and digital marketing at ${siteConfig.name} in Vanadzor: Web development, Python, Android, UI/UX, SMM and other courses.`,
  },
  about: {
    title: "About us",
    description: `${siteConfig.name} is an IT educational center in Vanadzor. We provide quality education in programming, design and digital marketing.`,
  },
  courses: {
    title: "Courses",
    description:
      "Discover our IT courses in Vanadzor: Web development, Python, Android, UI/UX design, SMM, graphic design and soft skills.",
  },
  contacts: {
    title: "Contacts",
    description: `Contact ${siteConfig.name} in Vanadzor: Our address, phone number and social media.`,
  },
  apply: {
    title: "Registration",
    description: `Apply for IT courses at ${siteConfig.name} in Vanadzor: Fill out the application and start your IT career with us.`,
  },
  faq: {
    title: "Frequently Asked Questions",
    description: `Find answers to the most frequently asked questions about ${siteConfig.name}: courses, enrollment, payment and more.`,
  },
  general: {
    description: `${siteConfig.name} is a modern educational center in Vanadzor where you can learn in-demand professions with new methods and opportunities.`,
  },
} as const;
