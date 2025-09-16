/**
 * Система оптимизации изображений для улучшения LCP и производительности
 */

// Оптимизированные размеры изображений
export const imageBreakpoints = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  large: 1280,
  xl: 1920,
} as const;

// Генерация srcSet для адаптивных изображений
export const generateSrcSet = (
  basePath: string,
  sizes: number[] = [640, 768, 1024, 1280, 1920]
): string => {
  return sizes
    .map(size => `${basePath}?w=${size}&q=80 ${size}w`)
    .join(', ');
};

// Оптимальные форматы изображений
export const getOptimalImageFormat2 = (): 'avif' | 'webp' | 'jpg' => {
  if (typeof window === 'undefined') return 'webp';
  
  // Проверяем поддержку AVIF
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  try {
    const avifSupported = canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    if (avifSupported) return 'avif';
  } catch {}
  
  try {
    const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    if (webpSupported) return 'webp';
  } catch {}
  
  return 'jpg';
};

// Ленивая загрузка изображений с Intersection Observer
export const createLazyImageLoader = () => {
  if (typeof IntersectionObserver === 'undefined') {
    return null;
  }

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          const srcset = img.dataset.srcset;
          
          if (src) {
            img.src = src;
          }
          if (srcset) {
            img.srcset = srcset;
          }
          
          img.classList.remove('lazy');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );

  return imageObserver;
};

// Предзагрузка критических изображений
export const preloadCriticalImages = (imagePaths: string[]) => {
  if (typeof window === 'undefined') return;
  
  imagePaths.forEach((path) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

// Оптимизированный компонент изображения
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export const getImageProps = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: OptimizedImageProps) => {
  const format = getOptimalImageFormat2();
  const optimizedSrc = `${src}?f=${format}&q=80`;
  const srcSet = generateSrcSet(src);

  return {
    src: optimizedSrc,
    srcSet,
    alt,
    width,
    height,
    sizes,
    loading: priority ? 'eager' as const : 'lazy' as const,
    decoding: 'async' as const,
    fetchPriority: priority ? 'high' as const : 'auto' as const,
    className: `${className} ${priority ? '' : 'lazy'}`.trim(),
    style: {
      aspectRatio: width && height ? `${width} / ${height}` : undefined,
    },
  };
};

// Placeholder для изображений
export const generateImagePlaceholder = (
  width: number,
  height: number,
  color = '#f3f4f6'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Оптимизация для Core Web Vitals
export const imagePerformanceOptimizations = {
  // Предотвращение CLS
  preventLayoutShift: (img: HTMLImageElement) => {
    if (img.width && img.height) {
      img.style.aspectRatio = `${img.width} / ${img.height}`;
    }
  },

  // Оптимизация LCP
  optimizeLCP: (heroImageSrc: string) => {
    if (typeof document !== 'undefined') {
      // Предзагружаем hero изображение
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImageSrc;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    }
  },
};
