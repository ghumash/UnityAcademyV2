"use client";

import React, { memo } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import {
  Code2,
  Palette,
  Puzzle,
  Megaphone,
  Workflow,
  Smartphone,
  LayoutDashboard,
  UsersRound,
  MessageSquareText,
  GraduationCap,
  Clock,
  ArrowRight,
} from "lucide-react";
import { THEMES } from "../model/theme";
import { formatIconByMode, levelLabel, formatLabel } from "../lib/utils";
import type { CourseCardProps } from "../model/types";

const cn = (...classes: Array<string | false | null | undefined>) =>
  twMerge(clsx(classes));

const ICONS = {
  Code2,
  Palette,
  Puzzle,
  Megaphone,
  Workflow,
  Smartphone,
  LayoutDashboard,
  UsersRound,
  MessageSquareText,
};

function CardWrapper({
  href,
  className,
  ariaLabel,
  children,
}: {
  href?: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  if (!href) {
    return (
      <article className={className} aria-label={ariaLabel}>
        {children}
      </article>
    );
  }
  const external = /^https?:\/\//i.test(href);
  const common = { className, "aria-label": ariaLabel };
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...common}>
      {children}
    </a>
  ) : (
    <Link href={href} {...common}>
      {children}
    </Link>
  );
}

export const CourseCard = memo(({
  course,
  levels,
  formats,
}: CourseCardProps) => {
  const {
    title,
    description,
    duration,
    level,
    format,
    icon = "Code2",
    theme = "indigo",
    href,
  } = course;

  const t = THEMES[theme];
  const Icon = ICONS[icon] ?? Code2;
  const FormatIcon = formatIconByMode(format);

  return (
    <CardWrapper
      href={href}
      ariaLabel={title}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-5 sm:p-6 backdrop-blur-xl",
        "shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        t.button,
        t.borderHoverShadow
      )}
    >
      {/* sweeping light */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -translate-x-full transition-transform duration-1000 ease-out",
          "motion-safe:group-hover:translate-x-full",
          t.sweep
        )}
      />

      {/* hover overlay */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
          "motion-safe:group-hover:opacity-100",
          t.hoverOverlay
        )}
      />

      {/* content */}
      <div className="relative z-10 flex items-start gap-4">
        {/* icon bubble */}
        <div
          className={cn(
            "shrink-0 rounded-lg bg-gradient-to-br p-3 backdrop-blur-sm transition-all duration-300",
            t.iconBg
          )}
          aria-hidden="true"
        >
          <Icon
            className={cn(
              "h-6 w-6 sm:h-7 sm:w-7 drop-shadow-lg transition-all duration-300 motion-safe:group-hover:scale-110",
              t.iconColor
            )}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className={cn("text-lg font-bold sm:text-xl", t.textColor, "text-foreground")}>
            {title}
          </h3>
          <p className={cn("mt-1 line-clamp-3 text-sm leading-6", t.subTextColor, "text-muted-foreground")}>
            {description}
          </p>

          {/* meta */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2 py-1",
                "ring-1 ring-border bg-muted/60 text-foreground/80"
              )}
            >
              <Clock className="h-4 w-4 text-foreground/70" aria-hidden="true" />
              {duration}
            </span>

            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2 py-1",
                "ring-1 ring-border bg-muted/60 text-foreground/80"
              )}
            >
              <GraduationCap className="h-4 w-4 text-foreground/70" aria-hidden="true" />
              {levelLabel(level, levels)}
            </span>

            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2 py-1 capitalize",
                "ring-1 ring-border bg-muted/60 text-foreground/80"
              )}
            >
              <FormatIcon className="h-4 w-4 text-foreground/70" aria-hidden="true" />
              {formatLabel(format, formats)}
            </span>
          </div>
        </div>

        {/* arrow */}
        <div
          aria-hidden="true"
          className={cn(
            "ml-auto self-center translate-x-0 opacity-0 transition-all duration-300",
            "motion-safe:group-hover:translate-x-1 motion-safe:group-hover:opacity-100"
          )}
        >
          <ArrowRight className={cn("h-5 w-5", t.arrowColor, "text-foreground")} />
        </div>
      </div>
    </CardWrapper>
  );
});
