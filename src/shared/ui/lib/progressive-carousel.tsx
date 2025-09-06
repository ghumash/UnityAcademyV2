"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/shared/lib/utils";

/* =========================
 * Types
 * =======================*/

type ProgressSliderContextType = {
  active: string;
  progress: number; // 0..100
  handleButtonClick: (value: string) => void;
  vertical: boolean;
};

type ProgressSliderProps = {
  children: ReactNode;
  /** Duration of one slide in ms */
  duration?: number;
  /** Duration to fast-forward to the next slide in ms */
  fastDuration?: number;
  /** Vertical progress direction */
  vertical?: boolean;
  /** Initial/controlled active slide key */
  activeSlider: string;
  className?: string;
};

type SliderContentProps = {
  children: ReactNode;
  className?: string;
};

type SliderWrapperProps = {
  children: ReactNode;
  /** Unique value for this slide */
  value: string;
  className?: string;
};

type SliderBtnGroupProps = {
  children: ReactNode;
  className?: string;
  /** Optional aria-label for the buttons group */
  "aria-label"?: string;
};

type SliderBtnProps = {
  children: ReactNode;
  /** The slide value this button activates */
  value: string;
  className?: string;
  /** Class for the progress bar fill */
  progressBarClass?: string;
  /** Accessible label for the button (if children are purely visual) */
  "aria-label"?: string;
};

/* =========================
 * Context
 * =======================*/

const ProgressSliderContext = createContext<ProgressSliderContextType | null>(
  null
);

export const useProgressSliderContext = (): ProgressSliderContextType => {
  const ctx = useContext(ProgressSliderContext);
  if (!ctx) {
    throw new Error(
      "useProgressSliderContext must be used within <ProgressSlider>"
    );
  }
  return ctx;
};

/* =========================
 * Utils
 * =======================*/

const toDomId = (s: string) =>
  `ps-${s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "")}`;

/* =========================
 * Root
 * =======================*/

