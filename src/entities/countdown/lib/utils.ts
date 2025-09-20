import type { TimeUnit } from '../model/types';

/**
 * Получает правильное название единицы времени с учетом склонения
 * @param value - числовое значение времени
 * @param unit - единица времени
 * @param dict - словарь переводов
 * @returns правильно склоненное название единицы времени
 */
export const getTimeUnitLabel = (
  value: number, 
  unit: TimeUnit, 
  dict: any
): string => {
  // Для русского языка нужны особые правила склонения
  const lastDigit = value % 10;
  const lastTwoDigits = value % 100;
  
  // Если это не русский язык, используем простую логику
  if (dict.common.countdown.timeUnits.day !== 'день') {
    if (value === 1) {
      const singularForms = {
        days: 'day',
        hours: 'hour', 
        minutes: 'minute',
        seconds: 'second'
      } as const;
      return dict.common.countdown.timeUnits[singularForms[unit]];
    }
    return dict.common.countdown.timeUnits[unit];
  }
  
  // Русские правила склонения
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    // 11-19: дней, часов, минут, секунд
    return dict.common.countdown.timeUnits[unit];
  } else if (lastDigit === 1) {
    // 1, 21, 31...: день, час, минута, секунда
    const singularForms = {
      days: 'day',
      hours: 'hour', 
      minutes: 'minute',
      seconds: 'second'
    } as const;
    return dict.common.countdown.timeUnits[singularForms[unit]];
  } else {
    // 2-4, 22-24...: дня, часа, минуты, секунды (но у нас только формы "дней", "часов" и т.д.)
    // 0, 5-20, 25-30...: дней, часов, минут, секунд
    return dict.common.countdown.timeUnits[unit];
  }
};
