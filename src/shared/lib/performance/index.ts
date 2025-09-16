/**
 * Экспорт всех систем оптимизации производительности
 */

export * from './code-splitting';
export * from './deprecated-fixes';
export * from './accessibility-fixes';
export * from './image-optimization';

// Главная функция инициализации всех оптимизаций
export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Предзагрузка критических компонентов
  import('./code-splitting').then(({ preloadCriticalComponents }) => {
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
