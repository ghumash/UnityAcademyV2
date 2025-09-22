import type { TeamSectionDict } from "../types";

export const teamSection: TeamSectionDict = {
  title: "Our Team",
  emptyState:
    "We are preparing profiles of our team members. Soon you will be able to meet our experienced instructors, mentors, and specialists who will help you achieve your goals.",
  members: [
    {
      name: "Tigran Ghumashyan",
      role: "Founder & CEO",
      avatarUrl: "/images/users/tigran.png",
    },
    {
      name: "Siranush Hakobyan",
      role: "Content Manager",
      avatarUrl: "/images/users/siranush.png",
    },
    {
      name: "Mane Hovsepyan",
      role: "Graphic Design Instructor",
      avatarUrl: "/images/users/mane.png",
    },
    {
      name: "Ani Tamaryan",
      role: "Kids Coding Instructor",
      avatarUrl: "/images/users/ani.png",
    },
    {
      name: "Vagharshak Gasparyan",
      role: "Javascript Instructor",
      avatarUrl: "/images/users/vagharshak.png",
    },
  ],
} as const;
