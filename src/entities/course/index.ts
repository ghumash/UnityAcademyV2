// Main component
export { Courses } from "./ui/Courses";

// Sub-components
export { CourseCard } from "./ui/CourseCard";
export { IntroHero } from "./ui/IntroHero";

// Types
export type {
  Course,
  Level,
  Format,
  Theme,
  CoursesProps,
  CourseCardProps,
} from "./model/types";

// Theme
export { THEMES } from "./model/theme";

// Utils
export { formatIconByMode, levelLabel, formatLabel } from "./lib/utils";
