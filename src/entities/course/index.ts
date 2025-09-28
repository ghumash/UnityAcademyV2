// UI Components
export { Courses } from "./ui/Courses";
export { CourseCard } from "./ui/CourseCard";
export { IntroHero } from "./ui/IntroHero";
export { CourseTopics } from "./ui/CourseTopics";
export { InstructorCard } from "./ui/InstructorCard";
export { SocialLinks } from "./ui/SocialLinks";
export { ExperienceTimeline } from "./ui/ExperienceTimeline";

// Types
export type { 
  Course, 
  Level, 
  Format, 
  Theme, 
  CoursesProps, 
  CourseCardProps,
  CourseTopicsProps,
  CourseTopicsConfig,
  InstructorData,
  InstructorLabels,
  InstructorCardProps,
  ExperienceItem,
  SocialLinks as SocialLinksType
} from "./model/types";

// Utils
export { 
  formatIconByMode, 
  levelLabel, 
  formatLabel,
  getTopicsDisplayConfig,
  getTopicAriaLabel,
  getInitials,
  getPlatformName
} from "./lib/utils";

// Theme configurations
export { THEMES } from "./model/theme";

// Course Topics configurations
export { courseTopicsConfig, animations } from "./model/config";

// Constants - reexported from shared config
export * from "@/shared/lib/const";
