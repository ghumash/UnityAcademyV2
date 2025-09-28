import { siteConfig } from "@/shared/config/common";
import type { EventPageDict } from "../../types";

export const graphic_design_open_class: EventPageDict = {
  eventHeroSection: {
    title: "Graphic Design: Open Class",
    description:
      "Free open class in graphic design field. Get acquainted with graphic design and have the opportunity to get answers to interesting questions",
    duration: "1.5 hours",
    type: "Open Class",
    formatLabel: "Vanadzor, Vardanants Street, 116A",
    requiresRegistration: true,
    registerButtonText: "Free Registration",
    maxParticipants: "30",
    currentParticipants: "12",
    price: "Free",
    originalPrice: "3000 dram",
    sale: "100%",
  },
  agenda: {
    display: true,
    title: "Open Class Program",
    items: [
      {
        time: "16:00",
        title: "Start",
        description: "Participant entry, seating arrangement.",
      },
      {
        time: "16:15",
        title: "Graphic Design Presentation",
        description:
          "Introduction to the graphic design field, career opportunities, required skills, and its role in business.",
        speaker: "Mane Hovsepyan",
      },
      {
        time: "16:35",
        title: "Adobe Tools Demonstration",
        description:
          "Demonstration of basic functionalities of Photoshop and Illustrator programs. Short creative experience for participants.",
        speaker: "Mane Hovsepyan",
      },
      {
        time: "17:00",
        title: "Q&A Session",
        description:
          "Open discussion, questions about the profession, courses, and career prospects. Individual consultation.",
        speaker: "Mane Hovsepyan",
      },
      {
        time: "17:20",
        title: "Networking and Refreshments",
        description:
          "Free communication with participants and instructor. Coffee, tea, sweet treats, and more detailed discussions.",
      },
    ],
  },
  speakers: {
    display: true,
    title: "Speakers",
    list: [
      {
        name: "Mane Hovsepyan",
        role: "Senior Graphic Designer",
        bio: "Over 8 years of experience in graphic design field. Works at Digitain company as Graphic Designer. Specializes in branding, advertising materials creation, and digital design. At Unity Academy, she is responsible for graphic design courses.",
        avatarUrl: "/images/users/mane.png",
      },
    ],
  },
  benefits: {
    title: "What You'll Get from the Open Class",
    list: [
      {
        title: "Field Introduction",
        description:
          "Opportunity to understand if graphic design is your calling",
      },
      {
        title: "Tools Demonstration",
        description:
          "Introduction to basic functionalities of Adobe Photoshop and Illustrator programs",
      },
      {
        title: "Professional Advice",
        description:
          "Individual consultation and guidance from an industry expert",
      },
      {
        title: "Networking Opportunity",
        description: "Meet people with similar interests",
      },
      {
        title: "Pleasant Atmosphere",
        description: "Free tea, coffee, sweet treats, and pleasant environment",
      },
      {
        title: "Course Introduction",
        description: `Detailed information about ${siteConfig.name}'s graphic design programs`,
      },
    ],
  },
  cta: {
    title: "Ready to Discover Your Creative Potential?",
    subtitle:
      "Join us and find out if graphic design is your future profession or not. Limited seats available!",
    buttonText: "Register",
  },
};
