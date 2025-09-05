// app/(components)/VideoCardsCarousel.tsx
"use client";

import React from "react";
import { Container, Section } from "@/shared/ui/custom";
import { Card, Carousel } from "@/shared/ui/lib";
import type { StudentPromo } from "@/shared/config/home";

export interface VideoCardsCarouselProps {
  title: string;
  students: readonly StudentPromo[];
}

export const VideoCardsCarousel = React.memo(function VideoCardsCarousel({
  title,
  students,
}: VideoCardsCarouselProps) {
  const items = React.useMemo(
    () =>
      students.map((promo, index) => (
        <Card
          key={`${promo.student}-${promo.group}`}
          card={promo}
          index={index}
        />
      )),
    [students]
  );

  return (
    <Section aria-label="Student promo videos">
      <Container>
        <h2
          id="student-promo-videos-heading"
          className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans"
        >
          {title}
        </h2>
        <div role="region" aria-labelledby="student-promo-videos-heading">
          <Carousel items={items} />
        </div>
      </Container>
    </Section>
  );
});