/**
 * Типы для CallToAction widget
 * Централизованное хранение всех типов согласно FSD
 */

import type { ReactNode, CSSProperties } from "react";

// Универсальный тип для элемента данных (экспортируем для внешнего использования)
export interface CallToActionItem {
  key: string;
  displayName: string;
  value: string;
  position: { top: string; left: string };
}

// Универсальный тип для данных (экспортируем для внешнего использования)
export type CallToActionData<T extends string> = Record<T, CallToActionItem>;

// Основные пропсы компонента CallToAction
export interface CallToActionProps<T extends string = string> {
  title: string;
  subtitle: string;
  children: ReactNode;
  activeTagId?: T;
  // Данные передаются через пропсы
  keys: readonly T[];
  data: CallToActionData<T>;
}

// Пропсы для Tag компонента
export interface TagProps {
  id: string;
  label: string;
  style: CSSProperties;
}

// Тип для точки анимации
export interface AnimationPoint<T extends string = string> {
  id: T;
  left: string;
  top: string;
}
