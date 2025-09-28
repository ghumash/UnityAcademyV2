/**
 * Хук для управления анимацией CallToAction
 * Содержит всю бизнес-логику анимации, изолированную от UI
 */

import { useCallback, useRef, useEffect } from "react";
import {
  useAnimate,
  type AnimationSequence,
  type AnimationPlaybackControls,
} from "motion/react";

import type { AnimationPoint } from "../model/types";
import { createCenterCalculator } from "./utils";

interface UseCallToActionAnimationProps<T extends string> {
  activeTagId?: T;
  keys: readonly T[];
}

export const useCallToActionAnimation = <T extends string>({
  activeTagId,
  keys,
}: UseCallToActionAnimationProps<T>) => {
  const [scope, animate] = useAnimate();
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  const buildSequence = useCallback((): AnimationSequence => {
    const root = scope.current as HTMLElement | null;
    if (!root) return [];

    // Если задан activeTagId, не создаем анимацию
    if (activeTagId) return [];

    const centerCalculator = createCenterCalculator<T>(root);
    const points = keys
      .map(centerCalculator)
      .filter(Boolean) as AnimationPoint<T>[];

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
    seq.push([`#${last.id}`, { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }]);

    return seq;
  }, [scope, activeTagId, keys]);

  const startAnimation = useCallback(() => {
    const seq = buildSequence();
    if (!seq.length) return;
    // перезапустить анимацию безопасно
    controlsRef.current?.stop?.();
    controlsRef.current = animate(seq, { repeat: Infinity });
  }, [animate, buildSequence]);

  // Эффект для установки активного тега при наличии activeTagId
  useEffect(() => {
    if (activeTagId) {
      const root = scope.current as HTMLElement | null;
      if (!root) return;

      const centerCalculator = createCenterCalculator<T>(root);
      const activePoint = centerCalculator(activeTagId);

      if (activePoint) {
        // Позиционируем курсор на активный тег
        animate(
          "#pointer",
          {
            left: activePoint.left,
            top: activePoint.top,
          },
          { duration: 0 }
        );

        // Устанавливаем opacity для всех тегов
        keys.forEach((tagId: T) => {
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
  }, [startAnimation, scope, activeTagId, animate, keys]);

  return { scope };
};
