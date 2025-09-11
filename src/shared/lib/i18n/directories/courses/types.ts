export type CoursesDict = {
  general: {
    coursesSection: CoursesSectionDict;
  };
  list: {
    graphic_design: CourseDict;
  };
};

export type CourseDict = {
  title: string;
  description: string;
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
