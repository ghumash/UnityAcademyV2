"use client";

import * as React from "react";
import { memo } from "react";
import dynamic from "next/dynamic";
import {
  useAnimate,
  type AnimationSequence,
  type AnimationPlaybackControls,
} from "motion/react";

import { HighlighterItem, HighlightGroup, Particles } from "@/shared/ui/lib";
import { cn } from "@/shared/lib/utils";

interface CallToActionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  activeTagId?: TagId;
}

const TAG_IDS = [
  "python",
  "web_development",
  "android",
  "graphic_design",
  "ui_ux",
  "soft_skills",
] as const;

export type TagId = (typeof TAG_IDS)[number];

const CallToActionComponent = memo(({
  title,
  subtitle,
  children,
  activeTagId,
}: CallToActionProps) => {
  const [scope, animate] = useAnimate();
  const controlsRef = React.useRef<AnimationPlaybackControls | null>(null);

  const buildSequence = React.useCallback((): AnimationSequence => {
    const root = scope.current as HTMLElement | null;
    if (!root) return [];

    // Если задан activeTagId, не создаем анимацию
    if (activeTagId) return [];

    const rootRect = root.getBoundingClientRect();

    // получить центр элемента тега в процентах относительно контейнера
    const centerPct = (id: TagId) => {
      const el = root.querySelector<HTMLElement>(`#${id}`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cx =
        ((r.left + r.width / 2 - rootRect.left) / rootRect.width) * 100;
      const cy =
        ((r.top + r.height / 2 - rootRect.top) / rootRect.height) * 100;
      // clamp на всякий
      const clamp = (v: number) => Math.max(0, Math.min(100, v));
      return { id, left: `${clamp(cx)}%`, top: `${clamp(cy)}%` };
    };

    const points = TAG_IDS.map(centerPct).filter(Boolean) as Array<{
      id: TagId;
      left: string;
      top: string;
    }>;

    if (!points.length) return [];

    const seq: AnimationSequence = [];

    // старт: переместить к первому, подсветить его
    seq.push([
      "#pointer",
      { left: points[0].left, top: points[0].top },
      { duration: 0 },
    ]);
    seq.push([`#${points[0].id}`, { opacity: 1 }, { duration: 0.3 }]);

    // пройтись по остальным
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const cur = points[i];
      seq.push([
        "#pointer",
        { left: cur.left, top: cur.top },
        { at: "+0.5", duration: 0.5, ease: "easeInOut" },
      ]);
      seq.push([
        `#${prev.id}`,
        { opacity: 0.4 },
        { at: "-0.3", duration: 0.1 },
      ]);
      seq.push([`#${cur.id}`, { opacity: 1 }, { duration: 0.3 }]);
    }

    // замкнуть цикл
    const last = points[points.length - 1];
    seq.push([
      "#pointer",
      { left: points[0].left, top: points[0].top },
      { at: "+0.5", duration: 0.5, ease: "easeInOut" },
    ]);
    seq.push([`#${last.id}`, { opacity: 0.5 }, { at: "-0.3", duration: 0.1 }]);

    return seq;
  }, [scope, activeTagId]);

  const startAnimation = React.useCallback(() => {
    const seq = buildSequence();
    if (!seq.length) return;
    // перезапустить анимацию безопасно
    controlsRef.current?.stop?.();
    controlsRef.current = animate(seq, { repeat: Infinity });
  }, [animate, buildSequence]);

  // Эффект для установки активного тега при наличии activeTagId
  React.useEffect(() => {
    if (activeTagId) {
      const root = scope.current as HTMLElement | null;
      if (!root) return;

      const rootRect = root.getBoundingClientRect();
      const activeEl = root.querySelector<HTMLElement>(`#${activeTagId}`);

      if (activeEl) {
        const r = activeEl.getBoundingClientRect();
        const cx =
          ((r.left + r.width / 2 - rootRect.left) / rootRect.width) * 100;
        const cy =
          ((r.top + r.height / 2 - rootRect.top) / rootRect.height) * 100;
        const clamp = (v: number) => Math.max(0, Math.min(100, v));

        // Позиционируем курсор на активный тег
        animate(
          "#pointer",
          {
            left: `${clamp(cx)}%`,
            top: `${clamp(cy)}%`,
          },
          { duration: 0 }
        );

        // Устанавливаем opacity для всех тегов
        TAG_IDS.forEach((tagId) => {
          animate(
            `#${tagId}`,
            {
              opacity: tagId === activeTagId ? 1 : 0.4,
            },
            { duration: 0 }
          );
        });
      }
      return;
    }

    // Обычная анимация, если activeTagId не задан
    const raf = requestAnimationFrame(startAnimation);

    // адаптация при ресайзе
    const root = scope.current as HTMLElement | null;
    let ro: ResizeObserver | null = null;
    if (root && "ResizeObserver" in window) {
      ro = new ResizeObserver(() => {
        startAnimation();
      });
      ro.observe(root);
    } else {
      const onResize = () => startAnimation();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      controlsRef.current?.stop?.();
    };
  }, [startAnimation, scope, activeTagId, animate]);

  return (
    <HighlightGroup className="group h-full">
      <div
        className="group/item h-full md:col-span-6 lg:col-span-12"
        data-aos="fade-down"
      >
        <HighlighterItem className="rounded-3xl p-6">
          <div className="relative z-20 overflow-hidden rounded-3xl border border-foreground-200 bg-white dark:border-foreground-800 dark:bg-black">
            <Particles
              className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 group-hover/item:opacity-100"
              quantity={200}
              color="#555555"
              vy={-0.2}
            />

            <div className="flex flex-col items-center gap-10 p-14 md:flex-row">
              {/* Левая часть с pointer-анимацией */}
              <div
                className="relative mx-auto w-full"
                style={{ height: "min(55vw, 360px)" }} // адаптивная высота
                ref={scope}
              >
                {/* Теги: позиции через style в %; центрируем translate(-50%,-50%) */}
                <Tag
                  id="python"
                  label="Artificial Intelligence"
                  style={{ top: "10%", left: "75%" }}
                />
                <Tag
                  id="web_development"
                  label="Web Development"
                  style={{ top: "28%", left: "25%" }}
                />
                <Tag
                  id="android"
                  label="Java & Android"
                  style={{ top: "46%", left: "65%" }}
                />
                <Tag
                  id="graphic_design"
                  label="Graphic Design"
                  style={{ top: "64%", left: "35%" }}
                />
                <Tag
                  id="ui_ux"
                  label="UI/UX Design"
                  style={{ top: "82%", left: "75%" }}
                />
                <Tag
                  id="soft_skills"
                  label="Soft Skills"
                  style={{ top: "100%", left: "25%" }}
                />

                {/* Курсор — центрируем, чтобы совпадал с центрами тегов */}
                <Pointer />
              </div>

              {/* Правая часть с текстом */}
              <div className="flex w-full flex-col items-center justify-center space-y-4">
                <div className="w-full">
                  <h3 className="pb-1 font-bold">
                    <span className="text-2xl md:text-4xl">{title}</span>
                  </h3>
                  <p className="text-foreground-400">{subtitle}</p>
                </div>

                {children}
              </div>
            </div>
          </div>
        </HighlighterItem>
      </div>
    </HighlightGroup>
  );
});

export const CallToAction = dynamic(() => 
  Promise.resolve(CallToActionComponent), 
  { ssr: false }
);

/* Вспомогательные элементы */
function Tag({
  id,
  label,
  style,
}: {
  id: TagId | string;
  label: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      id={id}
      style={{ ...style, opacity: 0.4 }}
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 transform rounded-3xl border px-2 py-1.5 text-xs w-full max-w-[140px] text-center",
        "border-foreground-400 bg-foreground-200 dark:border-foreground-600 dark:bg-foreground-800"
      )}
    >
      {label}
    </div>
  );
}

function Pointer() {
  return (
    <div id="pointer" className="absolute translate-x-1 translate-y-1">
      <svg
        width="16.8"
        height="18.2"
        viewBox="0 0 12 13"
        className="fill-red-500"
        stroke="white"
        strokeWidth="1"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676Z"
        />
      </svg>
      <span className="relative -top-1 left-3 rounded-3xl bg-red-500 px-2 py-1 text-xs text-white">
        User
      </span>
    </div>
  );
}
