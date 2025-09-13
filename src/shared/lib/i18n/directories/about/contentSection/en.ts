import type { ContentSectionDict } from "../types";

export const contentSection: ContentSectionDict = {
  blocks: [
    {
      title: "Our Mission",
      items: [
        {
          description:
            "We create a community where young people learn not only technologies but also how to live with the right values.",
        },
        {
          description:
            "We help teenagers and young people unlock their potential through IT education, practice, and mentoring.",
        },
        {
          description:
            "We guide students to become confident professionals and strong personalities.",
        },
      ],
    },
    {
      title: "Our Vision",
      items: [
        {
          description:
            "We see a future where every young person in Armenia and beyond can:",
        },
        {
          title: "Learn",
          description: "Modern technologies",
        },
        {
          title: "Receive",
          description: "Support on their career path",
        },
        {
          title: "Community",
          description: "We are together, and that is our strength",
        },
        {
          title: "Find",
          description: "Like-minded people and friends",
        },
        {
          title: "Be",
          description: "Part of a strong and inspiring community",
        },
        {
          description:
            "Our goal is to become an IT entry point and personal growth platform that unites knowledge, right values, and practice.",
        },
      ],
    },
    {
      title: "Our Values",
      items: [
        {
          title: "Humanity",
          description:
            "Warmth, respect, and support in every interaction",
        },
        {
          title: "Practice",
          description:
            "We teach what actually works and is in demand today",
        },
        {
          title: "Development",
          description: "Step by step towards professionalism and maturity",
        },
        {
          title: "Community",
          description: "We are together, and that is our strength",
        },
        {
          title: "Right Values",
          description: "Inner guidelines that help us stay whole",
        },
      ],
    },
  ],
  badge: {
    text: "About Us",
  },
} as const;
