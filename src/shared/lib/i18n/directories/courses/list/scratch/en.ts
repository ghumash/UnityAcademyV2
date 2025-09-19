import type { CourseDict } from "../../types";

export const scratch: CourseDict = {
  courseHeroSection: {
    title: "Scratch: Programming Basics for Kids",
    description:
      "Learn programming fundamentals through Scratch. Create your own games, animations, and interactive stories. Perfect for beginners and children.",
    level: "Beginner",
    format: "Offline",
    duration: "2 Months",
    lessonsCount: "16 Lessons",
    weeklyLessonCount: "2 Lessons per Week",
    projectsCount: "6 Projects",
    certificateIncluded: true,
    price: "20 000 ֏",
    originalPrice: "50 000 ֏",
    sale: "60% OFF",
    registerCourseButtonText: "Register for Course",
    registerFreeLessonButtonText: "Register for Free Lesson",
    certificate: "Certificate",
    theme: "orange",
    formatLabel: "Format",
  },
    projects: {
    display: false,
    subtitle: "CREATE YOUR UNIQUE STYLE",
    titlePart1: "Instructor's",
    titlePart2: "Works",    list: [
      {
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project1"
      },
      {
        img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project2"
      },
      {
        img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project3"
      },
      {
        img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project4"
      },
    ],
  },
  instructor: {
    name: "Ani Tamaryan",
    role: "Scratch Instructor & Game Developer",
    bio: "I am a programming instructor with experience in teaching over 100+ children. I specialize in Scratch programming, algorithms, and digital skills education, as well as developing educational programs. My goal is to make technology accessible, interesting, and motivating, contributing to the development of children's logical thinking and creativity.",
    avatarUrl: "/images/users/ani.png",
    socials: {
      // instagram: "https://instagram.com/mariam_scratch_teacher",
      // linkedin: "https://linkedin.com/in/mariam-avagyan",
    },
    experience: {
      senior: {
        title: "Coding Instructor",
        company: "Armath Engineering Laboratories",
        period: "2024 - Present",
        summary:
          "I teach children Scratch programming, algorithm fundamentals, and digital skills. I have taught over 200+ children, developed educational programs, and organized effective communication with both children and parents.",
      },
    },
    experienceLabel: "Work Experience",
    socialNetworksLabel: "Social Networks",
    showDetails: "Show Details",
    hideDetails: "Hide Details",
  },
  topics: {
    title: "Course Topics",
    list: [
      "Topic 1: Introduction to Scratch, interface",
      "Topic 2: Sprites and stage, basic tools",
      "Topic 3: Movement and coordinates",
      "Topic 4: Looks and sound, costumes",
      "Topic 5: Events and control",
      "Topic 6: Conditions and branching",
      "Topic 7: Loops and repetition",
      "Topic 8: Variables and lists",
      "Topic 9: Functions and blocks",
      "Topic 10: Game creation - first project",
      "Topic 11: Animation and stories",
      "Topic 12: Interactive projects",
      "Topic 13: Algorithmic thinking",
      "Topic 14: Creating complex projects",
      "Topic 15: Project presentation and sharing",
      "Topic 16: Summary and next steps",
    ],
  },
  conditions: {
    title: "Course Special Advantages",
    list: [
      {
        title: "Creative Approach",
        description: "Children create their own animations, games, and interactive stories.",
      },
      {
        title: "Logical Thinking",
        description: "Learn algorithmic thinking, sequencing, and problem-solving skills.",
      },
      {
        title: "Friendly Atmosphere",
        description: "Work in a friendly environment and learn to collaborate on projects.",
      },
    ],
  },
  cta: {
    title: "Scratch: Registration Application",
    subtitle: "Start your programming adventure",
  },
};
