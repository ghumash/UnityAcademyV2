"use client";

import * as React from "react";
import type { ReactNode, ElementType } from "react";
import { cn } from "@/shared/lib/utils";

type Padding = "none" | "sm" | "md" | "lg";

const paddingClasses: Record<Padding, string> = {
  none: "",
  sm: "py-6 md:py-8",
  md: "py-10 md:py-14",
  lg: "py-14 md:py-20",
};

type Props<T extends ElementType> = {
  children?: ReactNode;
  className?: string;
  as?: T;
  id?: string;
  /** Контроль вертикальных отступов (по умолчанию md) */
  padding?: Padding;
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  "as" | "children" | "className" | "id"
>;

/**
 * Универсальная секция с поддержкой ref и семантического тега
 */
const Section = React.forwardRef<HTMLElement, Props<ElementType>>(
  (
    { children, className, as: Tag = "section", id, padding = "md", ...rest },
    ref
  ) => {
    return (
      <Tag
        id={id}
        ref={ref as any}
        className={cn(paddingClasses[padding as Padding], className)}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

Section.displayName = "Section";

export { Section };
