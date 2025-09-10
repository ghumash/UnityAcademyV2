"use client";
import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useId,
  useCallback,
  type JSX,
} from "react";
import { motion, useReducedMotion } from "motion/react";

type TextHoverEffectProps = {
  text: string;
  /** seconds for mask follow animation */
  duration?: number;
  /** Семантический тег-обёртка: можно передать 'h1' для заголовка страницы */
  as?: keyof JSX.IntrinsicElements;
  /** Абсолютный радиус круга в координатах viewBox (px). Приоритетнее revealRatio. */
  revealRadius?: number;
  /** Доля от меньшей стороны текста для расчёта радиуса. По умолчанию 0.7 */
  revealRatio?: number;
  /** Минимальный радиус (px в viewBox). По умолчанию 8 */
  minRevealRadius?: number;
  /** Мягкость края круга (px в viewBox). 0 — жёсткий край. По умолчанию 12. */
  feather?: number;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export const TextHoverEffect: React.FC<TextHoverEffectProps> = ({
  text,
  duration = 0,
  as: Tag = "p",
  revealRadius,
  revealRatio = 0.7,
  minRevealRadius = 8,
  feather = 40,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const rafRef = useRef<number | null>(null);

  const uid = useId().replace(/[:]/g, "");
  const gradientId = `textGradient-${uid}`;
  const maskId = `textMask-${uid}`;
  const revealId = `revealMask-${uid}`;

  const prefersReducedMotion = useReducedMotion();

  const [hovered, setHovered] = useState(false);

  // viewBox size (для точных координат)
  const [box, setBox] = useState<{ w: number; h: number }>({ w: 300, h: 100 });
  const [viewBox, setViewBox] = useState<string>("0 0 300 100");

  // центр круга маски
  const [maskPos, setMaskPos] = useState<{ cx: number; cy: number }>({
    cx: 150,
    cy: 50,
  });

  const measure = useCallback(() => {
    if (!textRef.current) return;
    const b = textRef.current.getBBox();
    const padX = 16;
    const padY = 16;
    const w = Math.max(1, b.width + padX * 2);
    const h = Math.max(1, b.height + padY * 2);
    setBox({ w, h });
    setViewBox(`0 0 ${Math.ceil(w)} ${Math.ceil(h)}`);
    setMaskPos({ cx: w / 2, cy: h / 2 });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [text, measure]);

  useEffect(() => {
    if (!svgRef.current) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(svgRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const updateMaskFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (prefersReducedMotion) return; // при reduced motion курсором не двигаем
      if (!svgRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = svgRef.current!.getBoundingClientRect();
        const cx = ((clientX - rect.left) / rect.width) * box.w;
        const cy = ((clientY - rect.top) / rect.height) * box.h;
        setMaskPos({ cx, cy });
      });
    },
    [box.w, box.h, prefersReducedMotion]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      updateMaskFromPointer(e.clientX, e.clientY);
    },
    [updateMaskFromPointer]
  );

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Радиус круга (всегда круг!)
  const minSide = Math.min(box.w, box.h);
  const computedRadius = clamp(
    revealRadius ?? minSide * revealRatio,
    minRevealRadius,
    minSide * 1.5
  );

  // Позиция «жёсткого» края внутри радиуса для плавного края.
  // 0..1 (процент радиуса), насколько далеко от центра держать белую область
  const innerStop = feather > 0 ? Math.max(0, 1 - feather / computedRadius) : 1;

  return (
    <Tag className="relative w-full h-full">
      {/* Доступный текст для SR и SEO */}
      <span className="sr-only">{text}</span>

      <svg
        ref={svgRef}
        aria-hidden="true"
        focusable="false"
        width="100%"
        height="100%"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onPointerMove={onPointerMove}
        className="select-none"
      >
        <defs>
          {/* Цветной градиент для обводки */}
          <linearGradient id={gradientId} gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="0">
            {hovered && (
              <>
                <stop offset="0%" stopColor="rgb(234 179 8)" />
                <stop offset="25%" stopColor="rgb(239 68 68)" />
                <stop offset="50%" stopColor="rgb(59 130 246)" />
                <stop offset="75%" stopColor="rgb(6 182 212)" />
                <stop offset="100%" stopColor="rgb(139 92 246)" />
              </>
            )}
          </linearGradient>

          {/* Маска: если feather > 0 — круглый radialGradient (мягкий край); иначе — жёсткий круг */}
          {feather > 0 ? (
            <>
              <motion.radialGradient
                id={revealId}
                gradientUnits="userSpaceOnUse"
                // Радиус градиента — наш целевой радиус
                r={computedRadius}
                initial={false}
                animate={prefersReducedMotion ? undefined : { cx: maskPos.cx, cy: maskPos.cy }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration, ease: "easeOut" }}
                // дубль координат на случай отключённой анимации
                cx={maskPos.cx}
                cy={maskPos.cy}
              >
                {/* Белая часть до innerStop — полностью видимо */}
                <stop offset="0%" stopColor="white" />
                <stop offset={`${innerStop * 100}%`} stopColor="white" />
                {/* Плавный спад к чёрному на краю радиуса */}
                <stop offset="100%" stopColor="black" />
              </motion.radialGradient>

              <mask id={maskId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width={box.w} height={box.h}>
                <rect x="0" y="0" width={box.w} height={box.h} fill={`url(#${revealId})`} />
              </mask>
            </>
          ) : (
            <mask id={maskId} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width={box.w} height={box.h}>
              {/* фон — скрыт */}
              <rect x="0" y="0" width={box.w} height={box.h} fill="black" />
              {/* жёсткий круг */}
              <motion.circle
                cx={maskPos.cx}
                cy={maskPos.cy}
                r={computedRadius}
                fill="white"
                initial={false}
                animate={prefersReducedMotion ? undefined : { cx: maskPos.cx, cy: maskPos.cy }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration, ease: "easeOut" }}
              />
            </mask>
          )}
        </defs>

        {/* Бледная базовая обводка (только при hover) */}
        <text
          ref={textRef}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth={0.3}
          className="font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-7xl"
          style={{ opacity: hovered ? 0.7 : 0 }}
        >
          {text}
        </text>

        {/* Анимация прорисовки контура (уважает reduced motion) */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth={0.3}
          className="font-[helvetica] font-bold fill-transparent text-7xl stroke-neutral-200 dark:stroke-neutral-800"
          initial={prefersReducedMotion ? { strokeDashoffset: 0, strokeDasharray: 0 } : { strokeDashoffset: 1000, strokeDasharray: 1000 }}
          animate={prefersReducedMotion ? { strokeDashoffset: 0, strokeDasharray: 0 } : { strokeDashoffset: 0, strokeDasharray: 1000 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 4, ease: "easeInOut" }}
        >
          {text}
        </motion.text>

        {/* Цветная обводка, открываемая маской */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke={`url(#${gradientId})`}
          strokeWidth={0.3}
          mask={`url(#${maskId})`}
          className="font-[helvetica] font-bold fill-transparent text-7xl"
        >
          {text}
        </text>
      </svg>
    </Tag>
  );
};
