import { cn } from "@/shared/lib/utils";
import { Timer } from "lucide-react";
import type { CompactTimerProps } from '../model/types';
import { getTimeUnitLabel } from '../lib/utils';

/**
 * Компактный вариант таймера для встраивания в другие компоненты
 */
export const CompactTimer = ({ 
  timer, 
  colors, 
  title, 
  dict, 
  className 
}: CompactTimerProps) => {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-lg border px-3 py-2 bg-gradient-to-r",
      colors.border,
      colors.bg,
      className
    )}>
      <div className="flex items-center gap-1">
        <Timer className="h-4 w-4" />
        <span className="text-sm font-semibold">{title}</span>
      </div>
      
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
    </div>
  );
};
