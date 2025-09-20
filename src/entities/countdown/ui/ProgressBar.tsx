import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import type { ProgressBarProps } from '../model/types';

/**
 * Компонент прогресс-бара для отображения оставшегося времени
 */
export const ProgressBar = ({ timer, colors, durationDays, variant = "simple" }: ProgressBarProps) => {
  const progressPercentage = (timer.totalSeconds / (durationDays * 24 * 60 * 60)) * 100;

  if (variant === "premium") {
    return (
      <div className="mt-4">
        <div className={cn("h-2 rounded-full overflow-hidden", colors.unitBg, "relative")}>
          {/* Анимированный фоновый эффект */}
          <motion.div
            className={cn("absolute inset-0", colors.gradient, "opacity-50")}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Основной прогресс */}
          <motion.div
            className={cn("h-full rounded-full relative z-10", colors.gradient)}
            initial={{ width: "100%" }}
            animate={{ 
              width: `${progressPercentage}%` 
            }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    );
  }

  // Простой вариант
  return (
    <div className="mt-3">
      <div className={cn("h-1 rounded-full overflow-hidden", colors.unitBg)}>
        <motion.div
          className={cn("h-full rounded-full", colors.gradient)}
          initial={{ width: "100%" }}
          animate={{ 
            width: `${progressPercentage}%` 
          }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};