export const ProgressSlider = ({
  children,
  duration = 5000,
  fastDuration = 400,
  vertical = false,
  activeSlider,
  className,
}: ProgressSliderProps) => {
  const prefersReducedMotion = useReducedMotion();

  const [active, setActive] = useState<string>(activeSlider);
  const [progress, setProgress] = useState(0);

  // animation refs
  const rafId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const startProgressRef = useRef<number>(0);
  const modeRef = useRef<"normal" | "fast">("normal");
  const targetValueRef = useRef<string | null>(null);

  // collect slider values from <SliderContent>
  const [sliderValues, setSliderValues] = useState<string[]>([]);

  // derive values from children once (or when children change)
  useEffect(() => {
    const contentChild = React.Children.toArray(children).find(
      (child): child is React.ReactElement<SliderContentProps> =>
        React.isValidElement(child) && child.type === SliderContent
    );
    if (!contentChild) return;

    const values = React.Children.toArray(contentChild.props.children)
      .filter(
        (child): child is React.ReactElement<{ value: string }> =>
          React.isValidElement(child) &&
          child.props != null &&
          typeof (child.props as any).value === "string"
      )
      .map((child) => (child.props as { value: string }).value);

    setSliderValues(values);
  }, [children]);

  // sync with external activeSlider prop (acts as "controlled" if it changes)
  useEffect(() => {
    if (activeSlider && activeSlider !== active) {
      setActive(activeSlider);
      setProgress(0);
      startProgressRef.current = 0;
      startTimeRef.current = performance.now();
      modeRef.current = "normal";
      targetValueRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlider]);

  // cancel rAF helper
  const cancelRaf = () => {
    if (rafId.current != null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  // main animation loop
  useEffect(() => {
    if (prefersReducedMotion || sliderValues.length === 0) {
      // respect reduced motion: jump instantly and disable loop
      setProgress(100);
      return;
    }

    startTimeRef.current = performance.now();
    startProgressRef.current = 0;
    modeRef.current = "normal";
    targetValueRef.current = null;

    const tick = (now: number) => {
      const isFast = modeRef.current === "fast";
      const total = isFast ? fastDuration : duration;

      const elapsed = now - startTimeRef.current;
      let nextProgress: number;

      if (isFast) {
        // progress from current startProgress -> 100% in fastDuration
        const span = 100 - startProgressRef.current;
        nextProgress = Math.min(
          100,
          startProgressRef.current + (elapsed / total) * span
        );
      } else {
        nextProgress = Math.min(100, (elapsed / total) * 100);
      }

      setProgress(nextProgress);

      if (nextProgress < 100) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      // phase finished
      if (modeRef.current === "fast" && targetValueRef.current) {
        // jump to target slide after fast-forward
        setActive(targetValueRef.current);
        targetValueRef.current = null;
        modeRef.current = "normal";
      } else {
        // auto-advance
        const i = Math.max(0, sliderValues.indexOf(active));
        const next = sliderValues[(i + 1) % sliderValues.length];
        setActive(next);
      }

      // reset for next phase
      setProgress(0);
      startProgressRef.current = 0;
      startTimeRef.current = performance.now();
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelRaf();
    };
    // Re-run when these change
  }, [active, duration, fastDuration, prefersReducedMotion, sliderValues]);

  const handleButtonClick = useMemo(
    () => (value: string) => {
      if (value === active || prefersReducedMotion) return;

      // start fast-forward from current progress
      const now = performance.now();
      const elapsed = now - startTimeRef.current;
      const currentProgress =
        modeRef.current === "fast"
          ? // if already fast, compute progress from fast phase
            startProgressRef.current +
            ((elapsed / fastDuration) * (100 - startProgressRef.current) || 0)
          : (elapsed / duration) * 100;

      startProgressRef.current = Math.max(0, Math.min(100, currentProgress));
      startTimeRef.current = now;
      modeRef.current = "fast";
      targetValueRef.current = value;

      // if loop was paused for any reason, kick it
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(() =>
          // next frame will pick up modeRef === 'fast'
          setProgress(startProgressRef.current)
        );
      }
    },
    [active, duration, fastDuration, prefersReducedMotion]
  );

  const ctx: ProgressSliderContextType = useMemo(
    () => ({ active, progress, handleButtonClick, vertical }),
    [active, progress, handleButtonClick, vertical]
  );

  return (
    <ProgressSliderContext.Provider value={ctx}>
      <div className={cn("relative", className)}>{children}</div>
    </ProgressSliderContext.Provider>
  );
};

/* =========================
 * Content
 * =======================*/

export const SliderContent = ({ children, className }: SliderContentProps) => {
  return <div className={cn(className)}>{children}</div>;
};

/* =========================
 * Slide Wrapper (Panel)
 * =======================*/

export const SliderWrapper = ({
  children,
  value,
  className,
}: SliderWrapperProps) => {
  const { active } = useProgressSliderContext();
  const prefersReducedMotion = useReducedMotion();
  const panelId = toDomId(`${value}-panel`);
  const btnId = toDomId(`${value}-tab`);

  return (
    <AnimatePresence mode="popLayout" initial={!prefersReducedMotion}>
      {active === value && (
        <motion.section
          key={value}
          id={panelId}
          role="tabpanel"
          aria-labelledby={btnId}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          className={cn(className)}
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

/* =========================
 * Buttons Group (Tabs)
 * =======================*/

export const SliderBtnGroup = ({
  children,
  className,
  "aria-label": ariaLabel = "Slides",
}: SliderBtnGroupProps) => {
  const { vertical } = useProgressSliderContext();

  // Keyboard navigation between tabs
  const { handleButtonClick, active } = useProgressSliderContext();
  const values = React.Children.toArray(children)
    .filter(
      (child): child is React.ReactElement<SliderBtnProps> =>
        React.isValidElement(child) &&
        typeof (child.props as any).value === "string"
    )
    .map((child) => (child.props as SliderBtnProps).value);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = values.indexOf(active);
    if (idx < 0) return;

    const prevKey = vertical ? "ArrowUp" : "ArrowLeft";
    const nextKey = vertical ? "ArrowDown" : "ArrowRight";

    if (e.key === prevKey) {
      e.preventDefault();
      const nextVal = values[(idx - 1 + values.length) % values.length];
      handleButtonClick(nextVal);
    } else if (e.key === nextKey) {
      e.preventDefault();
      const nextVal = values[(idx + 1) % values.length];
      handleButtonClick(nextVal);
    }
  };

  return (
    <div
      role="tablist"
      aria-orientation={vertical ? "vertical" : "horizontal"}
      aria-label={ariaLabel}
      className={cn("flex gap-2", className)}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
};

/* =========================
 * Button (Tab)
 * =======================*/

export const SliderBtn = ({
  children,
  value,
  className,
  progressBarClass,
  "aria-label": ariaLabel,
}: SliderBtnProps) => {
  const { active, progress, handleButtonClick, vertical } =
    useProgressSliderContext();

  const isActive = active === value;
  const tabId = toDomId(`${value}-tab`);
  const panelId = toDomId(`${value}-panel`);

  return (
    <button
      id={tabId}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      aria-label={ariaLabel}
      data-active={isActive ? "true" : "false"}
      className={cn(
        "relative outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        isActive ? "opacity-100" : "opacity-60 hover:opacity-80",
        className
      )}
      onClick={() => handleButtonClick(value)}
    >
      {children}

      {/* Visual progress indicator */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className={cn(
            "absolute left-0 top-0 h-full w-0 bg-current/20",
            vertical && "left-0 top-auto bottom-0 w-full h-0",
            progressBarClass
          )}
          style={{
            [vertical ? ("height" as const) : ("width" as const)]: isActive
              ? `${Math.max(0, Math.min(100, progress))}%`
              : "0%",
          }}
        />
      </div>
    </button>
  );
};
