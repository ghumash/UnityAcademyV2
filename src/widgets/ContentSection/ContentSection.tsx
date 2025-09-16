"use client";

import { memo, type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { Container, Section } from "@/shared/ui/custom";
import { cn } from "@/shared/lib/utils";
import dynamic from "next/dynamic";

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

// Безопасные классы сетки для Tailwind (без шаблонных строк)
function gridColsClasses(sm?: number, lg?: number) {
  return cn(
    sm === 1 && "sm:grid-cols-1",
    sm === 2 && "sm:grid-cols-2",
    sm === 3 && "sm:grid-cols-3",
    sm === 4 && "sm:grid-cols-4",
    lg === 1 && "lg:grid-cols-1",
    lg === 2 && "lg:grid-cols-2",
    lg === 3 && "lg:grid-cols-3",
    lg === 4 && "lg:grid-cols-4"
  );
}

// Компонент для отображения списка элементов блока
function ItemList({
  items,
  itemsGridCols,
  itemClassName,
}: {
  items: ContentBlockItem[];
  itemsGridCols?: { sm?: number; lg?: number };
  itemClassName?: string;
}) {
  const sm = itemsGridCols?.sm ?? 2;
  const lg = itemsGridCols?.lg ?? 1;

  return (
    <ul className={cn("grid grid-cols-1 gap-2", gridColsClasses(sm, lg))}>
      {items.map((item, i) => (
        <li
          key={item.key || i}
          className={cn(
            "group relative flex flex-col items-start overflow-hidden rounded-2xl border p-3",
            "bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60",
            "shadow-2xl transition-all duration-500",
            "hover:shadow-primary/20 hover:border-primary/40",
            itemClassName
          )}
        >
          {/* background ornaments */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div
              className={cn(
                "absolute inset-0 rounded-2xl opacity-60 transition-opacity duration-500",
                "bg-gradient-to-b from-foreground/5 to-foreground/10",
                "group-hover:opacity-80"
              )}
            />
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-foreground/10 blur-3xl opacity-30 transition-all duration-700 group-hover:scale-110 group-hover:opacity-50" />
            <div className="absolute top-10 left-10 h-16 w-16 rounded-full bg-foreground/10 blur-xl opacity-0 transition duration-700 ease-out group-hover:scale-125 group-hover:opacity-60" />
            <div className="absolute bottom-16 right-16 h-12 w-12 rounded-full bg-foreground/10 blur-lg opacity-0 transition duration-700 ease-out group-hover:scale-125 group-hover:opacity-50" />
            <div className="absolute inset-0 -skew-x-12 translate-x-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent transition-transform duration-1000 ease-out group-hover:-translate-x-[200%]" />
          </div>

          <div className="relative z-10 flex items-center gap-2">
            {item.icon && (
              <div className="transition-transform duration-700 group-hover:rotate-180">
                <div className="mt-0.5 flex size-5 items-center justify-center text-primary">
                  {item.icon}
                </div>
              </div>
            )}
            {item.title && (
              <p className="text-md font-medium text-foreground">
                {item.title}
              </p>
            )}
          </div>

          {item.description && (
            <p className="relative z-10 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

const ContentSectionComponent = memo(
  ({
    config,
    className,
    gridCols = { sm: 1, lg: 3 },
    itemsGridCols,
    itemClassName,
  }: ContentSectionProps) => {
    const { sm, lg } = getGridCols(config.blocks?.length || 0, gridCols);

    return (
      <Section as="section" aria-label="Content" className={className}>
        <Container>
          {config.title && (
            <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-foreground sm:mb-10 sm:text-3xl">
              {config.title}
            </h2>
          )}

          <div className="relative z-10 rounded-2xl border bg-card/80 shadow-md backdrop-blur supports-[backdrop-filter]:bg-card/60">
            {/* Опциональный бейдж */}
            {config.badge && (
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-md border bg-card px-2.5 py-1 text-[10px] text-card-foreground shadow-sm sm:text-xs">
                <div className="flex items-center gap-1.5">
                  {config.badge.icon ?? (
                    <Sparkles className="size-3" aria-hidden="true" />
                  )}
                  <span>{config.badge.text}</span>
                </div>
              </div>
            )}

            <div
              className={cn(
                "grid gap-8 p-6 sm:p-8 lg:gap-10",
                gridColsClasses(sm, lg)
              )}
            >
              {config.blocks?.map((block: ContentBlock, index: number) => (
                <article
                  key={block.key || index}
                  aria-labelledby={`content-block-${index}`}
                  className="space-y-3"
                >
                  {/* Опциональный заголовок блока */}
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

                  <ItemList
                    items={block.items}
                    itemsGridCols={itemsGridCols}
                    itemClassName={itemClassName}
                  />
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
