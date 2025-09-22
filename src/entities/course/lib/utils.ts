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
