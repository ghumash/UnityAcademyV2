/**
 * Объединенная система детекции устройств и браузеров
 */

import { headers } from 'next/headers';
import { userAgentPatterns, browserSupport, isServer } from './utils';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBot: boolean;
  browser: string;
  os: string;
  supportsWebP: boolean;
  supportsAvif: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

// Серверная детекция устройства
export async function getServerDeviceInfo(): Promise<DeviceInfo> {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  
  return analyzeUserAgent(userAgent, headersList);
}

// Клиентская детекция устройства
export function getClientDeviceInfo(): DeviceInfo {
  if (isServer) {
    return getDefaultDeviceInfo();
  }
  
  const userAgent = navigator.userAgent;
  const connection = (navigator as any).connection;
  
  const deviceInfo = analyzeUserAgent(userAgent);
  
  // Клиентская проверка поддержки форматов
  deviceInfo.supportsWebP = browserSupport.webp();
  deviceInfo.supportsAvif = browserSupport.avif();
  
  // Определение скорости соединения на клиенте
  if (connection) {
    const effectiveType = connection.effectiveType;
    deviceInfo.connectionSpeed = ['slow-2g', '2g'].includes(effectiveType) ? 'slow' : 'fast';
  }
  
  return deviceInfo;
}

// Анализ User Agent строки
function analyzeUserAgent(userAgent: string, headersList?: Headers): DeviceInfo {
  const isMobile = userAgentPatterns.mobile.test(userAgent);
  const isTablet = userAgentPatterns.tablet.test(userAgent);
  const isDesktop = !isMobile && !isTablet;
  const isBot = userAgentPatterns.bot.test(userAgent);
  
  // Определение браузера
  let browser = 'unknown';
  for (const [name, pattern] of Object.entries(userAgentPatterns.browsers)) {
    if (pattern.test(userAgent)) {
      browser = name;
      break;
    }
  }
  
  // Определение ОС
  let os = 'unknown';
  for (const [name, pattern] of Object.entries(userAgentPatterns.os)) {
    if (pattern.test(userAgent)) {
      os = name;
      break;
    }
  }
  
  // Серверная проверка поддержки форматов через Accept заголовок
  let supportsWebP = false;
  let supportsAvif = false;
  
  if (headersList) {
    const acceptHeader = headersList.get('accept') || '';
    supportsWebP = acceptHeader.includes('image/webp');
    supportsAvif = acceptHeader.includes('image/avif');
  }
  
  // Определение скорости соединения
  let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
  if (headersList) {
    const connectionHeader = headersList.get('downlink') || headersList.get('rtt');
    if (connectionHeader) {
      const speed = parseFloat(connectionHeader);
      connectionSpeed = speed < 1.5 ? 'slow' : 'fast';
    }
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

// Дефолтная информация об устройстве
function getDefaultDeviceInfo(): DeviceInfo {
  return {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isBot: false,
    browser: 'unknown',
    os: 'unknown',
    supportsWebP: false,
    supportsAvif: false,
    connectionSpeed: 'unknown',
  };
}

// Современная замена для deprecated User-Agent Client Hints
export function getClientHints() {
  if (!isServer && 'userAgentData' in navigator) {
    const userAgentData = (navigator as any).userAgentData;
    return {
      mobile: userAgentData?.mobile || false,
      platform: userAgentData?.platform || 'unknown',
      brands: userAgentData?.brands || [],
    };
  }
  
  // Fallback для старых браузеров
  if (!isServer) {
    return {
      mobile: userAgentPatterns.mobile.test(navigator.userAgent),
      platform: navigator.platform || 'unknown',
      brands: [],
    };
  }
  
  return {
    mobile: false,
    platform: 'unknown',
    brands: [],
  };
}
