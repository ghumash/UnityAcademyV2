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
  as?: keyof JSX.IntrinsicElements;
  /** Абсолютный радиус круга в координатах viewBox (px). Приоритетнее revealRatio. */
  revealRadius?: number;
  /** Доля от меньшей стороны текста для расчёта радиуса. По умолчанию 0.7 */
  revealRatio?: number;
  /** Минимальный радиус (px в viewBox). По умолчанию 8 */
  minRevealRadius?: number;
  /** Мягкость края круга (px в viewBox). 0 — жёсткий край. По умолчанию 12. */
  feather?: number;

  /** Включить «сердцебиение» (по умолчанию true) */
  pulse?: boolean;
  /** Частота пульса, ударов в минуту (по умолчанию 72) */
  pulseBpm?: number;
  /** Амплитуда увеличения радиуса (0.1 = +10%) (по умолчанию 0.1) */
  pulseScale?: number;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export const TextHoverEffect: React.FC<TextHoverEffectProps> = ({
  text,
  duration = 0,
  as: Tag = "p",
  revealRadius,
  revealRatio = 0.9,
  minRevealRadius = 8,
  feather = 40,
  pulse = true,
  pulseBpm = 72,
  pulseScale = 0.3,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const rafRef = useRef<number | null>(null);

  const uid = useId().replace(/[:]/g, "");
  const gradientLightId = `textGradientLight-${uid}`;
  const gradientDarkId = `textGradientDark-${uid}`;
  const maskId = `textMask-${uid}`;
  const revealId = `revealMask-${uid}`;

  const prefersReducedMotion = useReducedMotion();

  const [hovered, setHovered] = useState(false);

  // viewBox size
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

  // Базовый радиус
  const minSide = Math.min(box.w, box.h);
  const baseRadius = clamp(
    revealRadius ?? minSide * revealRatio,
    minRevealRadius,
    minSide * 1.5
  );

  // «Сердцебиение»: двойной удар в одном цикле
  const beatSec = 60 / pulseBpm; // секунд на один удар
  const cycleDuration = beatSec * 2; // два толчка за цикл
  const r0 = baseRadius;
  const r1 = baseRadius * (1 + pulseScale); // первый сильный толчок
  const r2 = baseRadius; // спад
  const r3 = baseRadius * (1 + pulseScale * 0.7); // второй, слабее
  const r4 = baseRadius; // возвращение к базе
  const rKeyframes = [r0, r1, r2, r3, r4];
  const rTimes = [0, 0.18, 0.32, 0.5, 1]; // распределение по циклу

  // Позиция «жёсткого» края для feather
  const innerStop =
    feather > 0 ? Math.max(0, 1 - feather / baseRadius) : 1;

  // Настройки анимации маски
  const animateMask =
    prefersReducedMotion || !pulse
      ? { cx: maskPos.cx, cy: maskPos.cy, r: baseRadius }
      : { cx: maskPos.cx, cy: maskPos.cy, r: rKeyframes };

  const transitionMask =
    prefersReducedMotion || !pulse
      ? { duration: 0 }
      : {
          cx: { duration, ease: "easeOut" },
          cy: { duration, ease: "easeOut" },
          r: {
            duration: cycleDuration,
            times: rTimes,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: beatSec * 0.35, // короткая «пауза» между двойными ударами
          },
        };

  return (
    <Tag className="relative h-full w-full">
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
          {/* Тёплый градиент для светлой темы */}
          <linearGradient
            id={gradientLightId}
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="rgb(251 191 36)" />
            <stop offset="25%" stopColor="rgb(244 63 94)" />
            <stop offset="50%" stopColor="rgb(99 102 241)" />
            <stop offset="75%" stopColor="rgb(56 189 248)" />
            <stop offset="100%" stopColor="rgb(139 92 246)" />
          </linearGradient>

          {/* Брендовый градиент для тёмной темы */}
          <linearGradient
            id={gradientDarkId}
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="rgb(234 179 8)" />
            <stop offset="25%" stopColor="rgb(239 68 68)" />
            <stop offset="50%" stopColor="rgb(59 130 246)" />
            <stop offset="75%" stopColor="rgb(6 182 212)" />
            <stop offset="100%" stopColor="rgb(139 92 246)" />
          </linearGradient>

          {/* Маска: мягкий край через radialGradient, жёсткий — через circle */}
          {feather > 0 ? (
            <>
              <motion.radialGradient
                id={revealId}
                gradientUnits="userSpaceOnUse"
                initial={false}
                animate={animateMask}
                transition={transitionMask}
                // дубль координат на случай отключённой анимации
                cx={maskPos.cx}
                cy={maskPos.cy}
                r={baseRadius}
              >
                <stop offset="0%" stopColor="white" />
                <stop offset={`${innerStop * 100}%`} stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </motion.radialGradient>

              <mask
                id={maskId}
                maskUnits="userSpaceOnUse"
                maskContentUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={box.w}
                height={box.h}
              >
                <rect
                  x="0"
                  y="0"
                  width={box.w}
                  height={box.h}
                  fill={`url(#${revealId})`}
                />
              </mask>
            </>
          ) : (
            <mask
              id={maskId}
              maskUnits="userSpaceOnUse"
              maskContentUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={box.w}
              height={box.h}
            >
              <rect x="0" y="0" width={box.w} height={box.h} fill="black" />
              <motion.circle
                cx={maskPos.cx}
                cy={maskPos.cy}
                r={baseRadius}
                fill="white"
                initial={false}
                animate={
                  prefersReducedMotion || !pulse
                    ? { cx: maskPos.cx, cy: maskPos.cy, r: baseRadius }
                    : { cx: maskPos.cx, cy: maskPos.cy, r: rKeyframes }
                }
                transition={
                  prefersReducedMotion || !pulse
                    ? { duration: 0 }
                    : {
                        cx: { duration, ease: "easeOut" },
                        cy: { duration, ease: "easeOut" },
                        r: {
                          duration: cycleDuration,
                          times: rTimes,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "loop",
                          repeatDelay: beatSec * 0.35,
                        },
                      }
                }
              />
            </mask>
          )}
        </defs>

        {/* Бледная базовая обводка */}
        <text
          ref={textRef}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth={0.3}
          className="text-7xl font-bold font-[helvetica] fill-transparent stroke-neutral-300 dark:stroke-neutral-800"
          style={{ opacity: hovered ? 0.7 : 0 }}
        >
          {text}
        </text>

        {/* Анимация прорисовки контура */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth={0.3}
          className="text-7xl font-bold font-[helvetica] fill-transparent stroke-neutral-300 dark:stroke-neutral-800"
          initial={
            prefersReducedMotion
              ? { strokeDashoffset: 0, strokeDasharray: 0 }
              : { strokeDashoffset: 1000, strokeDasharray: 1000 }
          }
          animate={
            prefersReducedMotion
              ? { strokeDashoffset: 0, strokeDasharray: 0 }
              : { strokeDashoffset: 0, strokeDasharray: 1000 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 4, ease: "easeInOut" }
          }
        >
          {text}
        </motion.text>

        {/* Цветная обводка, открываемая маской — разные цвета для light/dark */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke={`url(#${gradientLightId})`}
          strokeWidth={0.3}
          mask={`url(#${maskId})`}
          className="text-7xl font-bold font-[helvetica] fill-transparent dark:hidden"
        >
          {text}
        </text>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke={`url(#${gradientDarkId})`}
          strokeWidth={0.3}
          mask={`url(#${maskId})`}
          className="hidden text-7xl font-bold font-[helvetica] fill-transparent dark:inline"
        >
          {text}
        </text>
      </svg>
    </Tag>
  );
};
