/**
 * Экспорт всех систем оптимизации производительности
 * Обновленная структура после рефакторинга дублирующегося кода
 */

// Основные модули
export * from './utils';
export * from './device-detection';
export * from './dynamic-imports';
export * from './image-optimization';
export * from './accessibility-fixes';

// Совместимость с устаревшими модулями (без конфликтующих экспортов)
export { 
  getOrigin,
  getKeyCode,
  modernFetch,
  asyncDataLoader,
  modernAPIs,
  safeInjectHTML
} from './deprecated-fixes';

export { 
  getOptimalVideoConfig
} from './user-agent-optimization';

// Главная функция инициализации всех оптимизаций
export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Предзагрузка критических компонентов
  import('./dynamic-imports').then(({ preloadCriticalComponents }) => {
    preloadCriticalComponents();
  });

  // Инициализация ленивой загрузки изображений
  import('./image-optimization').then(({ createLazyImageLoader }) => {
    const imageLoader = createLazyImageLoader();
    if (imageLoader) {
      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageLoader.observe(img);
      });
    }
  });

  // Объявление о готовности для скрин-ридеров
  import('./accessibility-fixes').then(({ ariaHelpers }) => {
    setTimeout(() => {
      ariaHelpers.announceToScreenReader('Страница загружена', 'polite');
    }, 1000);
  });
};
