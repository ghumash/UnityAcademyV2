// Динамические импорты для библиотек с условной загрузкой

// Ленивый импорт motion/react только при необходимости анимаций
export const loadFramerMotion = async () => {
  const { motion, AnimatePresence, useReducedMotion } = await import("motion/react");
  return { motion, AnimatePresence, useReducedMotion };
};

// Ленивый импорт date-fns только при работе с датами
export const loadDateFns = async () => {
  const { format, parseISO, isValid } = await import("date-fns");
  return { format, parseISO, isValid };
};

// Ленивый импорт react-hook-form только для форм
export const loadReactHookForm = async () => {
  const { useForm, Controller } = await import("react-hook-form");
  const { zodResolver } = await import("@hookform/resolvers/zod");
  return { useForm, Controller, zodResolver };
};

// Ленивый импорт Tabler icons только при необходимости
export const loadTablerIcons = async (iconNames: string[]) => {
  const iconImports = iconNames.map(name => 
    import("@tabler/icons-react").then(module => ({ [name]: module[name] }))
  );
  const icons = await Promise.all(iconImports);
  return Object.assign({}, ...icons);
};

// Проверка поддержки браузером современных возможностей
export const getBrowserCapabilities = () => {
  if (typeof window === "undefined") return {};
  
  return {
    supportsWebP: (() => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    })(),
    supportsAvif: (() => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0;
    })(),
    supportsIntersectionObserver: "IntersectionObserver" in window,
    supportsResizeObserver: "ResizeObserver" in window,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    isTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    connectionSpeed: (navigator as any).connection?.effectiveType || "unknown"
  };
};

// Адаптивная загрузка ресурсов в зависимости от соединения
export const shouldLoadHeavyResources = () => {
  if (typeof window === "undefined") return true;
  
  const connection = (navigator as any).connection;
  if (!connection) return true;
  
  // Не загружаем тяжелые ресурсы на медленном соединении
  const slowConnections = ["slow-2g", "2g"];
  return !slowConnections.includes(connection.effectiveType);
};

// Предзагрузка критических ресурсов
export const preloadCriticalResources = () => {
  if (typeof window === "undefined") return;
  
  // Предзагрузка шрифтов
  const fontPreloads = [
    "/fonts/inter-var.woff2",
    "/fonts/inter-var-italic.woff2"
  ];
  
  fontPreloads.forEach(href => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/woff2";
    link.crossOrigin = "anonymous";
    link.href = href;
    document.head.appendChild(link);
  });
  
  // Предзагрузка критических изображений
  const imagePreloads = [
    "/arda.jpg",
    "/globe.svg"
  ];
  
  imagePreloads.forEach(href => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    document.head.appendChild(link);
  });
};
