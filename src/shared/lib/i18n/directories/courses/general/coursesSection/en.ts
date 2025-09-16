import type { CoursesSectionDict } from "../../types";

export const coursesSection: CoursesSectionDict = {
  title: "Our courses",
  list: [
    {
      title: "Web Programming: HTML, CSS, JavaScript, React",
      description: "Learn HTML, CSS, JavaScript and React to create fast, reliable and adaptive websites.",
      duration: "6 months",
      level: "Beginner",
      format: "Offline",
    },
    {
      title: "Graphic Design: Photoshop, Illustrator, Canva",
      description: "Branding, composition, typography, color. Creating posters, banners and brand guides.",
      duration: "3 months",
      level: "Beginner",
      format: "Offline",
    },
    {
      title: "Kids Programming: Scratch, Python",
      description: "Kids programming with Scratch and Python - game projects, animations, creativity.",
      duration: "4 months",
      level: "Beginner",
      format: "Offline",
    },
    {
      title: "SMM and Digital Marketing",
      description: "Strategy, content, targeting and analytics. Collect cases and launch campaigns with mentor guidance.",
      duration: "3 months",
      level: "Beginner",
      format: "Offline",
    },
    {
      title: "Python Programming: AI/ML Fundamentals",
      description: "Learn Python, algorithms and basic ML models. You'll understand data work and create mini projects.",
      duration: "6 months",
      level: "Intermediate",
      format: "Offline",
    },
    {
      title: "Android Programming: Java, Kotlin",
      description: "From scratch to Java/Kotlin applications. UI, data, publishing and practical mini projects on Google Play.",
      duration: "6 months",
      level: "Intermediate",
      format: "Offline",
    },
    {
      title: "UI/UX Design: Figma",
      description: "From research to prototypes. UX processes, UI systems, Figma and portfolio with project cases.",
      duration: "3 months",
      level: "Intermediate",
      format: "Offline",
    },
    {
      title: "HR: Human Resources Management",
      description: "Recruiting, interviews, adaptation. Practical templates, cases and HR analytics.",
      duration: "3 months",
      level: "Intermediate",
      format: "Offline",
    },
    {
      title: "Soft Skills: Teamwork, Communication",
      description: "Communication, time management, team and leadership. Practice, feedback, growth, presentations.",
      duration: "2 months",
      level: "Intermediate",
      format: "Offline",
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
