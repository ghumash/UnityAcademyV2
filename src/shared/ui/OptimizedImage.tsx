"use client";

import React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/shared/lib";

interface OptimizedImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  className?: string;
  containerClassName?: string;
  fallback?: React.ReactNode;
  onError?: () => void;
}

/**
 * Оптимизированный компонент изображения с улучшенной производительностью
 * 
 * Особенности:
 * - Автоматическое определение размеров
 * - Ленивая загрузка по умолчанию
 * - Поддержка WebP/AVIF форматов
 * - Обработка ошибок загрузки
 * - Адаптивные размеры
 */
export function OptimizedImage({
  src,
  alt,
  priority = false,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  className,
  containerClassName,
  fallback,
  onError,
  ...props
}: OptimizedImageProps) {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleError = React.useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  }, [onError]);

  const handleLoad = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  // Если произошла ошибка и есть fallback
  if (hasError && fallback) {
    return <div className={containerClassName}>{fallback}</div>;
  }

  // Если произошла ошибка без fallback
  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground rounded-md",
          containerClassName
        )}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton loader */}
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 bg-muted animate-pulse rounded-md",
            className
          )}
          aria-hidden="true"
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onError={handleError}
        onLoad={handleLoad}
        // Оптимизации для производительности
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority && { fetchPriority: "high" as any })}
        {...props}
      />
    </div>
  );
}

/**
 * Компонент для hero изображений с высоким приоритетом
 */
export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      quality={90}
      placeholder="blur"
    />
  );
}

/**
 * Компонент для аватаров с оптимизацией
 */
interface AvatarImageProps extends OptimizedImageProps {
  size?: "sm" | "md" | "lg" | "xl";
}

export function AvatarImage({ 
  size = "md", 
  className,
  ...props 
}: AvatarImageProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  return (
    <OptimizedImage
      {...props}
      className={cn(
        "rounded-full object-cover",
        sizeClasses[size],
        className
      )}
      quality={80}
    />
  );
}

/**
 * Генерация blur placeholder для изображений
 */
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  
  // Создаем простой градиент
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#f3f4f6");
  gradient.addColorStop(1, "#e5e7eb");
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}
