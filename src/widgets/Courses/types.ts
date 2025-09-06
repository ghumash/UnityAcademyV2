export type Level = "beginner" | "intermediate" | "advanced";
export type Format = "online" | "offline" | "hybrid";
export type Theme = "indigo" | "purple" | "orange" | "emerald" | "cyan" | "rose";

export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g. "3 месяца"
  level: Level;
  format: Format;
  /** lucide icon name to render on the card header */
  icon?: "Code" | "Brain" | "Palette" | "Bot" | "Globe" | "MapPin" | "Share2" | "Clock" | "GraduationCap" | "Megaphone" | "Users" | "Smartphone";
  /** visual theme color */
  theme?: Theme;
  /** optional link to course page */
  href?: string;
};

export interface CoursesProps {
  title: string;
  courses: readonly Course[];
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
