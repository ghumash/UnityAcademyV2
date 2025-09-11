"use client";

import { Section, Container } from "@/shared/ui/custom";
import { AppAutoBreadcrumb } from "@/widgets";
import { Badge, Button, Card, CardContent, CardHeader } from "@/shared/ui";
import { GlowingEffect, TextGenerateEffect } from "@/shared/ui/lib";
import { Award, BookOpen, Clock, Play } from "lucide-react";

type IntroHeroProps = {
  level: string;
  format: string;
  duration: string;
  lessonsCount: string;
  projectsCount: string;
  price: string;
  originalPrice: string;
  title: string;
  description: string;
};

export const IntroHero = ({
  level,
  format,
  duration,
  lessonsCount,
  projectsCount,
  price,
  originalPrice,
  title,
  description,
}: IntroHeroProps) => {
  return (
    <Section className="relative overflow-hidden">
      <Container>
        <AppAutoBreadcrumb />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {level}
              </Badge>
              <Badge
                variant="outline"
                className="border-green-200 text-green-700"
              >
                {format}
              </Badge>
            </div>

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

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{lessonsCount} уроков</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span>{projectsCount} проектов</span>
              </div>

              <div className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span>{projectsCount} проектов</span>
              </div>
              <Badge>
                <Award className="h-4 w-4" />
                Сертификат
              </Badge>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="relative">
              <GlowingEffect
                glow={true}
                variant="default"
                className="rounded-xl"
                blur={20}
                spread={40}
              />
              <Card className="sticky top-8 relative">
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
                    Скидка 40%
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button size="lg" className="w-full">
                    Записаться на курс
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    Пробный урок бесплатно
                  </Button>

                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Формат:</span>
                      <span className="font-medium">{format}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
