"use client";

import { Sparkles } from "lucide-react";
import { Container, Section } from "@/shared/ui/custom";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

// Тип для элемента блока
export type ContentBlockItem = {
  icon?: React.ReactNode;
  title?: string;
  description?: ReactNode;
  key?: React.Key;
};

// Тип для блока контента
export type ContentBlock = {
  title?: string;
  headerIcon?: React.ReactNode;
  items: ContentBlockItem[];
  key?: React.Key;
};

// Основные пропсы компонента
export type ContentSectionProps = {
  className?: string;
  blocks: ContentBlock[];
  title?: {
    label: string;
    className?: string;
  };
  badge?: {
    icon?: React.ReactNode;
    text: string;
  };
  gridCols?: {
    sm?: number;
    lg?: number;
  };
  itemsGridCols?: {
    sm?: number;
    lg?: number;
  };
};

// Вспомогательная функция для определения количества колонок
const getGridCols = (
  blocksCount: number,
  gridCols?: { sm?: number; lg?: number }
) => {
  if (gridCols) {
    return {
      sm: gridCols.sm || Math.min(blocksCount, 2),
      lg: gridCols.lg || Math.min(blocksCount, 3),
    };
  }

  // Автоматическое определение колонок на основе количества блоков
  if (blocksCount === 1) return { sm: 1, lg: 1 };
  if (blocksCount === 2) return { sm: 2, lg: 2 };
  if (blocksCount === 3) return { sm: 2, lg: 3 };
  if (blocksCount === 4) return { sm: 2, lg: 2 };
  return { sm: 2, lg: 3 }; // По умолчанию для 5+ блоков
};

// Компонент для отображения списка элементов блока
function ItemList({
  items,
  itemsGridCols,
}: {
  items: ContentBlockItem[];
  itemsGridCols?: { sm?: number; lg?: number };
}) {
  // Генерируем классы для сетки элементов динамически
  const getItemsGridClasses = () => {
    if (!itemsGridCols) {
      return "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1";
    }

    const baseClasses = "grid gap-2";
    const smClass = itemsGridCols.sm
      ? `sm:grid-cols-${itemsGridCols.sm}`
      : "sm:grid-cols-2";
    const lgClass = itemsGridCols.lg
      ? `lg:grid-cols-${itemsGridCols.lg}`
      : "lg:grid-cols-1";

    return `${baseClasses} grid-cols-1 ${smClass} ${lgClass}`;
  };

  return (
    <ul className={getItemsGridClasses()}>
      {items.map((item, i) => {
        return (
          <li
            key={item.key || i}
            className="
              group relative flex items-start
              overflow-hidden rounded-2xl border border-white/10
              p-3 shadow-2xl backdrop-blur-xl transition
              hover:border-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]
              flex-col items-center
            "
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute inset-0 from-white/5 to-white/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700" />
              <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-white/5 blur-xl opacity-0 group-hover:opacity-60 group-hover:scale-125 transition duration-700 ease-out" />
              <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg opacity-0 group-hover:opacity-50 group-hover:scale-125 transition duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 ease-out" />
            </div>

            <div className="flex items-center gap-2">
              {item.icon && (
                <div className="transform group-hover:rotate-180 transition-transform duration-700">
                  <div className="mt-0.5 size-5 text-primary flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
              )}
              {item.title && (
                <p className="text-md font-medium">{item.title}</p>
              )}
            </div>
            <div>
              {item.description && (
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// Основной переиспользуемый компонент
export const ContentSection = ({
  className,
  blocks,
  title,
  badge,
  gridCols,
  itemsGridCols,
}: ContentSectionProps) => {
  const { sm, lg } = getGridCols(blocks?.length || 0, gridCols);

  // Генерируем классы для сетки динамически
  const gridClasses = cn("grid gap-8 p-6 sm:p-8 lg:gap-10", {
    "sm:grid-cols-1": sm === 1,
    "sm:grid-cols-2": sm === 2,
    "sm:grid-cols-3": sm === 3,
    "lg:grid-cols-1": lg === 1,
    "lg:grid-cols-2": lg === 2,
    "lg:grid-cols-3": lg === 3,
    "lg:grid-cols-4": lg === 4,
  });

  return (
    <Section as="section" aria-label="Content Section" className={className}>
      <Container>
        {/* Опциональный заголовок */}
        {title?.label && (
          <h2
            id="features-heading"
            className={cn(
              "mb-8 sm:mb-10 text-2xl sm:text-3xl font-semibold tracking-tight text-white",
              title.className
            )}
          >
            {title.label}
          </h2>
        )}

        <div className="relative z-10 rounded-2xl border bg-background/80 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {/* Опциональный бейдж */}
          {badge && (
            <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-md border bg-card px-2.5 py-1 text-[10px] text-card-foreground shadow-sm sm:text-xs">
              <div className="flex items-center gap-1.5">
                {badge.icon || (
                  <Sparkles className="size-3" aria-hidden="true" />
                )}
                <span>{badge.text}</span>
              </div>
            </div>
          )}

          <div className={gridClasses}>
            {blocks?.map((block, index) => (
              <article
                key={block.key || index}
                aria-labelledby={`content-block-${index}`}
                className="space-y-3"
              >
                {/* Опциональный заголовок блока */}
                {block.title && (
                  <header className="flex items-center gap-2">
                    {block.headerIcon && (
                      <div className="size-4 text-primary flex items-center justify-center">
                        {block.headerIcon}
                      </div>
                    )}
                    <h2
                      id={`content-block-${index}`}
                      className="text-base font-semibold"
                    >
                      {block.title}
                    </h2>
                  </header>
                )}
                <ItemList items={block.items} itemsGridCols={itemsGridCols} />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
