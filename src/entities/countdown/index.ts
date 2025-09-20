// Public API of countdown entity
export { CountdownTimer } from './ui/CountdownTimer';

// Export types for external usage
export type { 
  CountdownTimerProps, 
  SizeConfig, 
  ColorScheme, 
  TimerData, 
  TimeUnit,
  // UI Component Props (if needed externally)
  TimerHeaderProps,
  CompactTimerProps,
  AnimatedBackgroundProps,
  ProgressBarProps,
  CardTimerProps,
  AnimatedParticlesProps,
  PremiumTimerProps,
  TimeUnitProps
} from './model/types';

// Export utilities that might be needed externally
export { getTimeUnitLabel } from './lib/utils';

// Export configurations if needed externally
export { sizeClasses, colorSchemes } from './model/config';
