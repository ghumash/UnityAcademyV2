/**
 * Исправления для deprecated APIs и современных стандартов
 */

// Замена deprecated String.prototype.substr на substring
export const safeSubstring = (str: string, start: number, length?: number): string => {
  if (length === undefined) {
    return str.substring(start);
  }
  return str.substring(start, start + length);
};

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
export const getClientHints = () => {
  if (typeof navigator !== 'undefined' && 'userAgentData' in navigator) {
    const userAgentData = (navigator as any).userAgentData;
    return {
      mobile: userAgentData?.mobile || false,
      platform: userAgentData?.platform || 'unknown',
      brands: userAgentData?.brands || [],
    };
  }
  
  // Fallback для старых браузеров
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
    if (typeof IntersectionObserver !== 'undefined') {
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
    if (typeof ResizeObserver !== 'undefined') {
      return new ResizeObserver(callback);
    }
    return null;
  },

  // Современный способ работы с localStorage
  safeLocalStorage: {
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
  },
};
