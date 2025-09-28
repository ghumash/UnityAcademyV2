"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { animate } from "motion/react";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number; // 0..1 — доля от меньшей стороны, внутри которой эффект «спит»
  proximity?: number; // «аура» вокруг элемента, при попадании в которую эффект активируется
  spread?: number; // ширина конуса свечения (в градусах*2)
  variant?: "default" | "white";
  glow?: boolean; // включает/выключает сам эффект
  className?: string;
  disabled?: boolean; // форс-отключение (например, для SSR/тестов)
  movementDuration?: number; // длительность поворота «конуса» (сек)
  borderWidth?: number; // толщина бордера «свечения»
  forceEnable?: boolean; // принудительно включить эффект даже при prefers-reduced-motion
}

/** Уважает настройку системы «предпочитать уменьшенное движение». */
function usePrefersReducedMotion() {
  const mqlRef = useRef<MediaQueryList | null>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqlRef.current = mql;
    reducedRef.current = mql.matches;

    const onChange = () => {
      reducedRef.current = mql.matches;
    };
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  return reducedRef;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 0.6,
    borderWidth = 1,
    disabled = false,
    forceEnable = false,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);
    const angleAnimRef = useRef<any>(null); // контрол анимации от motion

    const prefersReducedMotionRef = usePrefersReducedMotion();

    const handleMove = useCallback(
      (e?: PointerEvent | { x: number; y: number }) => {
        const el = containerRef.current;
        if (!el) return;

        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        rafRef.current = requestAnimationFrame(() => {
          const { left, top, width, height } = el.getBoundingClientRect();

          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) lastPosition.current = { x: mouseX, y: mouseY };

          const cx = left + width * 0.5;
          const cy = top + height * 0.5;

          // «Мёртвая зона» вокруг центра
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;
          const dist = Math.hypot(mouseX - cx, mouseY - cy);

          if (dist < inactiveRadius) {
            el.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          el.style.setProperty("--active", isActive ? "1" : "0");
          if (!isActive) return;

          const currentAngle =
            parseFloat(el.style.getPropertyValue("--start")) || 0;

          // - atan2 -> градусы -> поворот «вверх» = 90°
          let targetAngle =
            (180 * Math.atan2(mouseY - cy, mouseX - cx)) / Math.PI + 90;

          // кратчайший путь
          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          // Отменяем предыдущую анимацию, чтобы не копились.
          if (angleAnimRef.current?.cancel) angleAnimRef.current.cancel();

          angleAnimRef.current = animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              el.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      const el = containerRef.current;

      // Авто-отключение при reduced motion или когда glow=false
      // forceEnable позволяет принудительно включить эффект даже при prefers-reduced-motion
      const runtimeDisabled =
        disabled || !glow || (prefersReducedMotionRef.current && !forceEnable);

      if (runtimeDisabled) {
        // Сброс активного состояния/анимаций
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (angleAnimRef.current?.cancel) angleAnimRef.current.cancel();
        if (el) {
          el.style.setProperty("--active", "0");
          el.style.setProperty("--start", "0");
        }
        return;
      }

      const onScroll = () => handleMove();
      const onPointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      // начальная позиция (если курсор уже внутри)
      handleMove();

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("pointermove", onPointerMove);
        if (angleAnimRef.current?.cancel) angleAnimRef.current.cancel();
      };
    }, [disabled, glow, forceEnable, handleMove, prefersReducedMotionRef]);

    const isStaticBorder = disabled || !glow || (prefersReducedMotionRef.current && !forceEnable);

    return (
      <>
        {/* Фоллбек-бордер (доступность, без движения) */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            isStaticBorder && "!block"
          )}
        />
        {/* Основной контейнер эффекта */}
        <div
          aria-hidden
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                      from 236.84deg at 50% 50%,
                      var(--black, #000),
                      var(--black, #000) calc(25% / var(--repeating-conic-gradient-times))
                    )`
                  : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                     radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                     radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
                     radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                     repeating-conic-gradient(
                       from 236.84deg at 50% 50%,
                       #dd7bbb 0%,
                       #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                       #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
                       #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                       #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                     )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)]",
            className,
            isStaticBorder && "!hidden"
          )}
        >
          <div
            aria-hidden
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

export { GlowingEffect };
