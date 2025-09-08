"use client";

import React, { useEffect, useId, useMemo, useState, type JSX } from "react";
import { motion } from "motion/react";
import { SparklesIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Container, Section } from "./custom";

/* ---------- Types ---------- */
interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: { first: string; second: string; third: string; fourth: string };
  buttons?: {
    first: {
      text: string;
      icon: JSX.ElementType;
    };
    second: {
      text: string;
      icon: JSX.ElementType;
    };
    third: {
      text: string;
      icon: JSX.ElementType;
    };
    fourth: {
      text: string;
      icon: JSX.ElementType;
    };
  };
  title?: string;
  lightColor?: string; // цвет "синих огней" (по умолчанию #00A6F5)
}

interface BlockItemProps {
  text: string;
  icon: JSX.ElementType;
  className: string;
}

/* ---------- Text measuring (SSR-safe) ---------- */
function useMeasuredTextWidth(
  label: string,
  fontPx: number,
  opts?: { fontWeight?: number; fontFamily?: string }
) {
  const { fontWeight = 600, fontFamily = "Inter, ui-sans-serif" } = opts ?? {};
  const fallback = useMemo(
    () => label.length * (fontPx * 0.6),
    [label, fontPx]
  );
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.font = `${fontWeight} ${fontPx}px ${fontFamily}`;
    const w = ctx.measureText(label).width;
    setWidth(Math.max(fallback, Math.ceil(w)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label, fontPx]);

  return width;
}

/* ---------- Helpers ---------- */
const px = (n: number) => `${n}px`;

/* ---------- SVG Pill (responsive, with gaps) ---------- */
type SvgPillProps = {
  anchorX: number;
  y: number;
  label: string;
  icon?: React.ReactNode;
  themeFill?: string;
  textColor?: string;
  fontPx?: number;
  px?: number;
  py?: number;
  iconGap?: number;
  maxWidth?: number;
  minWidth?: number;
  gutter?: number; // зазор между соседями (визуальный)
  iconSize?: number; // размер иконки
};

const SvgPill: React.FC<SvgPillProps> = ({
  anchorX,
  y,
  label,
  icon,
  themeFill = "var(--card)",
  textColor = "var(--card-foreground)",
  fontPx = 3, // базовый размер текста
  px: padX = 6, // горизонтальные паддинги
  py: padY = 3, // вертикальные паддинги
  iconGap = 3,
  iconSize = 4, // размер иконки (можно регулировать пропсом)
}) => {
  const hasIcon = !!icon;

  // считаем ширину текста
  const textW = useMeasuredTextWidth(label, fontPx);
  const contentW = (hasIcon ? iconSize + iconGap : 0) + textW;

  // ширина и высота блока
  const pillW = contentW + padX * 2;
  const pillH = fontPx + padY * 2;
  const rx = pillH / 2;

  // координаты
  const x = anchorX - pillW / 2;
  const textX = x + padX + (hasIcon ? iconSize + iconGap : 0);
  const textY = y + padY + fontPx * 0.8;
  const iconX = x + padX;
  const iconY = y + (pillH - iconSize) / 2;

  return (
    <g>
      <rect x={x} y={y} width={pillW} height={pillH} rx={rx} fill={themeFill} />
      {hasIcon && (
        <g transform={`translate(${iconX}, ${iconY})`} aria-hidden="true">
          {icon}
        </g>
      )}
      <text
        x={textX}
        y={textY}
        fill={textColor}
        fontSize={fontPx}
        fontWeight={600}
        style={{ fontFamily: "Inter, ui-sans-serif" }}
      >
        {label}
      </text>
    </g>
  );
};

/* ---------- DB Icon (smaller) ---------- */
const DatabaseIcon = ({
  x = "0",
  y = "0",
  iconWidth = 4,
}: {
  x?: string;
  y?: string;
  iconWidth?: number;
}) => (
  <svg
    x={x}
    y={y}
    xmlns="http://www.w3.org/2000/svg"
    width={iconWidth}
    height={iconWidth}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);

