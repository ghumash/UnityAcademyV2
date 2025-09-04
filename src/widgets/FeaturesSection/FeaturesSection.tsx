import { memo, type ElementType } from "react";
import { cn } from "@/shared/lib/utils";
import { Container, Section } from "@/shared/ui/custom";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

type FeatureItem = {
  title: string;
  description: string;
  Icon: ElementType;
};

const FEATURES: readonly FeatureItem[] = [
  {
    title: "Built for developers",
    description:
      "Built for engineers, developers, dreamers, thinkers and doers.",
    Icon: IconTerminal2,
  },
  {
    title: "Ease of use",
    description:
      "It's as easy as using an Apple, and as expensive as buying one.",
    Icon: IconEaseInOut,
  },
  {
    title: "Pricing like no other",
    description:
      "Our prices are best in the market. No cap, no lock, no credit card required.",
    Icon: IconCurrencyDollar,
  },
  {
    title: "100% Uptime guarantee",
    description: "We just cannot be taken down by anyone.",
    Icon: IconCloud,
  },
  {
    title: "Multi-tenant Architecture",
    description: "You can simply share passwords instead of buying new seats",
    Icon: IconRouteAltLeft,
  },
  {
    title: "24/7 Customer Support",
    description:
      "We are available 100% of the time. At least our AI Agents are.",
    Icon: IconHelp,
  },
  {
    title: "Money back guarantee",
    description: "If you do not like EveryAI, we will convince you to like us.",
    Icon: IconAdjustmentsBolt,
  },
  {
    title: "And everything else",
    description: "I just ran out of copy ideas. Accept my sincere apologies",
    Icon: IconHeart,
  },
] as const;

export function FeaturesSection() {
  return (
    <Section>
      <Container>
        {/* SEO/A11y heading without affecting UI */}
        <h2 id="features-heading" className="sr-only">
          Features
        </h2>
        <ul
          role="list"
          aria-labelledby="features-heading"
          className="relative z-10 grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((feature, idx) => (
            <MemoFeature key={feature.title} {...feature} idx={idx} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

type FeatureProps = FeatureItem & { idx: number };

const Feature = ({ title, description, Icon, idx }: FeatureProps) => {
  const isFirstRowLG = idx < 4;
  const isFirstColLG = idx % 4 === 0;

  return (
    <li
      className={cn(
        "group/feature relative flex flex-col py-10 lg:border-r dark:border-neutral-800",
        isFirstColLG && "lg:border-l dark:border-neutral-800",
        isFirstRowLG && "lg:border-b dark:border-neutral-800"
      )}
    >
      {/* Hover gradient overlay (direction depends on row) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full opacity-0 transition duration-200 group-hover/feature:opacity-100",
          isFirstRowLG
            ? "bg-gradient-to-t from-neutral-100 to-transparent dark:from-neutral-800"
            : "bg-gradient-to-b from-neutral-100 to-transparent dark:from-neutral-800"
        )}
        aria-hidden="true"
      />

      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
        <Icon aria-hidden size={28} />
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

      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </li>
  );
};

Feature.displayName = "Feature";

const MemoFeature = memo(Feature);
