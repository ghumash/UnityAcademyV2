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

type CarouselItem = {
  img: string;
  title: string;
  /** Short, human description for screen readers and SEO */
  desc: string;
  /** Unique id for slider value & a11y hooks */
  sliderName: string;
};

const items: readonly CarouselItem[] = [
  {
    img: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bridge",
    desc: "A breathtaking city view with countless night lights over a bridge.",
    sliderName: "bridge",
  },
  {
    img: "https://images.unsplash.com/photo-1518972734183-c5b490a7c637?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Mountains View",
    desc: "A serene lake mirroring surrounding mountains and trees.",
    sliderName: "mountains",
  },
  {
    img: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Autumn",
    desc: "A winding path through a forest of vibrant autumn foliage.",
    sliderName: "autumn",
  },
  {
    img: "https://images.unsplash.com/photo-1628965882741-570e75becd5d?q=80&w=687&auto=format&fit=crop",
    title: "Foggy",
    sliderName: "foggy",
    desc: "Golden fog rolling across a quiet forest at sunrise.",
  },
] as const;

export function Carousel() {
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
