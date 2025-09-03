"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
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

export interface HeroProps extends SectionProps {
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
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      gradient = true,
      blur = true,
      title,
      subtitle,
      actions,
      titleClassName,
      subtitleClassName,
      actionsClassName,
      as = "h1",
      nativeTitle,
      ...props
    },
    ref
  ) => {
    const reduceMotion = useReducedMotion();
    const titleId = React.useId();
    const Heading = as as React.ElementType;

    return (
      <Section
        ref={ref}
        role="region"
        aria-labelledby={titleId}
        title={nativeTitle}
        className={cn(
          "relative z-0 flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background mt-10 radius",
          className
        )}
        {...props}
      >
        <Container>
          {gradient && !reduceMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 isolate z-0 flex w-screen items-start justify-center"
            >
              {blur && (
                <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />
              )}

              {/* Top line */}
              <motion.div
                initial={{ width: "15rem" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
                whileInView={{ width: "30rem" }}
                className="absolute inset-auto z-50 h-0.5 -translate-y-[10%] bg-primary motion-reduce:transform-none"
              />

              {/* Lamp effect */}
              <motion.div
                initial={{ width: "8rem" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
                whileInView={{ width: "25rem" }}
                className="absolute top-0 z-30 h-36 -translate-y-[40%] rounded-full bg-primary/70 blur-xl motion-reduce:transform-none"
              />

              {/* Main glow */}
              <motion.div
                initial={{ width: "10rem" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
                whileInView={{ width: "25rem" }}
                className="absolute inset-auto z-50 h-40 w-[25rem] -translate-y-[10%] rounded-full bg-primary opacity-80 blur-2xl"
              />

              {/* Secondary glow */}
              <motion.div
                initial={{ width: "10rem" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
                whileInView={{ width: "35rem" }}
                className="absolute inset-auto z-50 h-40 w-[28rem] translate-y-[50%] rounded-full bg-primary/60 opacity-80 blur-3xl"
              />
            </div>
          )}

          <motion.div
            initial={{ y: 100, opacity: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="container relative z-50 flex flex-1 flex-col justify-center gap-4 motion-reduce:translate-y-0"
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
                  className={cn(
                    "text-balance text-xl text-muted-foreground",
                    subtitleClassName
                  )}
                >
                  {subtitle}
                </p>
              )}

              {actions && actions.length > 0 && (
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
          </motion.div>
        </Container>
      </Section>
    );
  }
);
Hero.displayName = "Hero";

export { Hero };
