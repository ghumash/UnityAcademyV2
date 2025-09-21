"use client";

import React from "react";
import { Container, Section } from "@/shared/ui/custom";
import { Card, Carousel } from "@/shared/ui/lib";
import type { StudentPromo } from "@/shared/config/home";

export type VideoCardsCarouselConfig = {
  display: boolean;
  title: string;
  students: readonly StudentPromo[];
};

export interface VideoCardsCarouselProps {
  config: VideoCardsCarouselConfig;
}

export const VideoCardsCarousel = React.memo(
  ({ config }: VideoCardsCarouselProps) => {
    const { display, title, students } = config;

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

    if (!display) return null;

    return (
      <Section aria-label="Student promo videos">
        <Container>
          <h2
            id="student-promo-videos-heading"
            className="mb-8 sm:mb-10 text-2xl sm:text-3xl font-semibold tracking-tight text-white"
          >
            {title}
          </h2>
          <div role="region" aria-labelledby="student-promo-videos-heading">
            <Carousel items={items} />
          </div>
        </Container>
      </Section>
    );
  }
);
