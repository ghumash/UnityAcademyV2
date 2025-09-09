"use client";

import { memo, useEffect, useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/shared/lib/utils";

/* === Types =============================================================== */

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;
type RasterLike = StaticImageData | string;

export interface Logo {
  id: number;
  name: string;
  /** Может прийти как SVGR-компонент, так и StaticImageData (или URL-строка) */
  img: SvgComponent | RasterLike;
}

interface LogoColumnProps {
  logos: Logo[];
  index: number;
  /** Время показа одного лого (мс). По умолчанию 2000мс. */
  cycleMs?: number;
}

/* === Utils =============================================================== */

const CYCLE_MS_DEFAULT = 2000;
const COLUMN_STAGGER_MS = 200;

function shuffleArray<T>(array: readonly T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function distributeLogos(
  allLogos: readonly Logo[],
  columnCount: number
): Logo[][] {
  if (columnCount <= 0 || allLogos.length === 0) return [];
  const shuffled = shuffleArray(allLogos);
  const cols: Logo[][] = Array.from({ length: columnCount }, () => []);

  // равномерно раскладываем
  shuffled.forEach((logo, i) => {
    cols[i % columnCount].push(logo);
  });

  // дополняем короткие колонки детерминированно (без Math.random)
  const maxLen = Math.max(...cols.map((c) => c.length));
  for (const col of cols) {
    const need = maxLen - col.length;
    if (need > 0) col.push(...shuffled.slice(0, need));
  }
  return cols;
}

/* === Render helpers ====================================================== */

function isSvgComponent(x: Logo["img"]): x is SvgComponent {
  return typeof x === "function";
}

function LogoNode({
  img,
  className,
}: {
  img: Logo["img"];
  className?: string;
}) {
  if (isSvgComponent(img)) {
    const Svg = img;
    return (
      <Svg
        className={className}
        focusable="false"
        aria-hidden="true"
        role="img"
      />
    );
  }

  // Raster / URL case → next/image
  return (
    <Image
      src={img}
      alt="" // декоративно
      width={128}
      height={128}
      className={cn("object-contain", className)}
      // sizes: логотип в пределах контейнера, адаптивность решаем классами
      sizes="(min-width:768px) 128px, 80px"
      priority={false}
    />
  );
}

/* === Column ============================================================= */

const LogoColumn = memo(function LogoColumn({
  logos,
  index,
  cycleMs = CYCLE_MS_DEFAULT,
}: LogoColumnProps) {
  const reduceMotion = useReducedMotion();
  const [idx, setIdx] = useState(0);

  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduceMotion || logos.length === 0) return;

    setIdx(0);
    if (delayRef.current) clearTimeout(delayRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const start = () => {
      intervalRef.current = setInterval(() => {
        setIdx((v) => (v + 1) % logos.length);
      }, cycleMs);
    };

    const delay = index * COLUMN_STAGGER_MS;
    if (delay > 0) delayRef.current = setTimeout(start, delay);
    else start();

    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reduceMotion, logos.length, index, cycleMs]);

  if (logos.length === 0) return null;

  const current = logos[idx % logos.length];

  return (
    <motion.div
      className="relative h-14 w-24 overflow-hidden md:h-24 md:w-48"
      initial={reduceMotion ? false : { opacity: 0, y: 50 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? undefined
          : {
              delay: index * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }
      }
      aria-hidden="true" // декоративный блок
    >
      {reduceMotion ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <LogoNode
            img={current.img}
            className="h-20 w-20 max-h-[80%] max-w-[80%] md:h-32 md:w-32"
          />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.id}-${idx}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              y: "-20%",
              opacity: 0,
              filter: "blur(6px)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 1,
              bounce: 0.2,
              duration: 0.5,
            }}
          >
            <LogoNode
              img={current.img}
              className="h-20 w-20 max-h-[80%] max-w-[80%] md:h-32 md:w-32"
            />
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
});

/* === Carousel =========================================================== */

export interface LogoCarouselProps {
  logos: Logo[];
  columnCount?: number;
  /** Время показа одного лого (мс). По умолчанию 2000мс. */
  cycleMs?: number;
  className?: string;
}

export function LogoCarousel({
  logos,
  columnCount = 2,
  cycleMs = CYCLE_MS_DEFAULT,
  className,
}: LogoCarouselProps) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([]);

  useEffect(() => {
    setLogoSets(distributeLogos(logos, columnCount));
  }, [logos, columnCount]);

  if (logoSets.length === 0) {
    // SSR safe fallback
    return (
      <div className={cn("flex gap-4", className)}>
        {Array.from({ length: columnCount }, (_, i) => (
          <div
            key={i}
            className="relative h-14 w-24 md:h-24 md:w-48 rounded bg-neutral-100 dark:bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex gap-4", className)}>
      {logoSets.map((col, i) => (
        <LogoColumn key={i} logos={col} index={i} cycleMs={cycleMs} />
      ))}
    </div>
  );
}

export { LogoColumn };
