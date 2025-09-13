import type { TeamSectionDict } from "../types";

export const teamSection: TeamSectionDict = {
  title: "Our Team",
  emptyState: "We are preparing profiles of our team members. Soon you will be able to meet our experienced instructors, mentors, and specialists who will help you achieve your goals.",
  members: [
    {
      name: "Tigran Ghumashyan",
      role: "Founder & CEO",
      avatarUrl: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=256&h=256&fit=crop",
      socials: {
        github: "https://github.com/example",
      },
    },
    {
      name: "Siranush Hakobyan",
      role: "Content Manager",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/sir_hakobyan_",
      },
    },
    {
      name: "Mane Hovsepyan",
      role: "Graphic Design Instructor",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Ani Tamaryan",
      role: "Kids Coding Instructor",
      avatarUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Vagharshak Gasparyan",
      role: "Javascript Instructor",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
  ],
} as const;
