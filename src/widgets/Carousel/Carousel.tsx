"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";
import { Container, Section } from "@/shared/ui/custom";
import type { CarouselItem } from "@/shared/config/home";
import { cn } from "@/shared/lib/utils";

export type CarouselConfig = {
  items: readonly CarouselItem[];
};

export interface CarouselProps {
  config: CarouselConfig;
  /** Включить автоматическое переключение слайдов */
  autoPlay?: boolean;
  /** Интервал автоматического переключения в миллисекундах (по умолчанию 5000) */
  autoPlayInterval?: number;
}

export const Carousel = memo(
  ({ config, autoPlay = false, autoPlayInterval = 5000 }: CarouselProps) => {
    const { items } = config;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    if (!items?.length) return null;

    // Адаптивность
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 640) {
          setItemsPerView(1); // мобильные
        } else if (window.innerWidth < 1024) {
          setItemsPerView(2); // планшеты
        } else {
          setItemsPerView(3); // десктоп
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(items.length / itemsPerView);

    // Функции навигации
    const goToNext = () => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    };

    const goToPage = (index: number) => {
      setCurrentIndex(index);
    };

    // Автоматическое переключение слайдов
    useEffect(() => {
      if (!autoPlay || totalPages <= 1) return;

      const interval = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, totalPages, currentIndex]);

    return (
      <Section aria-label="Photo carousel" className="py-12">
        <Container>
          <div className="relative">
            {/* Слайды */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div
                    key={pageIndex}
                    className={cn(
                      "w-full flex-shrink-0",
                      "grid gap-4 md:gap-6",
                      itemsPerView === 1 && "grid-cols-1",
                      itemsPerView === 2 && "grid-cols-2",
                      itemsPerView === 3 && "grid-cols-3"
                    )}
                  >
                    {items
                      .slice(
                        pageIndex * itemsPerView,
                        (pageIndex + 1) * itemsPerView
                      )
                      .map((item: CarouselItem, index: number) => (
                        <figure key={index} className="relative">
                          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                            <Image
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              src={item.img}
                              fill
                              priority={pageIndex === 0 && index < 3}
                              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                              alt={item.title || "Carousel image"}
                            />
                          </div>
                          {(item.title || item.desc) && (
                            <figcaption className="mt-3 space-y-1">
                              {item.title && (
                                <h3 className="font-medium text-foreground">
                                  {item.title}
                                </h3>
                              )}
                              {item.desc && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {item.desc}
                                </p>
                              )}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Индикаторы страниц */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={cn(
                      "h-2 rounded-full transition-all relative overflow-hidden",
                      index === currentIndex
                        ? "w-8 bg-primary/30"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Go to page ${index + 1}`}
                  >
                    {/* Прогресс-бар для активного слайда при автопроигрывании */}
                    {index === currentIndex && autoPlay && (
                      <span
                        className="absolute left-0 top-0 h-full bg-primary transition-none"
                        style={{
                          animationName: "progress",
                          animationDuration: `${autoPlayInterval}ms`,
                          animationTimingFunction: "linear",
                          animationFillMode: "forwards",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    );
  }
);
