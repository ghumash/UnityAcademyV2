"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  ShieldCheck,
  SparklesIcon,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/ui/custom";
import { Section } from "../../shared/ui/custom";

/* ---------- Types ---------- */
interface AnimatedLinesBadgesProps {
  className?: string;
  circleText?: string;
  badgeTexts?: { first: string; second: string; third: string; fourth: string };
  buttonTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  title?: string;
  lightColor?: string; // цвет "синих огней" (по умолчанию #00A6F5)
}

interface BlockItemProps {
  text: string;
  icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
  className: string;
}

/* ---------- Hooks ---------- */
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
  }, [label, fontPx, fontFamily, fontWeight, fallback]);

  return width;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setReduced("matches" in e ? e.matches : (e as MediaQueryList).matches);
    handler(mq);
    mq.addEventListener?.("change", handler as EventListener);
    return () => mq.removeEventListener?.("change", handler as EventListener);
  }, []);
  return reduced;
}

/* ---------- Helpers ---------- */
const px = (n: number) => `${n}px`;

/* ---------- Subcomponents ---------- */
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
  iconSize?: number;
};

const SvgPill: React.FC<SvgPillProps> = ({
  anchorX,
  y,
  label,
  icon,
  themeFill = "var(--card)",
  textColor = "var(--card-foreground)",
  fontPx = 3,
  px: padX = 6,
  py: padY = 3,
  iconGap = 3,
  iconSize = 4,
}) => {
  const hasIcon = !!icon;

  const textW = useMeasuredTextWidth(label, fontPx);
  const contentW = (hasIcon ? iconSize + iconGap : 0) + textW;

  const pillW = contentW + padX * 2;
  const pillH = fontPx + padY * 2;
  const rx = pillH / 2;

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

const BlockItem: React.FC<BlockItemProps> = ({
  text,
  icon: Icon,
  className,
}) => (
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

/* ---------- Main ---------- */
export const AnimatedLinesBadges: React.FC<AnimatedLinesBadgesProps> = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}) => {
  const uid = useId();
  const ids = useMemo(
    () => ({
      mask: Array.from({ length: 4 }, (_, i) => `db-mask-${i + 1}-${uid}`),
      grad: `db-blue-grad-${uid}`,
    }),
    [uid]
  );

  const topLabels = [
    badgeTexts?.first ?? "ՏՏ-Իվենթներ",
    badgeTexts?.second ?? "Նեթվորքինգ",
    badgeTexts?.third ?? "Ջերմ միջավայր",
    badgeTexts?.fourth ?? "Ինքնակրթություն",
  ];

  // расстояние между якорями ≈ 46 — важно для позиционирования
  const anchors = [31, 77, 124, 170];

  const maskPaths = [
    "M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10",
    "M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10",
    "M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10",
    "M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10",
  ];

  const pillIcons = [GraduationCap, Users, ShieldCheck, TrendingUp];

  const pulseConfig = [
    {
      cls: "absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t bg-accent/5",
      scales: [0.98, 1.02, 0.98, 1],
    },
    {
      cls: "absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t bg-accent/5",
      scales: [1, 1, 0.98, 1.02, 0.98, 1],
    },
    {
      cls: "absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t bg-accent/5",
      scales: [1, 1, 1, 0.98, 1.02, 0.98, 1],
    },
    {
      cls: "absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t bg-accent/5",
      scales: [1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
    },
  ];

  const reducedMotion = usePrefersReducedMotion();

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
            aria-hidden="true"
          >
            {/* Линии — цвет не менялся */}
            <g
              stroke="currentColor"
              fill="none"
              strokeWidth="0.4"
              strokeDasharray="100 100"
              pathLength="100"
            >
              <path d={maskPaths[0]} />
              <path d={maskPaths[1]} />
              <path d={maskPaths[2]} />
              <path d={maskPaths[3]} />
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
            {ids.mask.map((mid, i) => (
              <g key={mid} mask={`url(#${mid})`}>
                <circle
                  className={cn("database", `db-light-${i + 1}`)}
                  cx="0"
                  cy="0"
                  r="12"
                  fill={`url(#${ids.grad})`}
                />
              </g>
            ))}

            {/* Верхние пилюли */}
            <g stroke="none">
              {anchors.map((anchorX, i) => {
                const Icon = pillIcons[i];
                return (
                  <SvgPill
                    key={`pill-${i}`}
                    anchorX={anchorX}
                    y={5}
                    label={topLabels[i]}
                    icon={<Icon size={4} className="text-white" />}
                  />
                );
              })}
            </g>

            {/* Маски/градиент */}
            <defs>
              {ids.mask.map((mid, i) => (
                <mask id={mid} key={mid}>
                  <path d={maskPaths[i]} strokeWidth="0.5" stroke="white" />
                </mask>
              ))}
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
                {title ?? "Dayoff"}
              </span>
            </div>

            <AutoCircle label={circleText ?? "Unity"} />

            <div className="relative z-10 flex h-[185px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background shadow-md">
              <BlockItem
                text={buttonTexts?.first || "Կրթություն"}
                icon={GraduationCap}
                className="left-10 bottom-24"
              />
              <BlockItem
                text={buttonTexts?.second || "Համայնք"}
                icon={Users}
                className="left-1/4 bottom-14"
              />
              <BlockItem
                text={buttonTexts?.third || "Ճիշտ արժեքներ"}
                icon={ShieldCheck}
                className="right-1/4 bottom-17"
              />
              <BlockItem
                text={buttonTexts?.fourth || "Զարգացում"}
                icon={TrendingUp}
                className="right-10 bottom-8"
              />

              {/* Пульсирующие круги */}
              {pulseConfig.map(({ cls, scales }, i) => (
                <motion.div
                  key={`pulse-${i}`}
                  className={cls}
                  animate={reducedMotion ? undefined : { scale: scales }}
                  transition={
                    reducedMotion
                      ? undefined
                      : { duration: 2, repeat: Infinity }
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

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
