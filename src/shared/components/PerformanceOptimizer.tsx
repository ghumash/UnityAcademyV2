"use client";

import { useEffect } from 'react';
import { initializePerformanceOptimizations } from '@/shared/lib/performance';

/**
 * Компонент для инициализации всех оптимизаций производительности
 */
export const PerformanceOptimizer = () => {
  useEffect(() => {
    // Инициализируем оптимизации после монтирования
    initializePerformanceOptimizations();
  }, []);

  return null; // Этот компонент не рендерит UI
};
