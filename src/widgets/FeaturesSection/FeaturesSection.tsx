"use client"

import { memo } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/shared/lib/utils";
import { Container, Section } from "@/shared/ui/custom";
import type { FeatureItem } from "@/shared/config/home";

export type FeaturesSectionConfig = {
  features: readonly FeatureItem[];
};

export interface FeaturesSectionProps {
  config: FeaturesSectionConfig;
}

const FeaturesSectionComponent = memo(({ config }: FeaturesSectionProps) => {
  const { features } = config;
  const total = features.length;

  return (
    <Section>
      <Container>
        <h2
          id="features-heading"
          className="mb-8 sm:mb-10 text-2xl sm:text-3xl font-semibold tracking-tight text-white"
        >
          Ինչու՞ ընտրել մեզ
        </h2>

        <ul
          role="list"
          aria-labelledby="features-heading"
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, idx) => (
            <MemoFeature
              key={feature.title}
              {...feature}
              idx={idx}
              total={total}
            />
          ))}
        </ul>
      </Container>
    </Section>
  );
});

export const FeaturesSection = dynamic(
  () => Promise.resolve(FeaturesSectionComponent),
  { ssr: false }
);

type FeatureProps = FeatureItem & { idx: number; total: number };

const Feature = memo(({ title, description, icon }: FeatureProps) => {
  return (
    <li
      className={cn(
        "group/feature relative flex flex-col py-10 lg:border-r dark:border-neutral-800",
        "lg:border dark:border-neutral-800"
      )}
    >
      {/* Hover gradient overlay (direction depends on row) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full opacity-0 transition duration-200 group-hover/feature:opacity-100",
          "bg-gradient-to-b from-neutral-100 to-transparent dark:from-neutral-800"
        )}
        aria-hidden="true"
      />

      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>

      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <span
          className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700"
          aria-hidden="true"
        />
        <h3 className="inline-block translate-x-0 text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
          {title}
        </h3>
      </div>

      <p className="relative z-10 px-10 text-sm text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </li>
  );
});

const MemoFeature = Feature;
