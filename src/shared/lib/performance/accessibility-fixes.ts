/**
 * Исправления для улучшения доступности (a11y) до 100%
 */

// Улучшенная поддержка клавиатурной навигации
export const keyboardNavigation = {
  // Обработка Enter и Space для кнопок
  handleButtonKeyDown: (event: React.KeyboardEvent, onClick: () => void) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      onClick();
    }
  },

  // Управление фокусом в модальных окнах
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.code === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  },
};

// Улучшенные ARIA атрибуты
export const ariaHelpers = {
  // Генерация уникальных ID для aria-describedby
  generateId: (prefix: string = 'aria'): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Объявления для скрин-ридеров
  announceToScreenReader: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Улучшенные состояния для форм
  getFormFieldAria: (
    fieldId: string,
    error?: string,
    description?: string
  ) => {
    const describedBy: string[] = [];
    
    if (error) {
      describedBy.push(`${fieldId}-error`);
    }
    if (description) {
      describedBy.push(`${fieldId}-description`);
    }

    return {
      'aria-invalid': error ? 'true' : 'false',
      'aria-describedby': describedBy.length > 0 ? describedBy.join(' ') : undefined,
    };
  },
};

// Контрастность и цвета
export const colorAccessibility = {
  // Проверка контрастности (WCAG AA: 4.5:1, AAA: 7:1)
  checkContrast: (foreground: string, background: string): boolean => {
    // Упрощенная проверка - в реальном проекте используйте библиотеку
    const fgLuminance = getLuminance(foreground);
    const bgLuminance = getLuminance(background);
    const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                    (Math.min(fgLuminance, bgLuminance) + 0.05);
    return contrast >= 4.5;
  },

  // Поддержка prefers-color-scheme
  respectColorScheme: () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  },

  // Поддержка prefers-contrast
  respectHighContrast: () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-contrast: high)').matches;
    }
    return false;
  },
};

// Вспомогательная функция для расчета яркости
function getLuminance(color: string): number {
  // Упрощенный расчет - в реальном проекте используйте полную формулу WCAG
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Поддержка reduced motion
export const motionAccessibility = {
  // Проверка предпочтений пользователя
  prefersReducedMotion: (): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  },

  // Условные анимации
  conditionalAnimation: <T>(
    animationConfig: T,
    fallbackConfig: T
  ): T => {
    return motionAccessibility.prefersReducedMotion() ? fallbackConfig : animationConfig;
  },
};

// Семантическая разметка
export const semanticHelpers = {
  // Правильные роли для интерактивных элементов
  getButtonRole: (isLink: boolean = false) => ({
    role: isLink ? undefined : 'button',
    tabIndex: 0,
  }),

  // Заголовки с правильной иерархией
  getHeadingLevel: (level: 1 | 2 | 3 | 4 | 5 | 6) => ({
    role: 'heading',
    'aria-level': level,
  }),

  // Навигационные элементы
  getNavRole: (label: string) => ({
    role: 'navigation',
    'aria-label': label,
  }),
};
