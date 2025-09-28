import { Globe, MapPin, Share2 } from "lucide-react";
import type { Level, Format } from "../model/types";

/**
 * Получить иконку для формата обучения
 */
export function formatIconByMode(mode: Format) {
  if (mode === "online") return Globe;
  if (mode === "offline") return MapPin;
  return Share2; // hybrid
}

/**
 * Получить лейбл для уровня сложности
 */
export function levelLabel(
  level: Level,
  levels: { beginner: string; intermediate: string; advanced: string }
): string {
  return levels[level];
}

/**
 * Получить лейбл для формата обучения
 */
export function formatLabel(
  format: Format,
  formats: { online: string; offline: string; hybrid: string }
): string {
  return formats[format];
}

// Course Topics utils (merged from course-topics entity)
import type { CourseTopicsConfig } from "../model/types";
import { courseTopicsConfig } from "../model/config";

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

// Instructor utils (merged from instructor entity)
/**
 * Получает инициалы из полного имени для fallback аватара
 * @param name - полное имя пользователя
 * @returns строка с инициалами (максимум 2 символа)
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Получает название платформы для социальной сети
 * @param platform - ключ платформы
 * @returns локализованное название платформы
 */
export const getPlatformName = (platform: string): string => {
  const platformNames: Record<string, string> = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    behance: 'Behance',
    github: 'GitHub',
    x: 'X (Twitter)',
    website: 'Веб-сайт'
  };
  
  return platformNames[platform] || platform;
};
