"use client";

import { memo } from "react";
import { Container, Section } from "@/shared/ui/custom";
import { GradientHeading } from "@/shared/ui/lib";
import { LogoCarousel } from "@/shared/ui/lib/logo-carousel";
import React from "react";
import type { StaticImageData } from "next/image";
type LogoItem = { id: number; name: string; img: string | StaticImageData };

const allLogos: LogoItem[] = [{ name: "ARDA", id: 1, img: "/images/logos/arda.jpg" }];

export type LogoCarouselSectionConfig = {
  title: string;
  subtitle: string;
};

export interface LogoCarouselSectionProps {
  config: LogoCarouselSectionConfig;
}

export const LogoCarouselSection = memo(
  ({ config }: LogoCarouselSectionProps) => {
    const { title, subtitle } = config;
    return (
      <Section id="logo-carousel" aria-labelledby="logo-carousel-title">
        <Container>
          <div className="flex flex-col items-center gap-8">
            <div className="text-center">
              <GradientHeading variant="secondary" id="logo-carousel-title">
                {title}
              </GradientHeading>
              <GradientHeading size="xxl">{subtitle}</GradientHeading>
            </div>

            <div role="region" aria-label="Partner and technology logos">
              <LogoCarousel columnCount={allLogos?.length} logos={allLogos} />
            </div>
          </div>
        </Container>
      </Section>
    );
  }
);
