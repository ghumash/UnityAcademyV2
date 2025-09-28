/**
 * Утилиты для CallToAction widget
 * Вспомогательные функции для анимаций и вычислений
 */

import type { AnimationPoint } from "../model/types";

/**
 * Ограничивает значение в заданном диапазоне
 * @param value - значение для ограничения
 * @param min - минимальное значение (по умолчанию 0)
 * @param max - максимальное значение (по умолчанию 100)
 */
export const clamp = (value: number, min = 0, max = 100): number => {
  return Math.max(min, Math.min(max, value));
};

// Приватная функция, используемая только в createCenterCalculator
const getElementCenterPercent = <T extends string>(
  element: HTMLElement,
  container: HTMLElement,
  id: T
): AnimationPoint<T> | null => {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  
  const cx = ((elementRect.left + elementRect.width / 2 - containerRect.left) / containerRect.width) * 100;
  const cy = ((elementRect.top + elementRect.height / 2 - containerRect.top) / containerRect.height) * 100;
  
  return {
    id,
    left: `${clamp(cx)}%`,
    top: `${clamp(cy)}%`,
  };
};

/**
 * Создает функцию для получения центра элемента по ID
 * @param container - контейнер элементов
 * @returns функция для получения центра элемента
 */
export const createCenterCalculator = <T extends string>(container: HTMLElement) => {
  return (id: T): AnimationPoint<T> | null => {
    const element = container.querySelector<HTMLElement>(`#${id}`);
    if (!element) return null;
    
    return getElementCenterPercent(element, container, id);
  };
};
