/**
 * Исправления для deprecated APIs и современных стандартов
 */

import { browserSupport } from './utils';
// safeSubstring экспортируется из utils.ts

// Современная замена для deprecated document.domain
export const getOrigin = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

// Замена deprecated event.keyCode на event.code
export const getKeyCode = (event: KeyboardEvent): string => {
  return event.code || event.key;
};

// Современная замена для deprecated XMLHttpRequest
export const modernFetch = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      ...options,
      // Используем современные заголовки
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// Замена deprecated navigator.userAgent на User-Agent Client Hints
// DEPRECATED: используйте getClientHints из device-detection.ts
export const getClientHints = () => {
  console.warn('getClientHints is deprecated. Use getClientHints from device-detection.ts');
  if (typeof navigator !== 'undefined' && 'userAgentData' in navigator) {
    const userAgentData = (navigator as any).userAgentData;
    return {
      mobile: userAgentData?.mobile || false,
      platform: userAgentData?.platform || 'unknown',
      brands: userAgentData?.brands || [],
    };
  }
  
  return {
    mobile: /Mobi|Android/i.test(navigator?.userAgent || ''),
    platform: navigator?.platform || 'unknown',
    brands: [],
  };
};

// Современная замена для deprecated document.write
export const safeInjectHTML = (element: HTMLElement, html: string) => {
  element.innerHTML = '';
  element.insertAdjacentHTML('beforeend', html);
};

// Замена deprecated synchronous XMLHttpRequest
export const asyncDataLoader = async <T>(
  loader: () => Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    return await loader();
  } catch (error) {
    console.warn('Data loading failed, using fallback:', error);
    return fallback;
  }
};

// Современные Web APIs вместо deprecated
export const modernAPIs = {
  // Intersection Observer вместо scroll events
  createIntersectionObserver: (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) => {
    if (browserSupport.intersectionObserver) {
      return new IntersectionObserver(callback, {
        rootMargin: '50px',
        threshold: 0.1,
        ...options,
      });
    }
    return null;
  },

  // ResizeObserver вместо window.resize
  createResizeObserver: (callback: ResizeObserverCallback) => {
    if (browserSupport.resizeObserver) {
      return new ResizeObserver(callback);
    }
    return null;
  },
};
