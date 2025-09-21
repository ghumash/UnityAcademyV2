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
