import { cn } from "@/shared/lib/utils";
import { TimerHeader } from './TimerHeader';
import { TimeUnit } from './TimeUnit';
import type { CardTimerProps } from '../model/types';

/**
 * Основной вариант таймера в виде карточки
 */
export const CardTimer = ({ 
  timer,
  colors,
  sizes,
  title,
  subtitle,
  dict,
  className 
}: CardTimerProps) => {
  return (
    <div className={cn(
      "rounded-xl border-2 bg-gradient-to-br shadow-lg",
      colors.border,
      colors.bg,
      sizes.container,
      className
    )}>
      {/* Заголовок */}
      <TimerHeader
        title={title}
        subtitle={subtitle}
        colors={colors}
        sizes={sizes}
      />

      {/* Таймер */}
      <div className={cn("grid grid-cols-4", sizes.grid)}>
        <TimeUnit
          value={timer.days}
          unit="days"
          colors={colors}
          sizes={sizes}
          dict={dict}
        />
        <TimeUnit
          value={timer.hours}
          unit="hours"
          colors={colors}
          sizes={sizes}
          dict={dict}
        />
        <TimeUnit
          value={timer.minutes}
          unit="minutes"
          colors={colors}
          sizes={sizes}
          dict={dict}
        />
        <TimeUnit
          value={timer.seconds}
          unit="seconds"
          colors={colors}
          sizes={sizes}
          dict={dict}
        />
      </div>
    </div>
  );
};
