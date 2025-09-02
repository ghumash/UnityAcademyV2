"use client";

import * as React from "react";
import { GlowingEffect } from "@/shared/ui/lib/glowing-effect";

// Типы данных
export type GridItemData = {
  /** Utility-классы для расположения элемента на сетке (можно не указывать — возьмём из defaults) */
  area?: string;
  /** Иконка/любой React-узел слева в карточке */
  icon?: React.ReactNode;
  /** Заголовок */
  title: string;
  /** Текст/описание (допускается ReactNode, можно <b>/<strong>) */
  description: React.ReactNode;
  /** Произвольный key — если нужен стабильный */
  key?: React.Key;
};

export type GlowingEffectOptions = Partial<{
  blur: number;
  borderWidth: number;
  spread: number;
  glow: boolean;
  disabled: boolean;
  proximity: number;
  inactiveZone: number;
}>;

export type GlowingGridProps = {
  /** Данные карточек */
  items: GridItemData[];
  /** Переопределение настроек свечения для всех карточек */
  glow?: GlowingEffectOptions;
  /** Классы для контейнера <ul> */
  className?: string;
  /** Классы для <li> */
  itemClassName?: string;
  /** Классы для внутренней карточки */
  cardClassName?: string;
  /** Классы для обёртки иконки */
  iconWrapperClassName?: string;
};

// Значения по умолчанию для GlowingEffect — повторяют твои
const DEFAULT_GLOW: Required<GlowingEffectOptions> = {
  blur: 0,
  borderWidth: 3,
  spread: 80,
  glow: true,
  disabled: false,
  proximity: 64,
  inactiveZone: 0.01,
};

// Шаблонная раскладка на 5 карточек (как у тебя сейчас)
const DEFAULT_AREAS_5 = [
  "md:[grid-area:1/1/2/7]  xl:[grid-area:1/1/2/5]",
  "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
  "md:[grid-area:2/1/3/7]  xl:[grid-area:1/5/3/8]",
  "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
  "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
];

/** Главный компонент — данные и настройки приходят снаружи */
export function GlowingGrid({
  items,
  glow,
  className,
  itemClassName,
  cardClassName,
  iconWrapperClassName,
}: GlowingGridProps) {
  const cfg = { ...DEFAULT_GLOW, ...(glow ?? {}) };

  // Если area у элемента не задана — берём дефолты (для первых 5)
  const withAreas = items.map((it, i) => ({
    ...it,
    area: it.area ?? (i < DEFAULT_AREAS_5.length ? DEFAULT_AREAS_5[i] : ""),
  }));

  return (
    <ul
      className={
        className ??
        "grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2"
      }
    >
      {withAreas.map((it, idx) => (
        <GridItem
          key={it.key ?? idx}
          area={it.area ?? ""}
          icon={it.icon}
          title={it.title}
          description={it.description}
          glow={cfg}
          itemClassName={itemClassName}
          cardClassName={cardClassName}
          iconWrapperClassName={iconWrapperClassName}
        />
      ))}
    </ul>
  );
}

type GridItemProps = {
  area: string;
  icon?: React.ReactNode;
  title: string;
  description: React.ReactNode;
  glow: Required<GlowingEffectOptions>;
  itemClassName?: string;
  cardClassName?: string;
  iconWrapperClassName?: string;
};

const GridItem = ({
  area,
  icon,
  title,
  description,
  glow,
  itemClassName,
  cardClassName,
  iconWrapperClassName,
}: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area} ${itemClassName ?? ""}`}>
      <div
        className={`relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 ${cardClassName ?? ""}`}
      >
        {/* Пробрасываем внешние настройки свечения */}
        <GlowingEffect {...(glow as any)} />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            {icon ? (
              <div
                className={`w-fit rounded-lg border border-gray-600 p-2 ${iconWrapperClassName ?? ""}`}
              >
                {icon}
              </div>
            ) : null}
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
