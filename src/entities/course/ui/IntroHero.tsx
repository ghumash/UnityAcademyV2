"use client";

import { Section, Container } from "@/shared/ui/custom";
import { AppAutoBreadcrumb } from "@/widgets";
import { Badge, Button, Card, CardContent, CardHeader } from "@/shared/ui";
import { TextGenerateEffect } from "@/shared/ui/lib";
import { Award, BookOpen, Briefcase, Clock, Play, User } from "lucide-react";

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
  } = config;

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
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TextGenerateEffect
              as="h1"
              words={title}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              duration={0.3}
              staggerDelay={0.08}
            />
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {courseInfo.map((item, index) => (
                <Badge variant="secondary" key={index}>
                  <item.icon className="h-4 w-4" />
                  {item.text}
                </Badge>
              ))}
            </div>
          </div>
          {/* Боковая панель */}
          <div className="lg:col-span-1">
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-primary">
                      {price}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {originalPrice}
                    </span>
                  </div>
                  <Badge variant="destructive" className="w-fit">
                    {sale}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button size="lg" className="w-full">
                    {registerCourseButtonText}
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    {registerFreeLessonButtonText}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
