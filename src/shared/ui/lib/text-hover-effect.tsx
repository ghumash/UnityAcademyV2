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
};

export const TextHoverEffect: React.FC<TextHoverEffectProps> = ({
  text,
  duration = 0,
  as: Tag = "p",
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const rafRef = useRef<number | null>(null);

  const uid = useId().replace(/[:]/g, "");
  const gradientId = `textGradient-${uid}`;
  const revealId = `revealMask-${uid}`;
  const maskId = `textMask-${uid}`;

  const prefersReducedMotion = useReducedMotion();

  const [hovered, setHovered] = useState(false);

  // viewBox numeric size to compute exact user-space coordinates
  const [box, setBox] = useState<{ w: number; h: number }>({ w: 300, h: 100 });
  const [viewBox, setViewBox] = useState<string>("0 0 300 100");

  // mask center in user-space (pixels of the SVG viewBox)
  const [maskPos, setMaskPos] = useState<{ cx: number; cy: number }>({
    cx: 150,
    cy: 50,
  });

  // circular radius in user-space (kept proportional to the shortest side)
  const [radius, setRadius] = useState<number>(20);

  const measure = useCallback(() => {
    if (!textRef.current) return;
    const b = textRef.current.getBBox();
    const padX = 16;
    const padY = 16;
    const w = Math.max(1, b.width + padX * 2);
    const h = Math.max(1, b.height + padY * 2);
    setBox({ w, h });
    setViewBox(`0 0 ${Math.ceil(w)} ${Math.ceil(h)}`);
    setRadius(Math.max(8, Math.min(w, h) * 0.7)); // ~70% of the shortest side
    // центр маски — в середину бокса (важно при ресайзе/изменении текста)
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
      if (prefersReducedMotion) return; // не двигаем маску при reduced motion
      if (!svgRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = svgRef.current!.getBoundingClientRect();
        // convert to user-space (viewBox) coordinates
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

  return (
    <Tag className="relative w-full h-full">
      {/* Визуально скрытый текст для читалок и SEO: сам заголовок в DOM */}
      <span className="sr-only">{text}</span>

      <svg
        ref={svgRef}
        aria-hidden="true" // SVG — чисто декоративный, заголовок уже задан выше
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
          {/* Gradient for colored stroke */}
          <linearGradient
            id={gradientId}
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
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

          {/* Circular reveal mask in USER SPACE to avoid ellipse distortion */}
          <motion.radialGradient
            id={revealId}
            gradientUnits="userSpaceOnUse"
            r={radius}
            // при reduced motion не анимируем, просто держим центр в текущем состоянии
            initial={false}
            animate={
              prefersReducedMotion
                ? undefined
                : { cx: maskPos.cx, cy: maskPos.cy }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration, ease: "easeOut" }
            }
            // дублируем координаты как атрибуты на случай отсутствия анимации
            cx={maskPos.cx}
            cy={maskPos.cy}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>

          <mask id={maskId}>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill={`url(#${revealId})`}
            />
          </mask>
        </defs>

        {/* Faint baseline (appears only on hover) */}
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

        {/* Outline drawing animation (respects prefers-reduced-motion) */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth={0.3}
          className="font-[helvetica] font-bold fill-transparent text-7xl stroke-neutral-200 dark:stroke-neutral-800"
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

        {/* Color stroke revealed by circular mask */}
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
