/**
 * Централизованные ключи событий
 * Используется во всем проекте для обеспечения консистентности
 */
export const EVENT_KEYS = [
  "graphic_design_open_class",
] as const;

export type EventKey = (typeof EVENT_KEYS)[number];

/**
 * Данные событий с их отображаемыми названиями и позициями для CallToAction
 */
export const EVENT_DATA = {
  graphic_design_open_class: {
    key: "graphic_design_open_class" as const,
    displayName: "Graphic Design: Open class",
    value: "Գրաֆիկ Դիզայն: Բաց դաս",
    position: { top: "15%", left: "25%" },
  },
} as const;

export type EventData = (typeof EVENT_DATA)[EventKey];
