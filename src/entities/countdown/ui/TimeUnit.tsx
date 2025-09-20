import { cn } from "@/shared/lib/utils";
import type { TimeUnitProps } from '../model/types';
import { getTimeUnitLabel } from '../lib/utils';

/**
 * Компонент отдельной единицы времени (день, час, минута, секунда)
 */
export const TimeUnit = ({ 
  value, 
  unit, 
  colors, 
  sizes, 
  dict
}: TimeUnitProps) => {
  const label = getTimeUnitLabel(value, unit, dict);

  return (
    <div className={cn(
      "text-center rounded-lg border p-2",
      colors.unitBg,
      colors.unitBorder
    )}>
      <div className={cn(sizes.timeUnit, colors.accent)}>
        {String(value).padStart(2, "0")}
      </div>
      <div className={cn(sizes.timeLabel, colors.text, "opacity-70")}>
        {label}
      </div>
    </div>
  );
};
