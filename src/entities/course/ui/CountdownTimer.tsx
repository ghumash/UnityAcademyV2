"use client";

import { cn } from "@/shared/lib/utils";
import { Timer } from "lucide-react";
import { useCountdownTimer } from "@/shared/lib/hooks/useCountdownTimer";
import { useDictionary } from "@/shared/lib/i18n/useDictionary";
import { sizeClasses, colorSchemes } from '../model/config';
import { getTimeUnitLabel } from '../lib/utils';
import type { CountdownTimerProps } from '../model/types';

export const CountdownTimer = ({
  storageKey,
  durationDays = 3,
  title,
  subtitle,
  size = "md",
  variant = "card",
  colorScheme = "gradient",
  onExpire,
  className,
}: CountdownTimerProps) => {
  const { dict } = useDictionary();
  const timer = useCountdownTimer({
    storageKey,
    durationDays,
    onExpire,
  });

  if (timer.isExpired || !timer.isActive) {
    return null;
  }

  const dynamicTitle = title || dict.common.countdown.title;
  const dynamicSubtitle = subtitle || dict.common.countdown.subtitle;

  const sizes = sizeClasses[size];
  const colors = colorSchemes[colorScheme];

  // Компактный вариант таймера
  const CompactTimer = () => (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-lg border px-3 py-2 bg-gradient-to-r",
      colors.border,
      colors.bg,
      className
    )}>
      <div className="flex items-center gap-1">
        <Timer className="h-4 w-4" />
        <span className="text-sm font-semibold">{dynamicTitle}</span>
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

  if (variant === "compact") return <CompactTimer />;

  const CardTimer = () => {
    // Заголовок таймера
    const TimerHeader = () => (
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Timer className={cn(sizes.icon, colors.text)} />
          <h3 className={cn(sizes.title, colors.text)}>
            {dynamicTitle}
          </h3>
        </div>
        {dynamicSubtitle && (
          <p className={cn(sizes.subtitle, colors.text, "opacity-80")}>
            {dynamicSubtitle}
          </p>
        )}
      </div>
    );

    // Единица времени
    const TimeUnit = ({ value, unit }: { value: number; unit: 'days' | 'hours' | 'minutes' | 'seconds' }) => {
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

    return (
      <div className={cn(
        "rounded-xl border-2 bg-gradient-to-br shadow-lg",
        colors.border,
        colors.bg,
        sizes.container,
        className
      )}>
        <TimerHeader />
        <div className={cn("grid grid-cols-4", sizes.grid)}>
          <TimeUnit value={timer.days} unit="days" />
          <TimeUnit value={timer.hours} unit="hours" />
          <TimeUnit value={timer.minutes} unit="minutes" />
          <TimeUnit value={timer.seconds} unit="seconds" />
        </div>
      </div>
    );
  };

  return <CardTimer />;
};
