// app/(components)/VideoCardsCarousel.tsx
"use client";

import React from "react";
import { Container, Section } from "@/shared/ui/custom";
import { Card, Carousel } from "@/shared/ui/lib";

/** Данные промо-роликов студентов */
export type StudentPromo = {
  student: string; // Имя студента
  group: string; // Направление/группа (JavaScript, Graphic Design и т.д.)
  srcWebm: string; // Основной источник (webm)
  srcMp4?: string; // Фолбэк (mp4)
  posterSrc?: string; // Постер превью (jpg/png/webp)
};

const PROMOS: Readonly<StudentPromo[]> = [
  {
    student: "Անի Մկրտչյան",
    group: "JavaScript",
    srcWebm: "/media/students/ani-js.webm",
    srcMp4: "/videos/video-1.mp4",
    posterSrc: "/media/students/ani-js.jpg",
  },
  {
    student: "Գուրո Ղազարյան",
    group: "Graphic Design",
    srcWebm: "/media/students/guro-gd.webm",
    srcMp4: "/videos/video-1.mp4",
    posterSrc: "/media/students/guro-gd.jpg",
  },
  {
    student: "Narek Petrosyan",
    group: "Android",
    srcWebm: "/media/students/narek-android.webm",
    srcMp4: "/videos/video-1.mp4",
    posterSrc: "/media/students/narek-android.jpg",
  },
  {
    student: "Mariam Sargsyan",
    group: "AI Fundamentals",
    srcWebm: "/media/students/mariam-ai.webm",
    srcMp4: "/videos/video-1.mp4",
    posterSrc: "/media/students/mariam-ai.jpg",
  },
  {
    student: "Arman Hovhannisyan",
    group: "SMM",
    srcWebm: "/media/students/arman-smm.webm",
    srcMp4: "/videos/video-1.mp4",
  },
  {
    student: "Լիլիթ Հարությունյան",
    group: "Scratch (Kids)",
    srcWebm: "/media/students/lilit-scratch.webm",
    srcMp4: "/videos/video-1.mp4",
  },
] as const;

export const VideoCardsCarousel = React.memo(function VideoCardsCarousel() {
  const items = React.useMemo(
    () =>
      PROMOS.map((promo, index) => (
        <Card
          key={`${promo.student}-${promo.group}`}
          card={promo}
          index={index}
        />
      )),
    []
  );

  return (
    <Section aria-label="Student promo videos">
      <Container>
        <h2
          id="student-promo-videos-heading"
          className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans"
        >
          Student promo videos
        </h2>
        <div role="region" aria-labelledby="student-promo-videos-heading">
          <Carousel items={items} />
        </div>
      </Container>
    </Section>
  );
});
