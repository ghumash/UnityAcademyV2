"use client";

import { Section, Container } from "@/shared/ui/custom";
import { CountdownTimer } from "@/entities/countdown";
import { AppAutoBreadcrumb } from "@/widgets";
import { Badge, Button, Card, CardContent, CardHeader } from "@/shared/ui";
import { TextGenerateEffect } from "@/shared/ui/lib";
import {
  Award,
  BookOpen,
  Briefcase,
  Clock,
  Play,
  User,
  Calendar,
} from "lucide-react";
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
  weeklyLessonCount: string;
  projectsCount: string;
  certificate: string;
  theme: Theme;
  slug: string;
  discountTimer: {
    title: string;
    subtitle: string;
  };
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
    weeklyLessonCount,
    projectsCount,
    certificate,
    theme,
    slug,
    discountTimer,
  } = config;

  const themeStyles = THEMES[theme];

  const courseInfo = [
    {
      icon: Clock,
      text: duration,
      iconColor: "text-white",
      bgColor: "bg-slate-600",
      borderColor: "hover:border-slate-400",
    },
    {
      icon: BookOpen,
      text: lessonsCount,
      iconColor: "text-white",
      bgColor: "bg-emerald-600",
      borderColor: "hover:border-emerald-400",
    },
    {
      icon: Calendar,
      text: weeklyLessonCount,
      iconColor: "text-white",
      bgColor: "bg-violet-600",
      borderColor: "hover:border-violet-400",
    },
    {
      icon: Play,
      text: projectsCount,
      iconColor: "text-white",
      bgColor: "bg-amber-600",
      borderColor: "hover:border-amber-400",
    },
    {
      icon: Award,
      text: certificate,
      iconColor: "text-white",
      bgColor: "bg-rose-600",
      borderColor: "hover:border-rose-400",
    },
    {
      icon: User,
      text: level,
      iconColor: "text-white",
      bgColor: "bg-sky-600",
      borderColor: "hover:border-sky-400",
    },
    {
      icon: Briefcase,
      text: format,
      iconColor: "text-white",
      bgColor: "bg-teal-600",
      borderColor: "hover:border-teal-400",
    },
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

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mt-6 sm:mt-8">
              {courseInfo.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative overflow-hidden rounded-xl border-2 border-transparent",
                    "bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm",
                    "p-2 sm:p-3",
                    "hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300",
                    item.borderColor
                  )}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-md",
                        "h-6 w-6 sm:h-8 sm:w-8",
                        item.bgColor
                      )}
                    >
                      <item.icon
                        className={cn("h-3 w-3 sm:h-4 sm:w-4", item.iconColor)}
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className={cn(
                        "font-medium text-foreground text-xs leading-tight"
                      )}
                    >
                      {item.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка (панель) */}
          <div className="relative z-10 lg:col-span-1">
            <Card className={cn("bg-card")}>
              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <span
                    className={cn("text-3xl font-bold", themeStyles.textColor)}
                  >
                    {price}
                  </span>
                  <span
                    className={cn(
                      "text-lg line-through",
                      themeStyles.subTextColor
                    )}
                  >
                    {originalPrice}
                  </span>
                </div>
                <Badge variant="destructive" className="w-fit">
                  {sale}
                </Badge>
                
                {/* Таймер скидки */}
                <CountdownTimer
                  storageKey={`course-discount-${slug}`}
                  title={discountTimer.title}
                  subtitle={discountTimer.subtitle}
                  durationDays={3}
                  size="sm"
                  colorScheme="yellow"
                  className="mt-3"
                />
              </CardHeader>

              <CardContent className="space-y-4">
                <Button size="lg" className="w-full" asChild>
                  <Link href="#form">{registerCourseButtonText}</Link>
                </Button>
                {!!registerFreeLessonButtonText.length && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    type="button"
                  >
                    {registerFreeLessonButtonText}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
};
