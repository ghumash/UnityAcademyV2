"use client";

import { Section, Container } from "@/shared/ui/custom";
import { AppAutoBreadcrumb } from "@/widgets";
import { Badge, Button, Card, CardContent, CardHeader } from "@/shared/ui";
import { TextGenerateEffect } from "@/shared/ui/lib";
import { Award, BookOpen, Briefcase, Clock, Play, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { THEMES, type Theme } from "@/widgets/Courses";
import Link from "next/link";

type IntroHeroConfig = {
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  sale: string;
  registerCourseButtonText: string;
  registerFreeLessonButtonText: string;
  format: string;
  level: string;
  duration: string;
  lessonsCount: string;
  projectsCount: string;
  certificate: string;
  theme: Theme;
};

type IntroHeroProps = {
  config: IntroHeroConfig;
};

export const IntroHero = ({ config }: IntroHeroProps) => {
  const {
    title,
    description,
    price,
    originalPrice,
    sale,
    registerCourseButtonText,
    registerFreeLessonButtonText,
    format,
    level,
    duration,
    lessonsCount,
    projectsCount,
    certificate,
    theme,
  } = config;

  const themeStyles = THEMES[theme];

  const courseInfo = [
    { icon: Clock, text: duration },
    { icon: BookOpen, text: lessonsCount },
    { icon: Play, text: projectsCount },
    { icon: Award, text: certificate },
    { icon: User, text: level },
    { icon: Briefcase, text: format },
  ];

  return (
    <Section>
      <Container>
        <AppAutoBreadcrumb />

        <div
          className={cn(
            "relative group mt-8 grid gap-8 lg:grid-cols-3 rounded-2xl border-2 bg-gradient-to-br p-6 sm:p-8 backdrop-blur-xl",
            "shadow-2xl transition-all duration-500 ease-out overflow-hidden",
            // аккуратные ховеры без резких скачков
            "motion-safe:hover:shadow-2xl motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02]",
            themeStyles.button,
            themeStyles.borderHoverShadow
          )}
        >
          {/* Sweeping light */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 -translate-x-full rounded-2xl transition-transform duration-1000 ease-out",
              themeStyles.sweep,
              "motion-safe:group-hover:translate-x-full"
            )}
          />

          {/* Hover overlay */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
              themeStyles.hoverOverlay,
              "motion-safe:group-hover:opacity-100"
            )}
          />

          {/* Левая колонка */}
          <div className="relative z-10 lg:col-span-2">
            <TextGenerateEffect
              as="h1"
              words={title}
              className={cn(
                "mb-4 text-4xl font-bold md:text-5xl lg:text-6xl",
                // Цвета берём из темы (там уже настроены light/dark)
                themeStyles.textColor
              )}
              duration={0.3}
              staggerDelay={0.08}
            />

            <p
              className={cn(
                "mb-6 text-lg leading-relaxed",
                themeStyles.subTextColor
              )}
            >
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              {courseInfo.map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn(
                    "inline-flex items-center gap-2",
                    // вместо белых полупрозрачностей используем токены
                    "bg-muted/60 text-foreground/80 ring-1 ring-border backdrop-blur"
                  )}
                >
                  <item.icon className="h-4 w-4 text-foreground/70" aria-hidden="true" />
                  {item.text}
                </Badge>
              ))}
            </div>
          </div>

          {/* Правая колонка (панель) */}
          <div className="relative z-10 lg:col-span-1">
            <Card className={cn("bg-card")}>
              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <span className={cn("text-3xl font-bold", themeStyles.textColor)}>
                    {price}
                  </span>
                  <span className={cn("text-lg line-through", themeStyles.subTextColor)}>
                    {originalPrice}
                  </span>
                </div>
                <Badge variant="destructive" className="w-fit">
                  {sale}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <Button size="lg" className="w-full" asChild>
                  <Link href="#form">{registerCourseButtonText}</Link>
                </Button>

                <Button variant="outline" size="lg" className="w-full" type="button">
                  {registerFreeLessonButtonText}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
};
