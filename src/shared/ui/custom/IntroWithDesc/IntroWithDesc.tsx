"use client";

import { memo } from "react";
import { cn } from "@/shared/lib";
import { Container, Section } from "@/shared/ui/custom";
import { TextGenerateEffect, TextHoverEffect } from "@/shared/ui/lib";

type IntroSectionConfig = {
  title: string;
  description: string;
  description_2: string;
  description_3: string;
};

export type IntroWithDescProps = {
  config: IntroSectionConfig;
  className?: string;
};

export const IntroWithDesc = memo(
  ({ config, className }: IntroWithDescProps) => {
    const { title, description, description_2, description_3 } = config;

    return (
      <div className={cn(className)}>
        <Container className="h-[200px]">
          <TextHoverEffect text={title} as="h1" />
        </Container>
        <Section>
          <Container className="space-y-4">
            <TextGenerateEffect
              as="h2"
              duration={2}
              filter={false}
              words={description}
            />
            <TextGenerateEffect
              as="p"
              startDelay={1}
              duration={2}
              filter={false}
              words={description_2}
              className="text-muted-foreground"
            />
            <TextGenerateEffect
              as="p"
              startDelay={5}
              duration={2}
              filter={false}
              words={description_3}
              className="text-muted-foreground"
            />
          </Container>
        </Section>
      </div>
    );
  }
);
