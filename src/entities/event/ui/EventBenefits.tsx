"use client";

import React from "react";
import { Gift } from "lucide-react";
import { LazyMotion, domAnimation, m } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { Section, Container } from "@/shared/ui/custom";

interface Benefit {
  title: string;
  description: string;
}

interface EventBenefitsProps {
  title: string;
  list: Benefit[];
  benefitsLabels: {
    subtitle: string;
  };
}

const getBenefitColors = (index: number) => {
  const colors = [
    {
      bg: "from-blue-500/10 to-cyan-500/10",
      border: "border-blue-200 dark:border-blue-800",
      icon: "text-blue-600 dark:text-blue-400",
      glow: "group-hover:shadow-blue-500/20",
    },
    {
      bg: "from-green-500/10 to-emerald-500/10",
      border: "border-green-200 dark:border-green-800",
      icon: "text-green-600 dark:text-green-400",
      glow: "group-hover:shadow-green-500/20",
    },
    {
      bg: "from-purple-500/10 to-pink-500/10",
      border: "border-purple-200 dark:border-purple-800",
      icon: "text-purple-600 dark:text-purple-400",
      glow: "group-hover:shadow-purple-500/20",
    },
    {
      bg: "from-orange-500/10 to-red-500/10",
      border: "border-orange-200 dark:border-orange-800",
      icon: "text-orange-600 dark:text-orange-400",
      glow: "group-hover:shadow-orange-500/20",
    },
    {
      bg: "from-indigo-500/10 to-blue-500/10",
      border: "border-indigo-200 dark:border-indigo-800",
      icon: "text-indigo-600 dark:text-indigo-400",
      glow: "group-hover:shadow-indigo-500/20",
    },
    {
      bg: "from-pink-500/10 to-rose-500/10",
      border: "border-pink-200 dark:border-pink-800",
      icon: "text-pink-600 dark:text-pink-400",
      glow: "group-hover:shadow-pink-500/20",
    },
  ];

  return colors[index % colors.length];
};

export const EventBenefits: React.FC<EventBenefitsProps> = ({
  title,
  list,
  benefitsLabels,
}) => {
  if (!list.length) return null;

  return (
    <LazyMotion features={domAnimation}>
    <Section>
      <Container>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {benefitsLabels.subtitle}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((benefit, index) => {
              const colors = getBenefitColors(index);

              return (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl border p-8 shadow-sm transition-all duration-300 h-full flex flex-col",
                      "hover:shadow-lg hover:-translate-y-1",
                      colors.border,
                      colors.glow
                    )}
                  >
                    {/* Background Gradient */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity duration-300",
                        colors.bg
                      )}
                    />

                    <div className="relative z-10 space-y-4">
                      <div className="inline-flex">
                        <div
                          className={cn(
                            "rounded-xl p-3 bg-background/80 backdrop-blur-sm border transition-all duration-300",
                            "group-hover:scale-110 group-hover:rotate-3",
                            colors.border
                          )}
                        >
                          <Gift className={cn("w-6 h-6", colors.icon)} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>

                      {/* Number Badge */}
                      <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                        <span className="text-4xl font-bold text-primary">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                </m.div>
              );
            })}
          </div>

        </m.div>
      </Container>
    </Section>
    </LazyMotion>
  );
};
