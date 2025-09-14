"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { Container, Section } from "@/shared/ui/custom";

/** Button variant type inferred from your shadcn/ui Button */
type ButtonVariant = React.ComponentProps<typeof Button>["variant"];

export interface HeroAction {
  /** Text on the button/link */
  label: React.ReactNode;
  /** Target href for the action */
  href: string;
  /** shadcn/ui Button variant */
  variant?: ButtonVariant;
  /** Next.js prefetch toggle (default: false for lighter initial network) */
  prefetch?: boolean;
}

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/** Native <section> props without the conflicting 'title' attribute */
type SectionProps = Omit<React.ComponentPropsWithoutRef<"section">, "title">;

// Тип для объекта конфигурации Hero
export type HeroConfig = {
  /** Main title content (rendered inside the heading) */
  title: React.ReactNode;
  /** Optional subtitle content */
  subtitle?: React.ReactNode;
  /** CTA buttons under the title */
  actions?: ReadonlyArray<HeroAction>;
  /** Extra classes for title */
  titleClassName?: string;
  /** Extra classes for subtitle */
  subtitleClassName?: string;
  /** Extra classes for actions container */
  actionsClassName?: string;
  /** Choose heading tag for the title (defaults to h1) */
  as?: HeadingTag;
  /** If you still need the HTML 'title' attribute (tooltip) on <section> */
  nativeTitle?: string;
  /** Show animated gradient background */
  gradient?: boolean;
  /** Add top blur overlay */
  blur?: boolean;
  /** Animation repeat */
  once?: boolean;
};

export interface HeroProps extends SectionProps {
  config: HeroConfig;
}

const TRANSITION = { ease: "easeInOut" as const, delay: 0.3, duration: 0.8 };


const HeroComponent = React.memo(({
  className,
  config,
  ...props
}: HeroProps) => {
    const {
      title,
      subtitle,
      actions,
      titleClassName = "text-5xl md:text-6xl font-extrabold",
      subtitleClassName = "text-lg md:text-xl max-w-[600px]",
      actionsClassName = "mt-8",
      as = "h1",
      nativeTitle,
      gradient = true,
      blur = true,
      once = false,
    } = config;
    const reduceMotion = useReducedMotion();
    const shouldAnimate = !reduceMotion;
    const titleId = React.useId();
    const subtitleId = React.useId();
    const Heading = as as React.ElementType;

    return (
      <Section
        role="region"
        aria-labelledby={titleId}
        aria-describedby={subtitle ? subtitleId : undefined}
        title={nativeTitle}
        className={cn(
          "mt-0 relative z-0 flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background",
          className
        )}
        {...props}
      >
        <Container>
          {/* Decorative gradient / glow — removed entirely for users with reduced motion */}
          {gradient && shouldAnimate && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 isolate z-0 flex w-full items-start justify-center"
            >
              {blur && (
                <div className="absolute top-0 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
              )}

              <LazyMotion features={domAnimation}>
                {/* Top line */}
                <m.div
                  initial={{ width: "15rem" }}
                  whileInView={{ width: "30rem" }}
                  viewport={{ once, amount: 0.4 }}
                  transition={TRANSITION}
                  className="absolute h-0.5 -translate-y-[10%] bg-primary"
                />

                {/* Lamp effect */}
                <m.div
                  initial={{ width: "8rem" }}
                  whileInView={{ width: "25rem" }}
                  viewport={{ once, amount: 0.4 }}
                  transition={TRANSITION}
                  className="absolute top-0 h-36 -translate-y-[40%] rounded-full bg-primary/70 blur-xl"
                />

                {/* Main glow */}
                <m.div
                  initial={{ width: "10rem" }}
                  whileInView={{ width: "25rem" }}
                  viewport={{ once, amount: 0.4 }}
                  transition={TRANSITION}
                  className="absolute h-40 w-[25rem] -translate-y-[10%] rounded-full bg-primary opacity-80 blur-2xl"
                />

                {/* Secondary glow */}
                <m.div
                  initial={{ width: "10rem" }}
                  whileInView={{ width: "35rem" }}
                  viewport={{ once, amount: 0.4 }}
                  transition={TRANSITION}
                  className="absolute h-40 w-[28rem] translate-y-[50%] rounded-full bg-primary/60 opacity-80 blur-3xl"
                />
              </LazyMotion>
            </div>
          )}

          <LazyMotion features={domAnimation}>
            <m.div
              initial={
                shouldAnimate ? { y: 100, opacity: 0.5 } : (false as const)
              }
              whileInView={shouldAnimate ? { y: 0, opacity: 1 } : undefined}
              viewport={shouldAnimate ? { once, amount: 0.3 } : undefined}
              transition={shouldAnimate ? TRANSITION : undefined}
              className="relative z-10 flex flex-1 flex-col justify-center gap-4"
            >
              <div className="flex flex-col items-center space-y-4 text-center">
                <Heading
                  id={titleId}
                  className={cn(
                    "scroll-m-20 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
                    titleClassName
                  )}
                >
                  {title}
                </Heading>

                {subtitle && (
                  <p
                    id={subtitleId}
                    className={cn(
                      "text-pretty text-xl text-muted-foreground",
                      subtitleClassName
                    )}
                  >
                    {subtitle}
                  </p>
                )}

                {!!actions?.length && (
                  <div
                    className={cn(
                      "flex flex-wrap items-center justify-center gap-4",
                      actionsClassName
                    )}
                  >
                    {actions.map((action, index) => (
                      <Button
                        key={`${typeof action.label === "string" ? action.label : index}-${action.href}`}
                        variant={action.variant ?? "default"}
                        asChild
                      >
                        <Link
                          href={action.href}
                          prefetch={action.prefetch ?? false}
                        >
                          {action.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </m.div>
          </LazyMotion>
        </Container>
      </Section>
    );
});

export const Hero = dynamic(() => 
  Promise.resolve(HeroComponent), 
  { ssr: false }
);
