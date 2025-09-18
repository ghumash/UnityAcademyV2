"use client";

import { Section, Container } from "@/shared/ui/custom";
import { AppAutoBreadcrumb } from "@/widgets";
import { Badge, Button, Card, CardContent, CardHeader } from "@/shared/ui";
import { TextGenerateEffect } from "@/shared/ui/lib";
import { Award, BookOpen, Briefcase, Clock, Play, User, Calendar } from "lucide-react";
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
  } = config;

  const themeStyles = THEMES[theme];

  const courseInfo = [
    { 
      icon: Clock, 
      text: duration, 
      color: "bg-slate-600 hover:bg-slate-700",
      borderColor: "hover:border-slate-500",
      textColor: "hover:text-slate-600"
    },
    { 
      icon: BookOpen, 
      text: lessonsCount, 
      color: "bg-emerald-600 hover:bg-emerald-700",
      borderColor: "hover:border-emerald-500",
      textColor: "hover:text-emerald-600"
    },
    { 
      icon: Calendar, 
      text: weeklyLessonCount, 
      color: "bg-violet-600 hover:bg-violet-700",
      borderColor: "hover:border-violet-500",
      textColor: "hover:text-violet-600"
    },
    { 
      icon: Play, 
      text: projectsCount, 
      color: "bg-amber-600 hover:bg-amber-700",
      borderColor: "hover:border-amber-500",
      textColor: "hover:text-amber-600"
    },
    { 
      icon: Award, 
      text: certificate, 
      color: "bg-rose-600 hover:bg-rose-700",
      borderColor: "hover:border-rose-500",
      textColor: "hover:text-rose-600"
    },
    { 
      icon: User, 
      text: level, 
      color: "bg-sky-600 hover:bg-sky-700",
      borderColor: "hover:border-sky-500",
      textColor: "hover:text-sky-600"
    },
    { 
      icon: Briefcase, 
      text: format, 
      color: "bg-teal-600 hover:bg-teal-700",
      borderColor: "hover:border-teal-500",
      textColor: "hover:text-teal-600"
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
                    "group relative overflow-hidden rounded-xl border-2 transition-all duration-300",
                    "bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm",
                    "hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]",
                    "border-border/50",
                    "p-2 sm:p-3",
                    item.borderColor,
                    item.textColor
                  )}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 transition-opacity duration-300",
                      "bg-gradient-to-br group-hover:opacity-5"
                    )}
                  />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
                    <div className={cn(
                      "flex items-center justify-center rounded-md transition-all duration-300",
                      "group-hover:scale-110",
                      "h-6 w-6 sm:h-8 sm:w-8",
                      // На мобильных - цветной фон, на десктопе - прозрачный с hover
                      "bg-current/10 border-2 border-current/20",
                      "sm:bg-transparent sm:border-muted-foreground/30",
                      "sm:group-hover:border-current sm:group-hover:bg-current/5"
                    )}>
                      <item.icon className={cn(
                        "h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-300",
                        // На мобильных - цветные иконки, на десктопе - серые с цветным hover
                        "text-current",
                        "sm:text-muted-foreground sm:group-hover:text-current"
                      )} aria-hidden="true" />
                    </div>
                    <span className={cn(
                      "font-medium transition-colors duration-300",
                      "text-foreground",
                      "text-xs leading-tight"
                    )}>
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
