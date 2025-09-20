import { cn } from "@/shared/lib/utils";
import { Timer } from "lucide-react";
import type { TimerHeaderProps } from '../model/types';

/**
 * Компонент заголовка таймера
 */
export const TimerHeader = ({ 
  title, 
  subtitle, 
  colors, 
  sizes
}: TimerHeaderProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Timer className={cn(sizes.icon, colors.text)} />
        <h3 className={cn(sizes.title, colors.text)}>
          {title}
        </h3>
      </div>
      
      {subtitle && (
        <p className={cn(sizes.subtitle, colors.text, "opacity-80")}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
