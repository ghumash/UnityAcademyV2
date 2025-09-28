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
