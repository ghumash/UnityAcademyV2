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
          className="sm:mb-10 text-2xl sm:text-3xl font-semibold tracking-tight text-white"
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
