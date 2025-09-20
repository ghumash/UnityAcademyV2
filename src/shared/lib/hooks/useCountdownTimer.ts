"use client";

import { useState, useEffect, useCallback } from "react";

interface CountdownTimer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isActive: boolean;
  totalSeconds: number;
}

interface UseCountdownTimerOptions {
  /** Ключ для localStorage */
  storageKey: string;
  /** Длительность таймера в днях (по умолчанию 3) */
  durationDays?: number;
  /** Callback при истечении времени */
  onExpire?: () => void;
  /** Callback при каждом тике */
  onTick?: (timer: CountdownTimer) => void;
}

/**
 * Хук для создания таймера обратного отсчета с локальным хранением
 * 
 * @example
 * ```tsx
 * const timer = useCountdownTimer({
 *   storageKey: 'course-discount-timer',
 *   durationDays: 3,
 *   onExpire: () => console.log('Timer expired!'),
 * });
 * 
 * return (
 *   <div>
 *     {timer.isActive && !timer.isExpired && (
 *       <div>
 *         {timer.days}d {timer.hours}h {timer.minutes}m {timer.seconds}s
 *       </div>
 *     )}
 *   </div>
 * );
 * ```
 */
export const useCountdownTimer = ({
  storageKey,
  durationDays = 3,
  onExpire,
  onTick,
}: UseCountdownTimerOptions): CountdownTimer => {
  const [timer, setTimer] = useState<CountdownTimer>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    isActive: false,
    totalSeconds: 0,
  });

  // Получение времени окончания из localStorage или создание нового
  const getEndTime = useCallback((): number => {
    if (typeof window === "undefined") return 0;
    
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const endTime = parseInt(stored, 10);
      // Проверяем, не истекло ли время
      if (endTime > Date.now()) {
        return endTime;
      }
      // Если время истекло, удаляем из localStorage
      localStorage.removeItem(storageKey);
    }
    
    // Создаем новое время окончания
    const newEndTime = Date.now() + (durationDays * 24 * 60 * 60 * 1000);
    localStorage.setItem(storageKey, newEndTime.toString());
    return newEndTime;
  }, [storageKey, durationDays]);

  // Вычисление оставшегося времени
  const calculateTimeLeft = useCallback((endTime: number): CountdownTimer => {
    const now = Date.now();
    const difference = endTime - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
        isActive: false,
        totalSeconds: 0,
      };
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
      isActive: true,
      totalSeconds,
    };
  }, []);

  // Инициализация таймера
  useEffect(() => {
    const endTime = getEndTime();
    const initialTimer = calculateTimeLeft(endTime);
    setTimer(initialTimer);

    if (initialTimer.isExpired && onExpire) {
      onExpire();
    }
  }, [getEndTime, calculateTimeLeft, onExpire]);

  // Обновление таймера каждую секунду
  useEffect(() => {
    if (timer.isExpired || !timer.isActive) return;

    const interval = setInterval(() => {
      const endTime = getEndTime();
      const newTimer = calculateTimeLeft(endTime);
      
      setTimer(newTimer);
      
      if (onTick) {
        onTick(newTimer);
      }
      
      if (newTimer.isExpired && onExpire) {
        onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.isExpired, timer.isActive, getEndTime, calculateTimeLeft, onTick, onExpire]);

  return timer;
};
