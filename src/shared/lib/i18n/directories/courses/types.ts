import type { Theme } from "@/widgets/Courses";

export type CoursesDict = {
  general: {
    coursesSection: CoursesSectionDict;
  };
  list: {
    graphic_design: CourseDict;
  };
  single: {
    benefits: {
      title_part1: string;
      title_part2: string;
      hr_training: {
        title_part1: string;
        title_part2: string;
        description: string;
      };
      english_course: {
        title_part1: string;
        title_part2: string;
        description: string;
      };
      portfolio: {
        title: string;
        description: string;
      };
    };
    conditions: {
      badge: string;
      community: {
        title: string;
        description: string;
      };
    };
    instructor: {
      name: string;
      role: string;
      bio: string;
      experience: {
        senior: {
          title: string;
          company: string;
          period: string;
          summary: string;
        };
        mid: {
          title: string;
          company: string;
          period: string;
          summary: string;
        };
        junior: {
          title: string;
          company: string;
          period: string;
          summary: string;
        };
      };
    };
    topics: {
      title: string;
    };
    faq_banner: {
      heading: string;
      button_text: string;
    };
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
