import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { TimerHeader } from './TimerHeader';
import type { CompactTimerProps } from '../model/types';
import { getTimeUnitLabel } from '../lib/utils';

/**
 * Компактный вариант таймера для встраивания в другие компоненты
 */
export const CompactTimer = ({ 
  timer, 
  colors, 
  sizes, 
  title, 
  dict, 
  className 
}: CompactTimerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2",
        "bg-gradient-to-r backdrop-blur-sm",
        colors.gradient,
        colors.border,
        colors.bg,
        className
      )}
    >
      <TimerHeader
        title={title}
        colors={colors}
        sizes={sizes}
        variant="compact"
      />
      
      <div className="flex items-center gap-2 text-sm font-semibold">
        {timer.days > 0 && (
          <span className={colors.accent}>
            {timer.days} {getTimeUnitLabel(timer.days, 'days', dict)}
          </span>
        )}
        <span className={cn(colors.accent, "font-mono")}>
          {String(timer.hours).padStart(2, "0")}:
          {String(timer.minutes).padStart(2, "0")}:
          {String(timer.seconds).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
};
