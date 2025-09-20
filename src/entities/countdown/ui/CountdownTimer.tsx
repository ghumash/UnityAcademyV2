"use client";

import { useCountdownTimer } from "@/shared/lib/hooks/useCountdownTimer";
import { useDictionary } from "@/shared/lib/i18n/useDictionary";
import { CompactTimer } from './CompactTimer';
import { CardTimer } from './CardTimer';
import { sizeClasses, colorSchemes } from '../model/config';
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

  // Компактный вариант
  if (variant === "compact") {
    return (
      <CompactTimer
        timer={timer}
        colors={colors}
        title={dynamicTitle}
        dict={dict}
        className={className}
      />
    );
  }


  // Основной вариант (card)
  return (
    <CardTimer
      timer={timer}
      colors={colors}
      sizes={sizes}
      title={dynamicTitle}
      subtitle={dynamicSubtitle}
      dict={dict}
      className={className}
    />
  );
};
