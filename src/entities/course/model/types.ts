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
