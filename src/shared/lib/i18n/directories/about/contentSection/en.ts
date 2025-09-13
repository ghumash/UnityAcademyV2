import type { ContentSectionDict } from "../types";

export const contentSection: ContentSectionDict = {
  blocks: [
    {
      title: "Our Mission",
      items: [
        {
          description: "Our goal is to provide high-quality IT education that will help people succeed in the modern technological world.",
        },
        {
          description: "We strive to create an inclusive and supportive environment where every student can realize their potential.",
        },
        {
          description: "Our mission is to connect education with practical application, ensuring that our graduates are ready for real workplace challenges.",
        },
      ],
    },
    {
      title: "Our Vision",
      items: [
        {
          description: "We dream of a future where technological education is accessible to everyone, regardless of their financial or geographical situation.",
        },
        {
          title: "Quality Education",
          description: "We provide high-standard educational programs that meet international standards.",
        },
        {
          title: "Individual Approach",
          description: "We work with each student individually, taking into account their needs and goals.",
        },
        {
          title: "Community Support",
          description: "We have created a strong community where students and graduates can help each other.",
        },
        {
          title: "Career Guidance",
          description: "Our specialists help students find their dream job.",
        },
        {
          title: "Innovative Methods",
          description: "We constantly update our teaching methods, incorporating the latest technologies.",
        },
        {
          description: "Our vision is to become Armenia's and the region's leading IT education center.",
        },
      ],
    },
    {
      title: "Our Values",
      items: [
        {
          title: "Honesty and Transparency",
          description: "We operate with high ethical standards and are always honest with our students.",
        },
        {
          title: "Quality of Knowledge",
          description: "We guarantee that our programs meet the highest quality standards.",
        },
        {
          title: "Continuous Development",
          description: "We constantly improve our programs and methods to match industry changes.",
        },
        {
          title: "Community Care",
          description: "We care about the success of our students and graduates even after program completion.",
        },
        {
          title: "Accessibility and Inclusion",
          description: "We strive to make our programs accessible to representatives of all social groups.",
        },
      ],
    },
  ],
  badge: {
    text: "About Us",
  },
} as const;
