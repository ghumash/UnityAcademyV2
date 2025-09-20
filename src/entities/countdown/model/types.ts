export interface CountdownTimerProps {
  storageKey: string;
  durationDays?: number;
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "compact" | "card" | "premium";
  colorScheme?: "gradient" | "neon" | "sunset" | "ocean" | "forest";
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
  gradient: string;
  border: string;
  glow: string;
  text: string;
  accent: string;
  bg: string;
  unitBg: string;
  unitBorder: string;
  pulseColor: string;
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

// UI Component Props Interfaces

export interface TimerHeaderProps {
  title: string;
  subtitle?: string;
  colors: ColorScheme;
  sizes: SizeConfig;
  variant?: "compact" | "card" | "premium";
  isUrgent?: boolean;
  isAlmostExpired?: boolean;
  dict?: any;
}

export interface CompactTimerProps {
  timer: TimerData;
  colors: ColorScheme;
  sizes: SizeConfig;
  title: string;
  dict: any;
  className?: string;
}

export interface AnimatedBackgroundProps {
  colors: ColorScheme;
  variant?: "simple" | "pulsing";
}

export interface ProgressBarProps {
  timer: TimerData;
  colors: ColorScheme;
  durationDays: number;
  variant?: "simple" | "premium";
}

export interface CardTimerProps {
  timer: TimerData;
  colors: ColorScheme;
  sizes: SizeConfig;
  title: string;
  subtitle?: string;
  durationDays: number;
  dict: any;
  className?: string;
}

export interface AnimatedParticlesProps {
  colors: ColorScheme;
  count?: number;
}

export interface PremiumTimerProps {
  timer: TimerData;
  colors: ColorScheme;
  sizes: SizeConfig;
  title: string;
  subtitle?: string;
  durationDays: number;
  dict: any;
  className?: string;
}

export interface TimeUnitProps {
  value: number;
  unit: TimeUnit;
  timer: TimerData;
  colors: ColorScheme;
  sizes: SizeConfig;
  dict: any;
  variant?: "simple" | "premium";
  delay?: number;
}
