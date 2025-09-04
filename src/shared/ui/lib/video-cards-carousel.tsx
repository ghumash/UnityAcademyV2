// shared/ui/lib/apple-cards-carousel.tsx
"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
  useId,
  memo,
  JSX,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconVolume,
  IconVolumeOff,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/shared/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useOutsideClick } from "@/shared/hooks";
import { PromoVideo } from "../custom";

/* =========================
 * Types & Context
 * =======================*/

interface CarouselProps {
  items: JSX.Element[];
  /** Пиксельное смещение при монтировании */
  initialScroll?: number;
}

// локальный тип (совместим со StudentPromo из секции)
type StudentPromoCard = {
  student: string;
  group: string;
  srcWebm: string;
  srcMp4?: string;
  posterSrc?: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

/* =========================
 * Carousel
 * =======================*/

export const Carousel = memo(function Carousel({
  items,
  initialScroll = 0,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // raf-троттлинг onScroll
  const isTickingRef = useRef(false);

  const checkScrollability = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  const handleScroll = useCallback(() => {
    if (isTickingRef.current) return;
    isTickingRef.current = true;
    requestAnimationFrame(() => {
      checkScrollability();
      isTickingRef.current = false;
    });
  }, [checkScrollability]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollLeft = initialScroll;
    checkScrollability();

    const onResize = () => checkScrollability();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [initialScroll, checkScrollability]);

  const scrollByAmount = useCallback((amount: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  const scrollLeft = useCallback(() => scrollByAmount(-300), [scrollByAmount]);
  const scrollRight = useCallback(() => scrollByAmount(300), [scrollByAmount]);

  /** При закрытии модалки — скроллим к карточке по её фактическому offset */
  const handleCardClose = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-carousel-item]");
    const target = items[index];
    if (target) {
      el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    }
    setCurrentIndex(index);
  }, []);

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          role="region"
          aria-label="Cards carousel"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") scrollLeft();
            if (e.key === "ArrowRight") scrollRight();
          }}
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
        >
          {/* Декоративный градиент */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 z-[1] h-auto w-[5%] bg-gradient-to-l from-white/70 to-transparent dark:from-neutral-950/70"
          />

          <div
            className={cn(
              "mx-auto max-w-7xl",
              "flex flex-row justify-start gap-4 pl-4"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                data-carousel-item
                key={`card-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mr-10 flex justify-end gap-2">
          <button
            type="button"
            aria-label="Scroll left"
            title="Scroll left"
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50 dark:bg-neutral-800"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              aria-hidden="true"
            />
            <span className="sr-only">Previous</span>
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            title="Scroll right"
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50 dark:bg-neutral-800"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-disabled={!canScrollRight}
          >
            <IconArrowNarrowRight
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              aria-hidden="true"
            />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
});

/* =========================
 * PromoVideo: preview (hover/focus play) + dialog player
 * =======================*/

type Props = {
  srcWebm: string;
  srcMp4?: string;
  posterSrc?: string;
  title: string;
  className?: string;
  onOpen?: () => void; // callback для открытия диалога
};

const PromoVideoPreview = memo(function PromoVideoPreview({
  srcWebm,
  srcMp4,
  posterSrc,
  title,
  className,
  onOpen,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  // Автопауза вне вьюпорта
  useEffect(() => {
    const node = containerRef.current;
    const vid = videoRef.current;
    if (!node || !vid) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) vid.pause();
      },
      { rootMargin: "120px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Автовоспроизведение при hover/focus
  const tryPlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid || reduced) return;
    vid.play().catch(() => void 0);
  }, [reduced]);

  const pause = useCallback(() => videoRef.current?.pause(), []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // чтобы не открывался диалог
    setMuted((prev) => !prev);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 z-10 group", className)}
      onClick={onOpen}
      onMouseEnter={tryPlay}
      onFocus={tryPlay}
      onMouseLeave={pause}
      onBlur={pause}
    >
      <PromoVideo
        ref={videoRef}
        title={title}
        srcWebm={srcWebm}
        srcMp4={srcMp4}
        poster={posterSrc}
        autoPlay={false}
        controls={false}
        muted={muted}
        loop
        preload="metadata"
        aspect="4 / 5"
        className="h-full w-full"
      />

      {/* Кнопка mute/unmute */}
      <div
        onClick={toggleMute}
        className="absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black focus:outline-none"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? (
          <IconVolumeOff className="h-5 w-5" aria-hidden="true" />
        ) : (
          <IconVolume className="h-5 w-5" aria-hidden="true" />
        )}
      </div>
    </div>
  );
});

const PromoVideoDialog = memo(function PromoVideoDialog({
  srcWebm,
  srcMp4,
  posterSrc,
  title,
}: {
  srcWebm: string;
  srcMp4?: string;
  posterSrc?: string;
  title: string;
}) {
  return (
    <PromoVideo
      title={title}
      srcWebm={srcWebm}
      srcMp4={srcMp4}
      poster={posterSrc}
      autoPlay
      muted={false}
      controls
      preload="metadata"
      aspect="4 / 5"
      className="w-full"
    />
  );
});

/* =========================
 * Card (video version)
 * =======================*/

export const Card = memo(function Card({
  card,
  index,
  layout = false,
}: {
  card: StudentPromoCard;
  index: number;
  layout?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const { onCardClose } = useContext(CarouselContext);
  const reducedMotion = useReducedMotion();
  const titleId = useId();

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
    requestAnimationFrame(() => openBtnRef.current?.focus());
  }, [index, onCardClose]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    const prevOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
      requestAnimationFrame(() => containerRef.current?.focus());
    } else {
      document.body.style.overflow = prevOverflow || "auto";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow || "auto";
    };
  }, [open, handleClose]);

  useOutsideClick(containerRef, () => {
    if (open) handleClose();
  });

  const titleText = `${card.student} — ${card.group}`;

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: reducedMotion ? 0.1 : 0.2 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: reducedMotion ? 0.1 : 0.2 },
              }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
              aria-hidden="true"
            />
            {/* Dialog */}
            <motion.div
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: reducedMotion ? 0.12 : 0.2 },
              }}
              exit={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.98,
                transition: { duration: reducedMotion ? 0.1 : 0.2 },
              }}
              layoutId={layout ? `card-${titleText}` : undefined}
              className="relative z-[60] mx-auto my-30 max-w-lg rounded-3xl bg-white p-4 font-sans shadow-lg outline-none md:p-6 dark:bg-neutral-900"
            >
              <button
                type="button"
                aria-label="Close dialog"
                title="Close"
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
              >
                <IconX
                  className="h-6 w-6 text-neutral-100 dark:text-neutral-900"
                  aria-hidden="true"
                />
                <span className="sr-only">Close</span>
              </button>

              <motion.p
                layoutId={layout ? `category-${card.group}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.group}
              </motion.p>

              <motion.h2
                id={titleId}
                layoutId={layout ? `title-${titleText}` : undefined}
                className="text-2xl font-semibold text-neutral-700 md:text-3xl dark:text-white"
              >
                {card.student}
              </motion.h2>

              <div className="mt-6">
                <PromoVideoDialog
                  title={titleText}
                  srcWebm={card.srcWebm}
                  srcMp4={card.srcMp4}
                  posterSrc={card.posterSrc}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        ref={openBtnRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={handleOpen}
        layoutId={layout ? `card-${titleText}` : undefined}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[30rem] md:w-86 dark:bg-neutral-900"
        title={titleText}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent"
        />
        <div className="relative z-40 p-8 text-left">
          <motion.p
            layoutId={layout ? `category-${card.group}` : undefined}
            className="font-sans text-sm font-medium text-white md:text-base"
          >
            {card.group}
          </motion.p>
        </div>

        {/* Превью видео (hover/focus play, без контролов) */}
        <PromoVideoPreview
          title={titleText}
          srcWebm={card.srcWebm}
          srcMp4={card.srcMp4}
          posterSrc={card.posterSrc}
          className="inset-0"
        />

        <div className="relative z-40 p-8 mt-auto text-left">
          <motion.p
            layoutId={layout ? `title-${titleText}` : undefined}
            className="max-w-xs font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl"
          >
            {card.student}
          </motion.p>
        </div>
      </motion.button>
    </>
  );
});
