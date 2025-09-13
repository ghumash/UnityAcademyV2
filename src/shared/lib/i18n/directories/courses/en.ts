import { coursesSection } from "./general/coursesSection/en";
import { graphic_design } from "./list/graphic_design/en";
import type { CoursesDict } from "./types";

export const courses: CoursesDict = {
  general: {
    coursesSection,
  },
  list: {
    graphic_design,
  },
  benefits: {
    title_part1: "Learning at Unity Academy",
    title_part2: "you will get the following benefits",
    hr_training: {
      title_part1: "Free",
      title_part2: "HR training",
      description: "The training will give graduates the opportunity to learn the important rules of CV creation, understand how to properly prepare and present themselves in an interview and know the answers to all exciting questions.",
    },
    english_course: {
      title_part1: "English course",
      title_part2: "with special conditions",
      description: "The best students will receive job offers from us and/or our partners",
    },
    portfolio: {
      title: "Portfolio and resume",
      description: "At the end of the course, you will have professional work and we will help you create a competent resume (CV) for quick entry into the job market",
    },
  },
  conditions: {
    badge: "Course conditions",
    community: {
      title: "Being",
      description: "Part of a strong and inspiring community",
    },
  },
  instructor: {
    name: "Anna Petrova",
    role: "Senior Frontend Developer",
    bio: "Experienced frontend developer with 5+ years of experience in creating modern web applications. I specialize in React, TypeScript and performance optimization.",
    experience: {
      senior: {
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        period: "2022 - present",
        summary: "Leading a team of 4 developers, architecture and development of large-scale React applications, implementation of best practices and code review.",
      },
      mid: {
        title: "Frontend Developer",
        company: "StartupXYZ",
        period: "2020 - 2022",
        summary: "Development of user interfaces for SaaS platform, performance optimization, integration with REST API and GraphQL.",
      },
      junior: {
        title: "Junior Frontend Developer",
        company: "WebStudio",
        period: "2019 - 2020",
        summary: "Creating responsive websites, learning modern frameworks, participating in team development and code review processes.",
      },
    },
  },
  topics: {
    title: "Course topics",
  },
  faq_banner: {
    heading: "Answers to your troubling questions",
    button_text: "Follow the link",
  },
};
