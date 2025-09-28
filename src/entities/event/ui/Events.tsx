"use client";

import React, { memo } from "react";
import { Container, Section } from "@/shared/ui/custom";
import { EventCard } from "./EventCard";
import type { EventsProps } from "../model/types";
import { cn } from "@/shared/lib";

export const Events = memo(({
  title,
  soon,
  list,
  cardLabels,
}: EventsProps) => {
  return (
    <Section>
      <Container>
        <div className="relative">
          {/* Heading for SEO/A11y */}
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground sm:mb-10 sm:text-3xl">
            {title}
          </h2>

          {/* Grid of event cards */}
          <div
            className={cn(
              "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3"
            )}
          >
            {list.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                soon={soon}
                cardLabels={cardLabels}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
});