const BlockItem: React.FC<BlockItemProps> = ({ text, icon, className }) => {
  const Icon = icon;
  return (
    <div
      className={cn(
        "absolute z-10 flex h-7 items-center gap-2 rounded-full border bg-[#101112] px-3 text-xs whitespace-nowrap",
        className
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
};

/* ---------- Main ---------- */
const DatabaseWithRestApi: React.FC<DatabaseWithRestApiProps> = ({
  className,
  circleText,
  badgeTexts,
  buttons,
  title,
  lightColor,
}) => {
  const uid = useId();
  const ids = {
    mask1: `db-mask-1-${uid}`,
    mask2: `db-mask-2-${uid}`,
    mask3: `db-mask-3-${uid}`,
    mask4: `db-mask-4-${uid}`,
    grad: `db-blue-grad-${uid}`,
  };

  const topLabels = [
    badgeTexts?.first ?? "GET",
    badgeTexts?.second ?? "POST",
    badgeTexts?.third ?? "PUT",
    badgeTexts?.fourth ?? "DELETE",
  ];

  // расстояние между якорями ≈ 46 — важно для maxWidth
  const anchors = [31, 77, 124, 170];

  return (
    <Section>
      <Container className="flex items-center justify-center">
        <div
          className={cn(
            "relative flex w-full max-w-[800px] flex-col items-center",
            "min-h-[350px]",
            className
          )}
        >
          {/* Диаграмма */}
          <svg
            className="h-full sm:w-full text-muted"
            width="100%"
            height="100%"
            viewBox="0 0 200 100"
          >
            {/* Линии — цвет НЕ менял */}
            <g
              stroke="currentColor"
              fill="none"
              strokeWidth="0.4"
              strokeDasharray="100 100"
              pathLength="100"
            >
              <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
              <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
              <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
              <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur="1s"
                fill="freeze"
                calcMode="spline"
                keySplines="0.25,0.1,0.5,1"
                keyTimes="0; 1"
              />
            </g>

            {/* Синие огни */}
            <g mask={`url(#${ids.mask1})`}>
              <circle
                className="database db-light-1"
                cx="0"
                cy="0"
                r="12"
                fill={`url(#${ids.grad})`}
              />
            </g>
            <g mask={`url(#${ids.mask2})`}>
              <circle
                className="database db-light-2"
                cx="0"
                cy="0"
                r="12"
                fill={`url(#${ids.grad})`}
              />
            </g>
            <g mask={`url(#${ids.mask3})`}>
              <circle
                className="database db-light-3"
                cx="0"
                cy="0"
                r="12"
                fill={`url(#${ids.grad})`}
              />
            </g>
            <g mask={`url(#${ids.mask4})`}>
              <circle
                className="database db-light-4"
                cx="0"
                cy="0"
                r="12"
                fill={`url(#${ids.grad})`}
              />
            </g>

            {/* Верхние пилюли — авторазмер + отступы */}
            <g stroke="none">
              <SvgPill
                anchorX={anchors[0]}
                y={5}
                label={topLabels[0]}
                icon={<DatabaseIcon />}
              />
              <SvgPill
                anchorX={anchors[1]}
                y={5}
                label={topLabels[1]}
                icon={<DatabaseIcon />}
              />
              <SvgPill
                anchorX={anchors[2]}
                y={5}
                label={topLabels[2]}
                icon={<DatabaseIcon />}
              />
              <SvgPill
                anchorX={anchors[3]}
                y={5}
                label={topLabels[3]}
                icon={<DatabaseIcon />}
              />
            </g>

            {/* Маски/градиент — исходные цвета */}
            <defs>
              <mask id={ids.mask1}>
                <path
                  d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
                  strokeWidth="0.5"
                  stroke="white"
                />
              </mask>
              <mask id={ids.mask2}>
                <path
                  d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
                  strokeWidth="0.5"
                  stroke="white"
                />
              </mask>
              <mask id={ids.mask3}>
                <path
                  d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
                  strokeWidth="0.5"
                  stroke="white"
                />
              </mask>
              <mask id={ids.mask4}>
                <path
                  d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
                  strokeWidth="0.5"
                  stroke="white"
                />
              </mask>
              <radialGradient id={ids.grad} fx="1">
                <stop offset="0%" stopColor={lightColor ?? "#00A6F5"} />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>

          {/* Нижняя коробка */}
          <div className="absolute bottom-10 flex w-full flex-col items-center">
            <div
              className="pointer-events-none absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-accent/30"
              aria-hidden="true"
            />
            <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border bg-[#101112] px-2 py-1 sm:-top-4 sm:px-2.5 sm:py-1.5">
              <SparklesIcon className="size-3" aria-hidden="true" />
              <span className="ml-2 text-[10px] sm:text-[11px] whitespace-nowrap">
                {title ?? "Data exchange using a customized REST API"}
              </span>
            </div>

            <AutoCircle label={circleText ?? "SVG"} />

            <div className="relative z-10 flex h-[185px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background shadow-md">
              <BlockItem
                text={buttons?.first?.text || "first"}
                icon={buttons?.first?.icon || SparklesIcon}
                className="left-10 bottom-24"
              />
              <BlockItem
                text={buttons?.second?.text || "second"}
                icon={buttons?.second?.icon || SparklesIcon}
                className="left-1/4 bottom-14"
              />
              <BlockItem
                text={buttons?.third?.text || "third"}
                icon={buttons?.third?.icon || SparklesIcon}
                className="right-1/4 bottom-17"
              />
              <BlockItem
                text={buttons?.fourth?.text || "fourth"}
                icon={buttons?.fourth?.icon || SparklesIcon}
                className="right-10 bottom-8"
              />

              {/* Пульсирующие круги */}
              <motion.div
                className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t bg-accent/5"
                animate={{ scale: [0.98, 1.02, 0.98, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t bg-accent/5"
                animate={{ scale: [1, 1, 0.98, 1.02, 0.98, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t bg-accent/5"
                animate={{ scale: [1, 1, 1, 0.98, 1.02, 0.98, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t bg-accent/5"
                animate={{ scale: [1, 1, 1, 1, 0.98, 1.02, 0.98, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default DatabaseWithRestApi;

/* ---------- Bottom circle (SSR-safe) ---------- */
const AutoCircle: React.FC<{ label: string }> = ({ label }) => {
  const baseFont = 12;
  const fallbackW = label.length * 6.5;
  const measuredW = useMeasuredTextWidth(label, baseFont, { fontWeight: 600 });
  const width = Math.max(fallbackW, measuredW);
  const diameter = Math.max(60, Math.ceil(width + 24));

  return (
    <div
      className="absolute -bottom-8 z-30 grid place-items-center rounded-full border-t bg-[#141516] font-semibold"
      style={{
        width: px(diameter),
        height: px(diameter),
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: px(baseFont),
      }}
    >
      <span className="px-3 text-center leading-none">{label}</span>
    </div>
  );
};
