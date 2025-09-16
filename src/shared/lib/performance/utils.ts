/**
 * Общие утилиты для модулей производительности
 */

// Проверка серверного окружения
export const isServer = typeof window === 'undefined';

// Проверка поддержки современных API
export const browserSupport = {
  intersectionObserver: typeof IntersectionObserver !== 'undefined',
  resizeObserver: typeof ResizeObserver !== 'undefined',
  webp: () => {
    if (isServer) return false;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    try {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } catch {
      return false;
    }
  },
  avif: () => {
    if (isServer) return false;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    try {
      return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    } catch {
      return false;
    }
  },
};

// Общие паттерны User Agent
export const userAgentPatterns = {
  mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
  tablet: /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)|Android(?=.*\bTablet\b)/i,
  bot: /bot|crawler|spider|crawling/i,
  browsers: {
    chrome: /Chrome/i,
    firefox: /Firefox/i,
    safari: /Safari/i,
    edge: /Edge/i,
  },
  os: {
    windows: /Windows/i,
    macos: /Mac/i,
    linux: /Linux/i,
    android: /Android/i,
    ios: /iOS/i,
  },
};

// Безопасная работа с localStorage
export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
};

// Генерация уникальных ID
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Безопасная замена deprecated String.substr
export const safeSubstring = (str: string, start: number, length?: number): string => {
  if (length === undefined) {
    return str.substring(start);
  }
  return str.substring(start, start + length);
};

// Дебаунс для оптимизации производительности
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

// Троттлинг для оптимизации производительности
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
