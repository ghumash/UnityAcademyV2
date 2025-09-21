import type { CourseTopicsConfig } from '../model/types';
import { courseTopicsConfig } from '../model/config';

/**
 * Определяет конфигурацию отображения тем курса
 * @param topicsCount - количество тем
 * @returns конфигурация отображения
 */
export function getTopicsDisplayConfig(topicsCount: number): CourseTopicsConfig {
  return {
    ...courseTopicsConfig,
    enableScroll: topicsCount > courseTopicsConfig.maxVisibleItems,
    useGridLayout: topicsCount <= courseTopicsConfig.maxVisibleItems && topicsCount > 4,
  };
}

/**
 * Генерирует ARIA label для темы курса
 * @param index - индекс темы
 * @param topic - название темы
 * @param total - общее количество тем
 * @returns ARIA label
 */
export function getTopicAriaLabel(index: number, topic: string, total: number): string {
  return `Тема ${index + 1} из ${total}: ${topic}`;
}
