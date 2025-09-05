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

export interface CarouselProps {
  items: readonly CarouselItem[];
}

export function Carousel({ items }: CarouselProps) {
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
                    {/* Visually hidden long description for screen readers */}
                    <figcaption id={captionId} className="sr-only">
                      {item.title}. {item.desc}
                    </figcaption>
                  </figure>
                </SliderWrapper>
              );
            })}
          </SliderContent>

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
                <p className="text-sm font-medium line-clamp-2">{item.desc}</p>
              </SliderBtn>
            ))}
          </SliderBtnGroup>
        </ProgressSlider>
      </Container>
    </Section>
  );
}
