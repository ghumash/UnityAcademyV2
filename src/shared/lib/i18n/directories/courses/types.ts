import type { Theme } from "@/widgets/Courses";

export type CoursesDict = {
  general: {
    coursesSection: CoursesSectionDict;
  };
  list: {
    graphic_design: CourseDict;
    scratch: CourseDict;
    web_development: CourseDict;
    smm: CourseDict;
    python: CourseDict;
    android: CourseDict;
    ui_ux: CourseDict;
    hr: CourseDict;
    soft_skills: CourseDict;
  };
  single: SingleDict;
};

export type SingleDict = {
  faq_banner: {
    heading: string;
    button_text: string;
  };
  benefits: {
    title_part1: string;
    title_part2: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
};

export type CourseDict = {
  courseHeroSection: {
    title: string;
    description: string;
    level: string;
    format: string;
    duration: string;
    lessonsCount: string;
    projectsCount: string;
    certificateIncluded: boolean;
    price: string;
    originalPrice: string;
    sale: string;
    registerCourseButtonText: string;
    registerFreeLessonButtonText: string;
    certificate: string;
    theme: Theme;
    formatLabel: string;
  };
  instructor: {
    display?: boolean;
    name: string;
    role: string;
    bio: string;
    avatarUrl?: string;
    socials?: {
      instagram?: string;
      facebook?: string;
      linkedin?: string;
      behance?: string;
      github?: string;
      x?: string;
      website?: string;
    };
    experience: {
      senior: {
        title: string;
        company: string;
        period: string;
        summary: string;
      };
      mid?: {
        title: string;
        company: string;
        period: string;
        summary: string;
      };
      junior?: {
        title: string;
        company: string;
        period: string;
        summary: string;
      };
    };
    experienceLabel: string;
    socialNetworksLabel: string;
    showDetails: string;
    hideDetails: string;
  };
  topics: {
    title: string;
    list: string[];
  };
  conditions: {
    title: string;
    list: Array<{ title: string; description: string }>;
  };
  cta: {
    title: string;
    subtitle: string;
  };
};

export type CoursesSectionDict = {
  title: string;
  list: Array<{
    title: string;
    description: string;
    duration: string;
    level: string;
    format: string;
  }>;
  levels: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  formats: {
    online: string;
    offline: string;
    hybrid: string;
  };
};
