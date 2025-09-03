"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** Дополнительные CSS-классы */
  className?: string;
  /** Семантический тег — по умолчанию div */
  as?: React.ElementType;
  /** Максимальная ширина (можно переопределить) */
  maxWidthClass?: string;
  /** Дочерние элементы */
  children: React.ReactNode;
}

/**
 * Универсальный контейнер для центрирования и ограничения ширины контента.
 * Поддерживает ref, семантические теги и адаптацию под SEO/a11y.
 */
export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  (
    {
      children,
      className,
      as: Tag = "div",
      maxWidthClass = "max-w-[1400px]",
      ...props
    },
    ref
  ) => {
    return (
      <Tag
        ref={ref}
        className={cn("mx-auto w-full px-4 md:px-8", maxWidthClass, className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Container.displayName = "Container";
