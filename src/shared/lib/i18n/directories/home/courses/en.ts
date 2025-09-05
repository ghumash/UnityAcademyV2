import type { CoursesDict } from "../types";

export const courses: CoursesDict = {
  title: "Our courses",
  courses: [
    {
      title: "Web development: HTML, CSS, JavaScript, React",
      description: "From scratch to first projects: layout, components, routing, API work and deployment. Practice on real tasks.",
      duration: "3 months",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Artificial Intelligence: fundamentals and practices",
      description: "ML/AI basics, prompt engineering, working with ready-made models and integrations into projects.",
      duration: "2 months",
      level: "intermediate",
      format: "hybrid",
    },
    {
      title: "Graphic Design",
      description: "Composition, typography, color, working in Figma/Photoshop. Creating posters, banners and brand guides.",
      duration: "2 months",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Android development",
      description: "Application architecture, UI/UX for mobile, publishing and support. Practice with real cases.",
      duration: "3 months",
      level: "intermediate",
      format: "online",
    },
    {
      title: "SMM and content creation",
      description: "Strategy, content plan, storytelling, metrics and growth. Practice for Instagram, TikTok and YouTube.",
      duration: "1.5 months",
      level: "beginner",
      format: "hybrid",
    },
    {
      title: "Soft Skills and career",
      description: "Communication, time management, teamwork, interviews and portfolio.",
      duration: "1 month",
      level: "beginner",
      format: "offline",
    },
  ],
  levels: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
  formats: {
    online: "Online",
    offline: "Offline",
    hybrid: "Hybrid",
  },
};
