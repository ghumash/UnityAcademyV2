/**
 * Объединенная система динамических импортов для оптимизации производительности
 */

import { isServer } from './utils';
import type { DeviceInfo } from './device-detection';

// Условная загрузка библиотек
export const conditionalImports = {
  // Загружаем motion только если нужны анимации
  loadMotion: () => {
    if (isServer) return Promise.resolve(null);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return Promise.resolve(null);
    }
    return import('motion/react');
  },
  
  // Загружаем date-fns только при работе с датами
  loadDateFns: () => import('date-fns'),
  
  // Загружаем react-hook-form только при работе с формами
  loadReactHookForm: async () => {
    const [rhf, resolver] = await Promise.all([
      import('react-hook-form'),
      import('@hookform/resolvers/zod'),
    ]);
    return {
      useForm: rhf.useForm,
      Controller: rhf.Controller,
      zodResolver: resolver.zodResolver,
    };
  },
  
  // Загружаем иконки по требованию
  loadIcon: (iconName: string) => {
    return import('lucide-react').then(module => module[iconName as keyof typeof module]);
  },
};

// Определение нужно ли загружать тяжелые анимации
export function shouldLoadAnimations(deviceInfo: DeviceInfo): boolean {
  if (deviceInfo.connectionSpeed === 'slow') return false;
  if (deviceInfo.isMobile && deviceInfo.browser === 'safari') return false;
  return true;
}

// Определение нужно ли предзагружать ресурсы
export function shouldPreloadResources(deviceInfo: DeviceInfo): boolean {
  return deviceInfo.connectionSpeed === 'fast' && deviceInfo.isDesktop;
}

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

// Предзагрузка критических компонентов
export const preloadCriticalComponents = () => {
  if (isServer) return;
  
  const criticalImports = [
    import('@/widgets/Maps/Maps'),
    import('@/features/feedback'),
  ];
  
  // Запускаем предзагрузку с задержкой
  setTimeout(() => {
    Promise.all(criticalImports).catch(() => {
      // Игнорируем ошибки предзагрузки
    });
  }, 2000);
};
