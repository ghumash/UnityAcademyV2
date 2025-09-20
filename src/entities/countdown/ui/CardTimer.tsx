import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { AnimatedBackground } from './AnimatedBackground';
import { TimerHeader } from './TimerHeader';
import { TimeUnit } from './TimeUnit';
import { ProgressBar } from './ProgressBar';
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
  durationDays, 
  dict, 
  className 
}: CardTimerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-xl border-2",
        "bg-gradient-to-br backdrop-blur-sm",
        "shadow-lg transition-all duration-300",
        colors.gradient,
        colors.border,
        colors.glow,
        colors.bg,
        sizes.container,
        className
      )}
    >
      {/* Анимированный фон */}
      <AnimatedBackground colors={colors} variant="simple" />

      {/* Контент */}
      <div className="relative z-10">
        {/* Заголовок */}
        <TimerHeader
          title={title}
          subtitle={subtitle}
          colors={colors}
          sizes={sizes}
          variant="card"
        />

        {/* Таймер */}
        <div className={cn("grid grid-cols-4", sizes.grid)}>
          <TimeUnit
            value={timer.days}
            unit="days"
            timer={timer}
            colors={colors}
            sizes={sizes}
            dict={dict}
            variant="simple"
          />
          <TimeUnit
            value={timer.hours}
            unit="hours"
            timer={timer}
            colors={colors}
            sizes={sizes}
            dict={dict}
            variant="simple"
          />
          <TimeUnit
            value={timer.minutes}
            unit="minutes"
            timer={timer}
            colors={colors}
            sizes={sizes}
            dict={dict}
            variant="simple"
          />
          <TimeUnit
            value={timer.seconds}
            unit="seconds"
            timer={timer}
            colors={colors}
            sizes={sizes}
            dict={dict}
            variant="simple"
          />
        </div>

        {/* Прогресс бар */}
        <ProgressBar
          timer={timer}
          colors={colors}
          durationDays={durationDays}
          variant="simple"
        />
      </div>
    </motion.div>
  );
};
