import type { TeamSectionDict } from "../types";

export const teamSection: TeamSectionDict = {
  title: "Our Team",
  emptyState: "We are preparing profiles of our team members. Soon you will be able to meet our experienced instructors, mentors, and specialists who will help you achieve your goals.",
  members: [
    {
      name: "Tigran Ghumashyan",
      role: "Founder & CEO",
      avatarUrl: "/images/users/tigran.png",
      socials: {
        github: "https://github.com/example",
      },
    },
    {
      name: "Siranush Hakobyan",
      role: "Content Manager",
      avatarUrl: "/images/users/siranush.png",
      socials: {
        instagram: "https://instagram.com/sir_hakobyan_",
      },
    },
    {
      name: "Mane Hovsepyan",
      role: "Graphic Design Instructor",
      avatarUrl: "/images/users/mane.png",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Ani Tamaryan",
      role: "Kids Coding Instructor",
      avatarUrl: "/images/users/ani.png",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Vagharshak Gasparyan",
      role: "Javascript Instructor",
      avatarUrl: "/images/users/vagharshak.png",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
  ],
} as const;
