"use client";

import { Section, Container } from "@/shared/ui/custom";
import { AppAutoBreadcrumb } from "@/widgets";
import { Badge, Button, Card, CardContent, CardHeader } from "@/shared/ui";
import { TextGenerateEffect } from "@/shared/ui/lib";
import { Award, BookOpen, Briefcase, Clock, Play, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { THEMES, type Theme } from "@/widgets/Courses";
import Link from "next/link";

// Тип для объекта конфигурации
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

// Тип для пропсов компонента
type IntroHeroProps = {
  config: IntroHeroConfig;
};

// Компонент с использованием единого объекта конфигурации
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

  // Массив с информацией о курсе для отображения в виде бейджей
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
            "relative group mt-8 grid gap-8 lg:grid-cols-3 rounded-2xl border-2 bg-gradient-to-br backdrop-blur-xl p-6 sm:p-8",
            "shadow-2xl hover:shadow-2xl",
            "transition-all duration-500 ease-out overflow-hidden",
            themeStyles.button,
            themeStyles.borderHoverShadow
          )}
        >
          {/* Sweeping light effect */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 -translate-x-full transition-transform duration-1000 ease-out rounded-2xl",
              themeStyles.sweep,
              "group-hover:translate-x-full"
            )}
          />

          {/* Hover overlay */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
              themeStyles.hoverOverlay,
              "group-hover:opacity-100"
            )}
          />

          <div className="relative z-10 lg:col-span-2">
            <TextGenerateEffect
              as="h1"
              words={title}
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold mb-4",
                themeStyles.textColor
              )}
              duration={0.3}
              staggerDelay={0.08}
            />
            <p
              className={cn(
                "text-lg mb-6 leading-relaxed",
                themeStyles.subTextColor
              )}
            >
              {description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {courseInfo.map((item, index) => (
                <Badge
                  variant="secondary"
                  key={index}
                  className="bg-white/5 ring-1 ring-white/10 backdrop-blur text-white/80"
                >
                  <item.icon className="h-4 w-4" />
                  {item.text}
                </Badge>
              ))}
            </div>
          </div>
          {/* Боковая панель */}
          <div className="relative z-10 lg:col-span-1">
            <Card className="border-0 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
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
              </CardHeader>
              <CardContent className="space-y-4">
                <Button size="lg" className="w-full">
                  <Link href="#form">{registerCourseButtonText}</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full">
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
