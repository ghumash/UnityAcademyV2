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

// Убраны отдельные UI компоненты - все объединено в CountdownTimer
