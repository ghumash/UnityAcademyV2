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
  label: React.ReactNode;
  href: string;
  variant?: ButtonVariant;
  prefetch?: boolean;
}

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type SectionProps = Omit<React.ComponentPropsWithoutRef<"section">, "title">;

export type HeroConfig = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: ReadonlyArray<HeroAction>;
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
  as?: HeadingTag;
  nativeTitle?: string;
  gradient?: boolean;
  blur?: boolean;
  once?: boolean;
};

export interface HeroProps extends SectionProps {
  config: HeroConfig;
}

const TRANSITION = { ease: "easeInOut" as const, delay: 0.3, duration: 0.8 };

const HeroComponent = React.memo(({ className, config, ...props }: HeroProps) => {
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
        {/* Decorative gradient / glow (motion-safe) */}
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
                className="absolute h-0.5 -translate-y-[10%] bg-amber-400 dark:bg-primary"
              />

              {/* Lamp (warm for light, brand for dark) */}
              <m.div
                initial={{ width: "8rem" }}
                whileInView={{ width: "25rem" }}
                viewport={{ once, amount: 0.4 }}
                transition={TRANSITION}
                className="absolute top-0 h-36 -translate-y-[40%] rounded-full blur-xl bg-amber-300/70 dark:bg-primary/70"
              />

              {/* Main glow */}
              <m.div
                initial={{ width: "10rem" }}
                whileInView={{ width: "25rem" }}
                viewport={{ once, amount: 0.4 }}
                transition={TRANSITION}
                className="absolute h-40 w-[25rem] -translate-y-[10%] rounded-full opacity-80 blur-2xl bg-amber-400 dark:bg-primary"
              />

              {/* Secondary glow */}
              <m.div
                initial={{ width: "10rem" }}
                whileInView={{ width: "35rem" }}
                viewport={{ once, amount: 0.4 }}
                transition={TRANSITION}
                className="absolute h-40 w-[28rem] translate-y-[50%] rounded-full opacity-80 blur-3xl bg-amber-200/80 dark:bg-primary/60"
              />
            </LazyMotion>
          </div>
        )}

        <LazyMotion features={domAnimation}>
          <m.div
            initial={shouldAnimate ? { y: 100, opacity: 0.5 } : (false as const)}
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
                  className={cn("text-pretty text-xl text-muted-foreground", subtitleClassName)}
                >
                  {subtitle}
                </p>
              )}

              {!!actions?.length && (
                <div className={cn("flex flex-wrap items-center justify-center gap-4", actionsClassName)}>
                  {actions.map((action, index) => (
                    <Button
                      key={`${typeof action.label === "string" ? action.label : index}-${action.href}`}
                      variant={action.variant ?? "default"}
                      asChild
                    >
                      <Link href={action.href} prefetch={action.prefetch ?? false}>
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

export const Hero = dynamic(() => Promise.resolve(HeroComponent), { ssr: false });
