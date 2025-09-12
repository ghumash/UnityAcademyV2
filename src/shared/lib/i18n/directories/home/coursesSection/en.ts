import type { CoursesSectionDict } from "../types";

export const coursesSection: CoursesSectionDict = {
  title: "Our Courses",
  list: [
    {
      title: "Web Programming: HTML, CSS, JavaScript, React",
      description:
        "Learn HTML, CSS, JavaScript and React to create fast, reliable and adaptive websites.",
      duration: "6 months",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Graphic Design: Photoshop, Illustrator, Canva",
      description:
        "Branding, composition, typography, color. Creating posters, banners and brand guides.",
      duration: "3 months",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Kids Programming: Scratch, Python",
      description:
        "Kids programming with Scratch and Python — game projects, animations, creativity.",
      duration: "4 months",
      level: "beginner",
      format: "offline",
    },
    {
      title: "SMM and Digital Marketing",
      description:
        "Strategy, content, targeting and analytics. Build cases and launch campaigns with mentor guidance.",
      duration: "3 months",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Python Programming: AI/ML Fundamentals",
      description:
        "Learn Python, algorithms and basic ML models. Understand data work and create mini projects.",
      duration: "6 months",
      level: "intermediate",
      format: "offline",
    },
    {
      title: "Android Programming: Java, Kotlin",
      description:
        "From zero to Java/Kotlin applications. UI, data, publishing and practical mini projects on Google Play.",
      duration: "6 months",
      level: "intermediate",
      format: "offline",
    },
    {
      title: "UI/UX Design: Figma",
      description:
        "From research to prototypes. UX processes, UI systems, Figma and portfolio with project cases.",
      duration: "3 months",
      level: "intermediate",
      format: "offline",
    },
    {
      title: "HR: Human Resources Management",
      description:
        "Recruiting, interviews, adaptation. Practical templates, cases and HR analytics.",
      duration: "3 months",
      level: "intermediate",
      format: "offline",
    },
    {
      title: "Soft Skills: Teamwork, Communication",
      description:
        "Communication, time management, team and leadership. Practice, feedback, growth, presentations.",
      duration: "2 months",
      level: "intermediate",
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
