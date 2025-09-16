/**
 * Система оптимизации кода и устранения неиспользуемого JavaScript
 */

import { lazy } from 'react';

// Ленивая загрузка тяжелых компонентов
export const LazyComponents = {
  // Карты - загружаются только при необходимости
  Maps: lazy(() => import('@/widgets/Maps/Maps').then(m => ({ default: m.Maps }))),
  
  // Формы - загружаются при взаимодействии
  FeedbackForm: lazy(() => import('@/features/feedback').then(m => ({ default: m.FeedbackForm }))),
  
  // FAQ аккордеон - загружается при скролле
  FaqAccordion: lazy(() => import('@/widgets/FaqAccordion/FaqAccordion').then(m => ({ default: m.FaqAccordion }))),
  
  // Видео компоненты - загружаются при клике (если существует)
  // VideoCarousel: lazy(() => import('@/widgets').then(m => ({ default: m.VideoCarousel }))),
  
  // Анимации - загружаются при появлении в viewport
  AnimatedLinesBadges: lazy(() => import('@/widgets').then(m => ({ default: m.AnimatedLinesBadges }))),
};

// Предзагрузка критических компонентов
export const preloadCriticalComponents = () => {
  if (typeof window !== 'undefined') {
    // Предзагружаем компоненты, которые точно понадобятся
    const criticalImports = [
      import('@/widgets/Maps/Maps'),
      import('@/features/feedback'),
    ];
    
    // Запускаем предзагрузку с задержкой для не блокирования основного потока
    setTimeout(() => {
      Promise.all(criticalImports).catch(() => {
        // Игнорируем ошибки предзагрузки
      });
    }, 2000);
  }
};

// Условная загрузка библиотек
export const conditionalImports = {
  // Загружаем motion только если нужны анимации
  loadMotion: () => {
    if (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return import('motion/react');
    }
    return Promise.resolve(null);
  },
  
  // Загружаем date-fns только при работе с датами
  loadDateFns: () => import('date-fns'),
  
  // Загружаем react-hook-form только при работе с формами
  loadReactHookForm: () => import('react-hook-form'),
};

// Оптимизация импортов иконок
export const optimizedIconImports = {
  // Импортируем только нужные иконки
  loadIcon: (iconName: string) => {
    return import(`lucide-react`).then(module => module[iconName as keyof typeof module]);
  },
};

// Tree-shaking оптимизация
export const treeShakingOptimizations = {
  // Используем именованные импорты вместо default
  loadUtility: (utilName: string) => {
    switch (utilName) {
      case 'cn':
        return import('@/shared/lib/utils').then(m => m.cn);
      case 'formatDate':
        return import('date-fns/format');
      default:
        return Promise.resolve(null);
    }
  },
};
