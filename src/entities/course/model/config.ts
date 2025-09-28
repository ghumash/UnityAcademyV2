import type { CourseTopicsConfig } from './types';

export const courseTopicsConfig: CourseTopicsConfig = {
  maxVisibleItems: 8,
  enableScroll: true,
  useGridLayout: true,
};

export const animations = {
  container: {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.05,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
  },
} as const;

// Countdown configurations (merged from countdown entity)
import type { SizeConfig, ColorScheme } from './types';

export const sizeClasses: Record<"sm" | "md" | "lg", SizeConfig> = {
  sm: {
    container: "p-3 gap-2",
    title: "text-sm font-semibold",
    subtitle: "text-xs",
    timeUnit: "text-lg font-bold",
    timeLabel: "text-xs",
    icon: "h-4 w-4",
    grid: "gap-1",
  },
  md: {
    container: "p-4 gap-3",
    title: "text-base font-semibold",
    subtitle: "text-sm",
    timeUnit: "text-xl font-bold",
    timeLabel: "text-xs",
    icon: "h-5 w-5",
    grid: "gap-2",
  },
  lg: {
    container: "p-6 gap-4",
    title: "text-lg font-bold",
    subtitle: "text-base",
    timeUnit: "text-2xl font-bold",
    timeLabel: "text-sm",
    icon: "h-6 w-6",
    grid: "gap-3",
  },
};

export const colorSchemes: Record<"gradient" | "neon" | "sunset" | "ocean" | "forest" | "yellow", ColorScheme> = {
  gradient: {
    border: "border-violet-500/50",
    text: "text-violet-600 dark:text-violet-400",
    accent: "text-fuchsia-700 dark:text-fuchsia-300",
    bg: "bg-gradient-to-br from-violet-50/90 via-fuchsia-50/80 to-pink-50/90 dark:from-violet-950/40 dark:via-fuchsia-950/30 dark:to-pink-950/40",
    unitBg: "bg-gradient-to-br from-violet-100/80 to-fuchsia-100/80 dark:from-violet-900/60 dark:to-fuchsia-900/60",
    unitBorder: "border-violet-300/60 dark:border-violet-700/60",
  },
  neon: {
    border: "border-cyan-400/60",
    text: "text-cyan-500 dark:text-cyan-400",
    accent: "text-blue-600 dark:text-blue-300",
    bg: "bg-gradient-to-br from-cyan-50/90 via-blue-50/80 to-purple-50/90 dark:from-cyan-950/40 dark:via-blue-950/30 dark:to-purple-950/40",
    unitBg: "bg-gradient-to-br from-cyan-100/80 to-blue-100/80 dark:from-cyan-900/60 dark:to-blue-900/60",
    unitBorder: "border-cyan-300/60 dark:border-cyan-700/60",
  },
  sunset: {
    border: "border-orange-400/60",
    text: "text-orange-600 dark:text-orange-400",
    accent: "text-red-600 dark:text-red-300",
    bg: "bg-gradient-to-br from-orange-50/90 via-red-50/80 to-pink-50/90 dark:from-orange-950/40 dark:via-red-950/30 dark:to-pink-950/40",
    unitBg: "bg-gradient-to-br from-orange-100/80 to-red-100/80 dark:from-orange-900/60 dark:to-red-900/60",
    unitBorder: "border-orange-300/60 dark:border-orange-700/60",
  },
  ocean: {
    border: "border-blue-400/60",
    text: "text-blue-600 dark:text-blue-400",
    accent: "text-teal-600 dark:text-teal-300",
    bg: "bg-gradient-to-br from-blue-50/90 via-teal-50/80 to-emerald-50/90 dark:from-blue-950/40 dark:via-teal-950/30 dark:to-emerald-950/40",
    unitBg: "bg-gradient-to-br from-blue-100/80 to-teal-100/80 dark:from-blue-900/60 dark:to-teal-900/60",
    unitBorder: "border-blue-300/60 dark:border-blue-700/60",
  },
  forest: {
    border: "border-green-400/60",
    text: "text-green-600 dark:text-green-400",
    accent: "text-emerald-600 dark:text-emerald-300",
    bg: "bg-gradient-to-br from-green-50/90 via-emerald-50/80 to-teal-50/90 dark:from-green-950/40 dark:via-emerald-950/30 dark:to-teal-950/40",
    unitBg: "bg-gradient-to-br from-green-100/80 to-emerald-100/80 dark:from-green-900/60 dark:to-emerald-900/60",
    unitBorder: "border-green-300/60 dark:border-green-700/60",
  },
  yellow: {
    border: "border-yellow-400/60",
    text: "text-yellow-600 dark:text-yellow-400",
    accent: "text-amber-600 dark:text-amber-300",
    bg: "bg-gradient-to-br from-yellow-50/90 via-amber-50/80 to-orange-50/90 dark:from-yellow-950/40 dark:via-amber-950/30 dark:to-orange-950/40",
    unitBg: "bg-gradient-to-br from-yellow-100/80 to-amber-100/80 dark:from-yellow-900/60 dark:to-amber-900/60",
    unitBorder: "border-yellow-300/60 dark:border-yellow-700/60",
  },
};
