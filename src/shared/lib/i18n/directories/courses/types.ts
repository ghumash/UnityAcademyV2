export type CoursesDict = {
  general: {
    coursesSection: CoursesSectionDict;
  };
  list: {
    graphic_design: CourseDict;
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
