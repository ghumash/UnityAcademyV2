import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { AnimatedParticles } from './AnimatedParticles';
import { AnimatedBackground } from './AnimatedBackground';
import { TimerHeader } from './TimerHeader';
import { TimeUnit } from './TimeUnit';
import { ProgressBar } from './ProgressBar';
import type { PremiumTimerProps } from '../model/types';

/**
 * Premium вариант таймера с максимальными визуальными эффектами
 */
export const PremiumTimer = ({ 
  timer, 
  colors, 
  sizes, 
  title, 
  subtitle, 
  durationDays, 
  dict, 
  className 
}: PremiumTimerProps) => {
  const isUrgent = timer.days === 0 && timer.hours < 6;
  const isAlmostExpired = timer.days === 0 && timer.hours === 0 && timer.minutes < 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border-2",
        "bg-gradient-to-br backdrop-blur-md",
        "shadow-2xl transition-all duration-500",
        colors.gradient,
        colors.border,
        colors.glow,
        colors.bg,
        sizes.container,
        className
      )}
    >
      {/* Анимированные частицы */}
      <AnimatedParticles colors={colors} count={8} />

      {/* Пульсирующий фон */}
      <AnimatedBackground colors={colors} variant="pulsing" />

      {/* Контент */}
      <div className="relative z-10">
        {/* Заголовок с иконкой */}
        <TimerHeader
          title={title}
          subtitle={subtitle}
          colors={colors}
          sizes={sizes}
          variant="premium"
          isUrgent={isUrgent}
          isAlmostExpired={isAlmostExpired}
          dict={dict}
        />

        {/* Таймер с улучшенными эффектами */}
        <div className={cn("grid grid-cols-4", sizes.grid)}>
          <TimeUnit
            value={timer.days}
            unit="days"
            timer={timer}
            colors={colors}
            sizes={sizes}
            dict={dict}
            variant="premium"
            delay={0}
          />
          <TimeUnit
            value={timer.hours}
            unit="hours"
            timer={timer}
            colors={colors}
            sizes={sizes}
            dict={dict}
            variant="premium"
            delay={0.1}
          />
          <TimeUnit
            value={timer.minutes}
            unit="minutes"
            timer={timer}
            colors={colors}
            sizes={sizes}
            dict={dict}
            variant="premium"
            delay={0.2}
          />
          <TimeUnit
            value={timer.seconds}
            unit="seconds"
            timer={timer}
            colors={colors}
            sizes={sizes}
            dict={dict}
            variant="premium"
            delay={0.3}
          />
        </div>

        {/* Прогресс бар с эффектами */}
        <ProgressBar
          timer={timer}
          colors={colors}
          durationDays={durationDays}
          variant="premium"
        />

        {/* Сообщение о срочности */}
        <AnimatePresence>
          {isAlmostExpired && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 text-center"
            >
              <motion.span
                className={cn("text-sm font-semibold", colors.accent)}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                {dict.common.countdown.messages.lastChance}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
