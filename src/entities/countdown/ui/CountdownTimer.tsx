"use client";

import { useCountdownTimer } from "@/shared/lib/hooks/useCountdownTimer";
import { useDictionary } from "@/shared/lib/i18n/useDictionary";
import { CompactTimer } from './CompactTimer';
import { PremiumTimer } from './PremiumTimer';
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

  // Динамические тексты в зависимости от оставшегося времени
  const isUrgent = timer.days === 0 && timer.hours < 6;
  const isAlmostExpired = timer.days === 0 && timer.hours === 0 && timer.minutes < 30;
  
  const dynamicTitle = title || (isUrgent ? dict.common.countdown.urgentTitle : dict.common.countdown.title);
  const dynamicSubtitle = subtitle || (isUrgent ? dict.common.countdown.urgentSubtitle : dict.common.countdown.subtitle);

  const sizes = sizeClasses[size];
  const colors = colorSchemes[colorScheme];

  // Компактный вариант
  if (variant === "compact") {
    return (
      <CompactTimer
        timer={timer}
        colors={colors}
        sizes={sizes}
        title={dynamicTitle}
        dict={dict}
        className={className}
      />
    );
  }

  // Premium вариант с максимальными эффектами
  if (variant === "premium") {
    return (
      <PremiumTimer
        timer={timer}
        colors={colors}
        sizes={sizes}
        title={dynamicTitle}
        subtitle={dynamicSubtitle}
        durationDays={durationDays}
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
      durationDays={durationDays}
      dict={dict}
      className={className}
    />
  );
};
