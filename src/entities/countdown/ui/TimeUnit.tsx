import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import type { TimeUnitProps, TimeUnit as TimeUnitType } from '../model/types';
import { getTimeUnitLabel } from '../lib/utils';

/**
 * Компонент отдельной единицы времени (день, час, минута, секунда)
 */
export const TimeUnit = ({ 
  value, 
  unit, 
  timer, 
  colors, 
  sizes, 
  dict, 
  variant = "simple",
  delay = 0 
}: TimeUnitProps) => {
  // Определяем условия для анимации срочности
  const getUrgencyCondition = () => {
    switch (unit) {
      case 'days':
        return timer.days < 1;
      case 'hours':
        return timer.days < 1 && timer.hours < 6;
      case 'minutes':
        return timer.days < 1 && timer.hours < 1 && timer.minutes < 30;
      case 'seconds':
        return timer.days < 1 && timer.hours < 1 && timer.minutes < 5;
      default:
        return false;
    }
  };

  const isUrgent = getUrgencyCondition();
  const label = getTimeUnitLabel(value, unit, dict);

  if (variant === "premium") {
    return (
      <motion.div
        key={`${unit}-${value}`}
        initial={{ scale: 1.3, opacity: 0, rotateY: 180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ delay }}
        className={cn(
          "text-center rounded-xl border-2 p-3 relative overflow-hidden",
          colors.unitBg,
          colors.unitBorder
        )}
      >
        {/* Анимированный градиентный фон */}
        <motion.div
          className={cn("absolute inset-0", colors.gradient, "opacity-20")}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: delay * 2,
          }}
        />
        
        {/* Значение времени */}
        <motion.div
          className={cn(sizes.timeUnit, colors.accent, "relative z-10")}
          animate={isUrgent ? { 
            scale: [1, 1.1, 1],
            color: ["currentColor", "#ef4444", "currentColor"] 
          } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          {String(value).padStart(2, "0")}
        </motion.div>
        
        {/* Подпись единицы времени */}
        <div className={cn(sizes.timeLabel, colors.text, "opacity-70 relative z-10")}>
          {label}
        </div>
      </motion.div>
    );
  }

  // Простой вариант
  return (
    <motion.div
      key={`${unit}-${value}`}
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "text-center rounded-lg border p-2",
        colors.unitBg,
        colors.unitBorder
      )}
    >
      <motion.div
        className={cn(sizes.timeUnit, colors.accent)}
        animate={isUrgent ? { 
          color: ["currentColor", "#ef4444", "currentColor"] 
        } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <div className={cn(sizes.timeLabel, colors.text, "opacity-70")}>
        {label}
      </div>
    </motion.div>
  );
};
