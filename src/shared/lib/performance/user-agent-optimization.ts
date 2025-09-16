// Оптимизация под различные user agents и устройства

import { headers } from "next/headers";

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBot: boolean;
  browser: string;
  os: string;
  supportsWebP: boolean;
  supportsAvif: boolean;
  connectionSpeed: "slow" | "fast" | "unknown";
}

// Получение информации об устройстве на сервере
export async function getDeviceInfo(): Promise<DeviceInfo> {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)|Android(?=.*\bTablet\b)/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
  
  // Определение браузера
  let browser = "unknown";
  if (userAgent.includes("Chrome")) browser = "chrome";
  else if (userAgent.includes("Firefox")) browser = "firefox";
  else if (userAgent.includes("Safari")) browser = "safari";
  else if (userAgent.includes("Edge")) browser = "edge";
  
  // Определение ОС
  let os = "unknown";
  if (userAgent.includes("Windows")) os = "windows";
  else if (userAgent.includes("Mac")) os = "macos";
  else if (userAgent.includes("Linux")) os = "linux";
  else if (userAgent.includes("Android")) os = "android";
  else if (userAgent.includes("iOS")) os = "ios";
  
  // Поддержка современных форматов изображений
  const acceptHeader = headersList.get("accept") || "";
  const supportsWebP = acceptHeader.includes("image/webp");
  const supportsAvif = acceptHeader.includes("image/avif");
  
  // Определение скорости соединения (приблизительно)
  const connectionHeader = headersList.get("downlink") || headersList.get("rtt");
  let connectionSpeed: "slow" | "fast" | "unknown" = "unknown";
  
  if (connectionHeader) {
    const speed = parseFloat(connectionHeader);
    connectionSpeed = speed < 1.5 ? "slow" : "fast";
  }
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isBot,
    browser,
    os,
    supportsWebP,
    supportsAvif,
    connectionSpeed,
  };
}

// Клиентская версия для получения информации об устройстве
export function getClientDeviceInfo(): DeviceInfo {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isBot: false,
      browser: "unknown",
      os: "unknown",
      supportsWebP: false,
      supportsAvif: false,
      connectionSpeed: "unknown",
    };
  }
  
  const userAgent = navigator.userAgent;
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)|Android(?=.*\bTablet\b)/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
  
  // Определение браузера
  let browser = "unknown";
  if (userAgent.includes("Chrome")) browser = "chrome";
  else if (userAgent.includes("Firefox")) browser = "firefox";
  else if (userAgent.includes("Safari")) browser = "safari";
  else if (userAgent.includes("Edge")) browser = "edge";
  
  // Определение ОС
  let os = "unknown";
  if (userAgent.includes("Windows")) os = "windows";
  else if (userAgent.includes("Mac")) os = "macos";
  else if (userAgent.includes("Linux")) os = "linux";
  else if (userAgent.includes("Android")) os = "android";
  else if (userAgent.includes("iOS")) os = "ios";
  
  // Проверка поддержки форматов изображений
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  
  const supportsWebP = canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  const supportsAvif = canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0;
  
  // Определение скорости соединения
  let connectionSpeed: "slow" | "fast" | "unknown" = "unknown";
  const connection = (navigator as any).connection;
  
  if (connection) {
    const effectiveType = connection.effectiveType;
    connectionSpeed = ["slow-2g", "2g"].includes(effectiveType) ? "slow" : "fast";
  }
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isBot,
    browser,
    os,
    supportsWebP,
    supportsAvif,
    connectionSpeed,
  };
}

// Адаптивная загрузка ресурсов в зависимости от устройства
export function getOptimalImageFormat(deviceInfo: DeviceInfo): "avif" | "webp" | "jpg" {
  if (deviceInfo.supportsAvif) return "avif";
  if (deviceInfo.supportsWebP) return "webp";
  return "jpg";
}

// Получение оптимальных размеров изображений для устройства
export function getOptimalImageSizes(deviceInfo: DeviceInfo) {
  if (deviceInfo.isMobile) {
    return {
      hero: { width: 640, height: 360 },
      card: { width: 320, height: 240 },
      thumbnail: { width: 150, height: 150 },
    };
  }
  
  if (deviceInfo.isTablet) {
    return {
      hero: { width: 1024, height: 576 },
      card: { width: 480, height: 360 },
      thumbnail: { width: 200, height: 200 },
    };
  }
  
  // Desktop
  return {
    hero: { width: 1920, height: 1080 },
    card: { width: 640, height: 480 },
    thumbnail: { width: 300, height: 300 },
  };
}

// Определение нужно ли загружать тяжелые анимации
export function shouldLoadAnimations(deviceInfo: DeviceInfo): boolean {
  // Не загружаем анимации на медленном соединении или слабых устройствах
  if (deviceInfo.connectionSpeed === "slow") return false;
  if (deviceInfo.isMobile && deviceInfo.browser === "safari") return false; // iOS Safari может тормозить
  
  return true;
}

// Определение нужно ли предзагружать ресурсы
export function shouldPreloadResources(deviceInfo: DeviceInfo): boolean {
  // Предзагружаем только на быстром соединении и десктопе
  return deviceInfo.connectionSpeed === "fast" && deviceInfo.isDesktop;
}

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
