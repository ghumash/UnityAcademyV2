"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
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

// Config для ContentSection
export type ContentSectionConfig = {
  blocks: readonly ContentBlock[];
  badge?: {
    icon?: React.ReactNode;
    text: string;
  };
  title?: string;
};

// Основные пропсы компонента
export type ContentSectionProps = {
  config: ContentSectionConfig;
  className?: string;
  gridCols?: {
    sm?: number;
    lg?: number;
  };
  itemClassName?: string;
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

  if (blocksCount === 1) return { sm: 1, lg: 1 };
  if (blocksCount === 2) return { sm: 2, lg: 2 };
  if (blocksCount === 3) return { sm: 2, lg: 3 };
  if (blocksCount === 4) return { sm: 2, lg: 2 };
  return { sm: 2, lg: 3 };
};

// Компонент списка элементов
function ItemList({
  items,
  itemsGridCols,
}: {
  items: ContentBlockItem[];
  itemsGridCols?: { sm?: number; lg?: number };
}) {
  const getItemsGridClasses = () => {
    if (!itemsGridCols) {
      return "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1";
    }
    const base = "grid gap-2";
    const sm = itemsGridCols.sm ? `sm:grid-cols-${itemsGridCols.sm}` : "sm:grid-cols-2";
    const lg = itemsGridCols.lg ? `lg:grid-cols-${itemsGridCols.lg}` : "lg:grid-cols-1";
    return `${base} grid-cols-1 ${sm} ${lg}`;
  };

  return (
    <ul className={getItemsGridClasses()}>
      {items.map((item, i) => {
        return (
          <li
            key={item.key || i}
            className="
              group relative flex items-start
              overflow-hidden rounded-2xl border-2 border-border/20 bg-card/50
              p-3 shadow-sm backdrop-blur-sm transition-all duration-300
              hover:border-primary/30 hover:shadow-md hover:bg-card
              focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/40
              dark:border-white/10 dark:bg-card/30 dark:shadow-lg dark:shadow-black/5
              dark:hover:border-primary/40 dark:hover:shadow-xl dark:hover:shadow-black/10
              flex-col items-center
            "
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500 dark:from-primary/10 dark:to-primary/5" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 dark:from-primary/20" />
              <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-primary/5 blur-xl opacity-0 group-hover:opacity-60 group-hover:scale-125 transition duration-700 ease-out dark:bg-primary/15" />
              <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-primary/5 blur-lg opacity-0 group-hover:opacity-50 group-hover:scale-125 transition duration-700 ease-out dark:bg-primary/15" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 ease-out dark:via-primary/10" />
            </div>

            <div className="relative z-10 flex items-center gap-2">
              {item.icon && (
                <div className="transform transition-transform duration-700 group-hover:rotate-180">
                  <div className="mt-0.5 flex size-5 items-center justify-center text-primary">
                    {item.icon}
                  </div>
                </div>
              )}
              {item.title && (
                <p className="text-md font-medium text-foreground">{item.title}</p>
              )}
            </div>

            {item.description && (
              <p className="relative z-10 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// Основной компонент
const ContentSectionComponent = memo(
  ({
    config,
    className,
    gridCols = { sm: 1, lg: 3 },
    itemsGridCols,
  }: ContentSectionProps) => {
    const { sm, lg } = getGridCols(config.blocks?.length || 0, gridCols);

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
          {config.title && (
            <h2
              id="features-heading"
              className={cn(
                "mb-8 sm:mb-10 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-center",
              )}
            >
              {config.title}
            </h2>
          )}

          <div className="relative z-10 rounded-2xl border-2 border-border/20 bg-card shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-card dark:shadow-lg dark:shadow-black/5">
            {/* Опциональный бейдж */}
            {config.badge && (
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-border/20 bg-card px-2.5 py-1 text-[10px] text-card-foreground shadow-sm dark:border-white/10 dark:bg-card sm:text-xs">
                <div className="flex items-center gap-1.5">
                  {config.badge.icon || (
                    <Sparkles className="size-3" aria-hidden="true" />
                  )}
                  <span>{config.badge.text}</span>
                </div>
              </div>
            )}

            <div className={gridClasses}>
              {config.blocks?.map((block: ContentBlock, index: number) => (
                <article
                  key={block.key || index}
                  aria-labelledby={`content-block-${index}`}
                  className="space-y-3"
                >
                  {block.title && (
                    <header className="flex items-center gap-2">
                      {block.headerIcon && (
                        <div className="flex size-4 items-center justify-center text-primary">
                          {block.headerIcon}
                        </div>
                      )}
                      <h3
                        id={`content-block-${index}`}
                        className="text-base font-semibold text-foreground"
                      >
                        {block.title}
                      </h3>
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
  }
);

export const ContentSection = dynamic(
  () => Promise.resolve(ContentSectionComponent),
  { ssr: false }
);
