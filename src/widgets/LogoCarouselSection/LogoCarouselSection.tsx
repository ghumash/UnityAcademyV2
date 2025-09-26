"use client";

import { memo } from "react";
import { Container, Section } from "@/shared/ui/custom";
import { GradientHeading } from "@/shared/ui/lib";
import { LogoCarousel } from "@/shared/ui/lib/logo-carousel";
import type { LogoItem } from "@/shared/config/home";

export type LogoCarouselSectionConfig = {
  title: string;
  subtitle: string;
  logos: LogoItem[];
};

export interface LogoCarouselSectionProps {
  config: LogoCarouselSectionConfig;
}
export const LogoCarouselSection = memo(
  ({ config }: LogoCarouselSectionProps) => {
    const { title, subtitle, logos } = config;
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
              <LogoCarousel
                columnCount={Math.min(logos?.length || 0, 4)}
                logos={logos || []}
              />
            </div>
          </div>
        </Container>
      </Section>
    );
  }
);
