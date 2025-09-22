"use client";

import React, { memo } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Container, Section } from "@/shared/ui/custom";
import { CourseCard } from "./CourseCard";
import type { CoursesProps } from "../model/types";

const cn = (...classes: Array<string | false | null | undefined>) =>
  twMerge(clsx(classes));

export const Courses = memo(function Courses({ title, list, levels, formats }: CoursesProps) {
  return (
    <Section>
      <Container>
        <div className="relative">
          {/* Heading for SEO/A11y */}
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground sm:mb-10 sm:text-3xl">
            {title}
          </h2>

          {/* Grid of course cards */}
          <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3")}>
            {list.map((course) => (
              <CourseCard key={course.id} course={course} levels={levels} formats={formats} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
});
