"use client";
import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Container, Section } from "@/shared/ui/custom";
import {
  ArrowRight,
  Code,
  Brain,
  Palette,
  Bot,
  Globe,
  MapPin,
  Share2,
  Clock,
  GraduationCap,
  Megaphone,
  Users,
  Smartphone,
} from "lucide-react";
import type { Course, CoursesProps, Level, Format } from "./types";
import { THEMES } from "./theme";

const cn = (...classes: Array<string | false | null | undefined>) =>
  twMerge(clsx(classes));

const ICONS = {
  Code,
  Brain,
  Palette,
  Bot,
  Globe,
  MapPin,
  Share2,
  Clock,
  GraduationCap,
  Megaphone,
  Users,
  Smartphone,
};

function formatIconByMode(mode: Format) {
  if (mode === "online") return Globe;
  if (mode === "offline") return MapPin;
  return Share2; // hybrid
}

function levelLabel(
  level: Level,
  levels: { beginner: string; intermediate: string; advanced: string }
) {
  if (level === "beginner") return levels.beginner;
  if (level === "intermediate") return levels.intermediate;
  return levels.advanced;
}

function formatLabel(
  format: Format,
  formats: { online: string; offline: string; hybrid: string }
) {
  if (format === "online") return formats.online;
  if (format === "offline") return formats.offline;
  return formats.hybrid;
}

function CourseCard({
  course,
  levels,
  formats,
}: {
  course: Course;
  levels: { beginner: string; intermediate: string; advanced: string };
  formats: { online: string; offline: string; hybrid: string };
}) {
  const {
    title,
    description,
    duration,
    level,
    format,
    icon = "Code",
    theme = "indigo",
    href,
  } = course;

  const t = THEMES[theme];
  const Icon = ICONS[icon] ?? Code;
  const FormatIcon = formatIconByMode(format);

  const CardTag = href ? "a" : ("article" as const);

  return (
    <CardTag
      {...(href ? { href } : {})}
      className={cn(
        "group relative w-full rounded-2xl border-2 bg-gradient-to-br backdrop-blur-xl p-5 sm:p-6",
        "shadow-2xl hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95",
        "transition-all duration-500 ease-out overflow-hidden focus:outline-none",
        t.button,
        t.borderHoverShadow,
        href &&
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/40"
      )}
      aria-label={title}
    >
      {/* sweeping light */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -translate-x-full transition-transform duration-1000 ease-out",
          t.sweep,
          "group-hover:translate-x-full"
        )}
      />

      {/* hover overlay */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
          t.hoverOverlay,
          "group-hover:opacity-100"
        )}
      />

      {/* content */}
      <div className="relative z-10 flex items-start gap-4">
        {/* icon bubble */}
        <div
          className={cn(
            "shrink-0 p-3 rounded-lg bg-gradient-to-br backdrop-blur-sm transition-all duration-300",
            t.iconBg
          )}
          aria-hidden="true"
        >
          <Icon
            className={cn(
              "w-6 h-6 sm:w-7 sm:h-7 drop-shadow-lg transition-all duration-300 group-hover:scale-110",
              t.iconColor
            )}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className={cn("text-lg sm:text-xl font-bold", t.textColor)}>
            {title}
          </h3>
          <p
            className={cn(
              "mt-1 text-sm leading-6 line-clamp-3",
              t.subTextColor
            )}
          >
            {description}
          </p>

          {/* meta */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2 py-1 bg-white/5",
                "ring-1 ring-white/10 backdrop-blur"
              )}
            >
              <Clock className="w-4 h-4 opacity-80" aria-hidden="true" />
              {duration}
            </span>

            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2 py-1 bg-white/5",
                "ring-1 ring-white/10 backdrop-blur"
              )}
            >
              <GraduationCap
                className="w-4 h-4 opacity-80"
                aria-hidden="true"
              />
              {levelLabel(level, levels)}
            </span>

            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2 py-1 bg-white/5",
                "ring-1 ring-white/10 backdrop-blur capitalize"
              )}
            >
              <FormatIcon className="w-4 h-4 opacity-80" aria-hidden="true" />
              {formatLabel(format, formats)}
            </span>
          </div>
        </div>

        {/* arrow */}
        <div
          aria-hidden="true"
          className={cn(
            "ml-auto self-center opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1",
            "transition-all duration-300"
          )}
        >
          <ArrowRight className={cn("w-5 h-5", t.arrowColor)} />
        </div>
      </div>
    </CardTag>
  );
}

export function Courses({ title, list, levels, formats }: CoursesProps) {
  return (
    <Section>
      <Container>
        <div className="relative">
          {/* Heading for SEO/A11y */}
          <h2 className="mb-8 sm:mb-10 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>

          {/* Grid of course cards */}
          <div
            className={cn(
              "grid gap-6 sm:gap-7",
              "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            )}
          >
            {list.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                levels={levels}
                formats={formats}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Usage:
 * <Courses />
 * or
 * <Courses courses={[{ id:'js', title:'JavaScript', description:'...', duration:'3 месяца', level:'beginner', format:'offline', icon:'Code', theme:'indigo', href:'/courses/js' }]} />
 *
 * Icons: Code, Brain, Palette, Bot, Globe, MapPin, Share2, Clock, GraduationCap, Megaphone, Users, Smartphone, Kids
 * Themes: 'indigo' | 'purple' | 'orange' | 'emerald' | 'cyan' | 'rose'
 */
