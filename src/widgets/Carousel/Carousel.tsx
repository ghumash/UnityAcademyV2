"use client";

import * as React from "react";
import Image from "next/image";
import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from "@/shared/ui/lib";
import { Container, Section } from "@/shared/ui/custom";
import type { CarouselItem } from "@/shared/config/home";
import { cn } from "@/shared/lib/utils";

export interface CarouselProps {
  items: readonly CarouselItem[];
  hideFooter?: boolean;
  /** Стиль индикатора, когда footer скрыт */
  indicatorVariant?: "bars" | "pills";
  /** Позиция индикатора */
  indicatorPosition?: "bottom" | "overlay";
}

export function Carousel({
  items,
  hideFooter,
  indicatorVariant = "bars",
  indicatorPosition = "overlay",
}: CarouselProps) {
  if (!items?.length) return null;

  const baseGroupPos =
    indicatorPosition === "bottom"
      ? "relative mt-4 flex justify-center"
      : "absolute bottom-4 left-1/2 -translate-x-1/2";

  return (
    <Section aria-label="Featured photo carousel">
      <Container>
        <ProgressSlider
          vertical={false}
          activeSlider={items[0].sliderName}
          aria-roledescription="carousel"
          aria-label="Featured photos"
        >
          <SliderContent>
            {items.map((item, index) => {
              const captionId = `${item.sliderName}-caption`;
              return (
                <SliderWrapper
                  key={item.sliderName}
                  value={item.sliderName}
                  aria-labelledby={captionId}
                >
                  <figure className="relative">
                    <Image
                      className="rounded-xl w-full h-[450px] 2xl:h-[500px] object-cover"
                      src={item.img}
                      width={1900}
                      height={1080}
                      priority={index === 0}
                      sizes="(min-width:1536px) 1280px, (min-width:1280px) 1024px, (min-width:1024px) 896px, 100vw"
                      alt={item.title}
                    />
                    <figcaption id={captionId} className="sr-only">
                      {item.title}. {item.desc}
                    </figcaption>
                  </figure>
                </SliderWrapper>
              );
            })}
          </SliderContent>

          {hideFooter ? (
            <SliderBtnGroup
              aria-label="Slide navigation"
              className={cn(
                baseGroupPos,
                "flex items-center gap-2 pointer-events-auto select-none"
              )}
            >
              {items.map((item) => {
                if (indicatorVariant === "bars") {
                  // ▬ Чуть больше и с круглыми краями, без бордера
                  return (
                    <SliderBtn
                      key={item.sliderName}
                      value={item.sliderName}
                      aria-label={`Show slide: ${item.title}`}
                      aria-describedby={`${item.sliderName}-caption`}
                      className={cn(
                        "p-0 h-2 w-8 md:w-10 rounded-full transition",
                        "bg-foreground/35 hover:bg-foreground/60",
                        "data-[state=active]:bg-foreground aria-[selected=true]:bg-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground/50"
                      )}
                    >
                      <span className="sr-only">{item.title}</span>
                    </SliderBtn>
                  );
                }

                // indicatorVariant === "pills"
                return (
                  <SliderBtn
                    key={item.sliderName}
                    value={item.sliderName}
                    aria-label={`Show slide: ${item.title}`}
                    aria-describedby={`${item.sliderName}-caption`}
                    className={cn(
                      "p-0 h-6 px-3 rounded-full text-xs font-medium transition",
                      "bg-foreground/[0.08] hover:bg-foreground/[0.16]",
                      "data-[state=active]:bg-foreground data-[state=active]:text-background",
                      "aria-[selected=true]:bg-foreground aria-[selected=true]:text-background",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground/50"
                    )}
                  >
                    {/* Без текста — только форму оставляем; делаем чуть шире */}
                    <span className="sr-only">{item.title}</span>
                    <span aria-hidden className="block w-4 md:w-5" />
                  </SliderBtn>
                );
              })}
            </SliderBtnGroup>
          ) : (
            <SliderBtnGroup className="absolute bottom-0 h-fit text-black dark:text-white bg-white/40 dark:bg-black/40 backdrop-blur-md overflow-hidden grid grid-cols-2 md:grid-cols-4 rounded-md">
              {items.map((item) => (
                <SliderBtn
                  key={item.sliderName}
                  value={item.sliderName}
                  aria-label={`Show slide: ${item.title}`}
                  aria-describedby={`${item.sliderName}-caption`}
                  className="text-left cursor-pointer p-3 border-r focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800 dark:focus-visible:ring-gray-200"
                  progressBarClass="h-full bg-white dark:bg-black"
                >
                  <h4 className="relative px-4 rounded-full w-fit bg-gray-900 text-white dark:bg-white dark:text-black mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm font-medium line-clamp-2">
                    {item.desc}
                  </p>
                </SliderBtn>
              ))}
            </SliderBtnGroup>
          )}
        </ProgressSlider>
      </Container>
    </Section>
  );
}
