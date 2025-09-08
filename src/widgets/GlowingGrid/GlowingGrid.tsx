"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { GlowingEffect } from "@/shared/ui/lib";
import { Container, Section } from "@/shared/ui/custom";
import { cn } from "@/shared/lib";

export type GridItemData = {
  area?: string;
  icon?: React.ReactNode;
  title: string;
  description: React.ReactNode;
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
  items: GridItemData[];
  glow?: GlowingEffectOptions;
  className?: string;
  itemClassName?: string;
  cardClassName?: string;
  iconWrapperClassName?: string;
};

const DEFAULT_GLOW: Required<GlowingEffectOptions> = {
  blur: 0,
  borderWidth: 3,
  spread: 80,
  glow: true,
  disabled: false,
  proximity: 64,
  inactiveZone: 0.01,
};

/** Устойчивые раскладки для разных количеств карточек */
const DEFAULT_AREAS: Record<number, string[]> = {
  5: [
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-8",
    "md:col-span-12 xl:col-span-12",
  ],
  6: [
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-8",
    "md:col-span-6 xl:col-span-6",
    "md:col-span-6 xl:col-span-6",
  ],
  7: [
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-6",
    "md:col-span-6 xl:col-span-6",
    "md:col-span-12 xl:col-span-12",
  ],
  8: [
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-6",
    "md:col-span-6 xl:col-span-6",
    "md:col-span-6 xl:col-span-6",
    "md:col-span-6 xl:col-span-6",
  ],
  9: [
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-6",
    "md:col-span-6 xl:col-span-6",
    "md:col-span-12 xl:col-span-12",
  ],
  10: [
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-3",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-4",
    "md:col-span-6 xl:col-span-6",
    "md:col-span-6 xl:col-span-6",
    "md:col-span-12 xl:col-span-12",
  ],
};

export function GlowingGrid({
  items,
  glow,
  className,
  itemClassName,
  cardClassName,
  iconWrapperClassName,
}: GlowingGridProps) {
  const reduceMotion = useReducedMotion();

  const mergedGlow = React.useMemo(() => {
    const cfg = { ...DEFAULT_GLOW, ...(glow ?? {}) };
    return reduceMotion ? { ...cfg, disabled: true, glow: false } : cfg;
  }, [glow, reduceMotion]);

  const layout = React.useMemo(
    () => DEFAULT_AREAS[items.length] ?? [],
    [items.length]
  );

  const withAreas = React.useMemo(
    () =>
      items.map((it, i) => ({
        ...it,
        area: it.area ?? layout[i] ?? "md:col-span-6 xl:col-span-4",
      })),
    [items, layout]
  );

  if (!withAreas.length) return null;

  return (
    <Section>
      <Container className="mx-auto max-w-screen-2xl">
        <ul
          className={cn(
            "grid grid-cols-1 auto-rows-[minmax(14rem,auto)] gap-4 md:grid-cols-12 lg:gap-6",
            className
          )}
        >
          {withAreas.map((it, idx) => (
            <GridItem
              key={it.key ?? `${it.title}-${idx}`}
              area={it.area ?? ""}
              icon={it.icon}
              title={it.title}
              description={it.description}
              glow={mergedGlow}
              itemClassName={itemClassName}
              cardClassName={cardClassName}
              iconWrapperClassName={iconWrapperClassName}
            />
          ))}
        </ul>
      </Container>
    </Section>
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

const GridItem = React.memo(function GridItem({
  area,
  icon,
  title,
  description,
  glow,
  itemClassName,
  cardClassName,
  iconWrapperClassName,
}: GridItemProps) {
  const titleId = React.useId();
  const descId = React.useId();

  const shouldRenderGlow = !(glow.disabled && !glow.glow);

  return (
    <li className={cn("list-none min-h-[14rem]", area, itemClassName)}>
      <article
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={cn(
          "relative h-full rounded-2xl border p-2 outline-none md:rounded-3xl md:p-3 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-neutral-400 dark:focus-within:ring-neutral-600",
          cardClassName
        )}
      >
        {shouldRenderGlow ? (
          <GlowingEffect
            {...(glow as unknown as React.ComponentProps<typeof GlowingEffect>)}
          />
        ) : null}

        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-start gap-3">
            {icon ? (
              <div
                className={cn(
                  "w-fit rounded-lg border border-gray-600 p-2",
                  iconWrapperClassName
                )}
              >
                {icon}
              </div>
            ) : null}

            <div className="space-y-3">
              <h3
                id={titleId}
                className="text-balance -tracking-4 font-sans text-xl font-semibold text-black md:text-2xl dark:text-white"
              >
                {title}
              </h3>

              {/* ВАЖНО: div вместо p, чтобы поддержать списки/блоки и избежать <ul> внутри <p> */}
              <div
                id={descId}
                className="font-sans text-sm text-black md:text-base dark:text-neutral-400 [&_b]:font-semibold [&_strong]:font-semibold"
              >
                {description}
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
});
