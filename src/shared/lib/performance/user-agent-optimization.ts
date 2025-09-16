/**
 * DEPRECATED: Функции перенесены в device-detection.ts и image-optimization.ts
 * Этот файл сохранен для обратной совместимости
 */

// Реэкспорт функций из новых модулей
export type { DeviceInfo } from './device-detection';
export { 
  getServerDeviceInfo as getDeviceInfo,
  getClientDeviceInfo 
} from './device-detection';

export { 
  getOptimalImageFormat,
  getOptimalImageSizes 
} from './image-optimization';

export { 
  shouldLoadAnimations,
  shouldPreloadResources 
} from './dynamic-imports';

import type { DeviceInfo } from './device-detection';

// Получение оптимальной конфигурации для видео
export function getOptimalVideoConfig(deviceInfo: DeviceInfo) {
  if (deviceInfo.isMobile) {
    return {
      autoplay: false, // Экономим трафик
      preload: "metadata",
      quality: "720p",
    };
  }
  
  if (deviceInfo.connectionSpeed === "slow") {
    return {
      autoplay: false,
      preload: "none",
      quality: "480p",
    };
  }
  
  return {
    autoplay: true,
    preload: "metadata",
    quality: "1080p",
  };
}
