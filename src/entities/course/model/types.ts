export type Level = "beginner" | "intermediate" | "advanced";
export type Format = "online" | "offline" | "hybrid";
export type Theme =
  | "indigo"
  | "purple"
  | "orange"
  | "emerald"
  | "cyan"
  | "rose"
  | "violet"
  | "teal"
  | "amber"
  | "lime"
  | "fuchsia"
  | "blue"
  | "pink";

export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g. "3 месяца"
  level: Level;
  format: Format;
  /** lucide icon name to render on the card header */
  icon?:
    | "Code2"
    | "Palette"
    | "Puzzle"
    | "Megaphone"
    | "Workflow"
    | "Smartphone"
    | "LayoutDashboard"
    | "UsersRound"
    | "MessageSquareText";
  /** visual theme color */
  theme?: Theme;
  /** optional link to course page */
  href?: string;
};

export interface CoursesProps {
  title: string;
  list: readonly Course[];
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
}

// UI Component Props
export interface CourseCardProps {
  course: Course;
  levels: CoursesProps["levels"];
  formats: CoursesProps["formats"];
}

// Course Topics types (merged from course-topics entity)
export interface CourseTopicsProps {
  title: string;
  topics: string[];
  className?: string;
}

export interface CourseTopicsConfig {
  maxVisibleItems: number;
  enableScroll: boolean;
  useGridLayout: boolean;
}

// Instructor types (merged from instructor entity)
export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  summary: string;
};

export type SocialLinks = {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  behance?: string;
  github?: string;
  x?: string;
  website?: string;
};

export type InstructorData = {
  display?: boolean;
  name: string;
  role: string;
  avatarUrl?: string;
  bio: string;
  experience: ExperienceItem[];
  socials: SocialLinks;
};

export type InstructorLabels = {
  experienceLabel: string;
  socialNetworksLabel: string;
  showDetails: string;
  hideDetails: string;
};

export type InstructorCardProps = {
  data: InstructorData;
  labels: InstructorLabels;
  className?: string;
};

// Countdown types (merged from countdown entity)
export interface CountdownTimerProps {
  storageKey: string;
  durationDays?: number;
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  variant?: "compact" | "card";
  colorScheme?: "gradient" | "neon" | "sunset" | "ocean" | "forest" | "yellow";
  onExpire?: () => void;
  className?: string;
}

export interface SizeConfig {
  container: string;
  title: string;
  subtitle: string;
  timeUnit: string;
  timeLabel: string;
  icon: string;
  grid: string;
}

export interface ColorScheme {
  border: string;
  text: string;
  accent: string;
  bg: string;
  unitBg: string;
  unitBorder: string;
}

export interface TimerData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
  isActive: boolean;
}

export type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';
