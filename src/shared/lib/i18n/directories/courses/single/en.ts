import { siteConfig } from "@/shared/config/common";
import type { SingleDict } from "../types";

export const single: SingleDict = {
  faq_banner: {
    heading: "Answers to your troubling questions",
    button_text: "Follow the link",
  },
  benefits: {
    title_part1: `Learning at ${siteConfig.name}`,
    title_part2: "you will get the following benefits",
    items: [
      {
        title: "Career",
        description:
          "The best students will remain in our database of top students and will later receive job offers from us or our partners.",
      },
      {
        title: "Free HR Training",
        description:
          "The training will give graduates the opportunity to learn the important rules of creating a competent CV and LinkedIn platform, understand how to properly prepare and present themselves for interviews, and learn the answers to all their pressing questions.",
      },
      {
        title: "Certification and digital verification",
        description: `After successfully completing the course, you receive a ${siteConfig.name} personalized certificate with digital verification (QR/link). You can add it to LinkedIn and attach it to your CV. The assessment is based on attendance, homework, and the final project.`,
      },
      {
        title: "Portfolio",
        description:
          "At the end of the course, you will have professional work that you will include in your portfolio.",
      },
    ],
  },
};
