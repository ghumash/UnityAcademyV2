"use client";

import React, { Suspense, lazy } from "react";
import { useIntersectionObserver } from "@/shared/hooks";

/**
 * Компонент для ленивой загрузки с Intersection Observer
 */
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export function LazyWrapper({
  children,
  fallback = <div className="h-32 animate-pulse bg-muted rounded-md" />,
  rootMargin = "100px",
  threshold = 0.1,
  className,
}: LazyWrapperProps) {
  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin,
    threshold,
  });

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}

/**
 * Ленивые компоненты для тяжелых виджетов
 */
export const LazyVideoCardsCarousel = lazy(
  () => import("@/widgets/VideoCardsCarousel/VideoCardsCarousel").then(module => ({ default: module.VideoCardsCarousel }))
);

export const LazyFaqAccordion = lazy(
  () => import("@/widgets/FaqAccordion/FaqAccordion").then(module => ({ default: module.FaqAccordion }))
);

export const LazyMaps = lazy(
  () => import("@/widgets/Maps/Maps").then(module => ({ default: module.Maps }))
);

export const LazySmartForm = lazy(
  () => import("@/widgets/SmartForm/SmartForm").then(module => ({ default: module.SmartForm }))
);

export const LazyPhotoGallery = lazy(
  () => import("@/widgets/PhotoGallery/PhotoGallery").then(module => ({ default: module.PhotoGallery }))
);

/**
 * Предзагрузка критических ресурсов
 */
export function preloadCriticalResources() {
  // Предзагружаем логотип
  const logoLink = document.createElement("link");
  logoLink.rel = "preload";
  logoLink.href = "/images/logos/logo.svg";
  logoLink.as = "image";
  document.head.appendChild(logoLink);

  // Предзагружаем критические шрифты если есть
  const fontLinks = document.querySelectorAll('link[rel="preconnect"]');
  fontLinks.forEach((link) => {
    if (link.getAttribute("href")?.includes("fonts")) {
      const preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.href = link.getAttribute("href") || "";
      preloadLink.as = "font";
      preloadLink.crossOrigin = "anonymous";
      document.head.appendChild(preloadLink);
    }
  });
}

/**
 * Оптимизация изображений на клиенте
 */
export function optimizeImages() {
  const images = document.querySelectorAll("img[data-optimize]");
  
  images.forEach((img) => {
    const imageElement = img as HTMLImageElement;
    
    // Добавляем loading="lazy" если не установлено
    if (!imageElement.loading) {
      imageElement.loading = "lazy";
    }
    
    // Добавляем decoding="async"
    if (!imageElement.decoding) {
      imageElement.decoding = "async";
    }
    
    // Устанавливаем fetchpriority для hero изображений
    if (imageElement.dataset.priority === "high") {
      imageElement.fetchPriority = "high";
    }
  });
}

/**
 * Хук для определения медленного соединения
 */
export function useSlowConnection() {
  const [isSlowConnection, setIsSlowConnection] = React.useState(false);

  React.useEffect(() => {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      const checkConnection = () => {
        // Считаем соединение медленным если effectiveType 2g или 3g
        const slowTypes = ["slow-2g", "2g", "3g"];
        setIsSlowConnection(slowTypes.includes(connection.effectiveType));
      };

      checkConnection();
      connection.addEventListener("change", checkConnection);

      return () => {
        connection.removeEventListener("change", checkConnection);
      };
    }
  }, []);

  return isSlowConnection;
}

/**
 * Компонент для адаптивной загрузки контента
 */
interface AdaptiveContentProps {
  lightContent: React.ReactNode;
  fullContent: React.ReactNode;
  forceLight?: boolean;
}

export function AdaptiveContent({
  lightContent,
  fullContent,
  forceLight = false,
}: AdaptiveContentProps) {
  const isSlowConnection = useSlowConnection();
  const [userPreference, setUserPreference] = React.useState<boolean | null>(null);

  // Проверяем предпочтения пользователя из localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem("prefer-light-content");
    if (saved !== null) {
      setUserPreference(JSON.parse(saved));
    }
  }, []);

  const shouldShowLight = forceLight || isSlowConnection || userPreference === true;

  return (
    <div>
      {shouldShowLight ? lightContent : fullContent}
      
      {/* Кнопка переключения для пользователя */}
      {!forceLight && (
        <button
          onClick={() => {
            const newPreference = !userPreference;
            setUserPreference(newPreference);
            localStorage.setItem("prefer-light-content", JSON.stringify(newPreference));
          }}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label={shouldShowLight ? "Показать полную версию" : "Показать облегченную версию"}
        >
          {shouldShowLight ? "📱 Полная версия" : "⚡ Быстрая версия"}
        </button>
      )}
    </div>
  );
}
