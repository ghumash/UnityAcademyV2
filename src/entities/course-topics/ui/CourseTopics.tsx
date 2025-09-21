"use client";

import React, { memo } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui";
import type { CourseTopicsProps } from "../model/types";
import { animations } from "../model/config";
import { getTopicsDisplayConfig, getTopicAriaLabel } from "../lib/utils";

export const CourseTopics = memo(
  ({ title, topics, className }: CourseTopicsProps) => {
    const shouldReduceMotion = useReducedMotion();
    const config = getTopicsDisplayConfig(topics.length);

    const motionProps = shouldReduceMotion
      ? {}
      : {
          initial: "hidden" as const,
          animate: "visible" as const,
          variants: animations.container,
        };

    return (
      <LazyMotion features={domAnimation}>
        <m.section
          className={cn("w-full", className)}
          aria-labelledby="course-topics-heading"
          {...motionProps}
        >
          <Card>
            <CardContent className="p-6 sm:p-8">
              <m.div
                variants={shouldReduceMotion ? {} : animations.item}
                className="mb-6"
              >
                <h2
                  id="course-topics-heading"
                  className="text-xl sm:text-2xl font-semibold tracking-tight"
                >
                  {title}
                </h2>
              </m.div>

              <m.div
                variants={shouldReduceMotion ? {} : animations.item}
                className={cn(
                  config.enableScroll && "max-h-80 overflow-y-auto pr-2",
                  config.enableScroll && [
                    "scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent",
                    "[&::-webkit-scrollbar]:w-2",
                    "[&::-webkit-scrollbar-track]:bg-transparent",
                    "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20",
                    "[&::-webkit-scrollbar-thumb]:rounded-full",
                  ]
                )}
              >
                <ul
                  className={cn(
                    "space-y-3",
                    config.useGridLayout &&
                      "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3 sm:space-y-0"
                  )}
                  role="list"
                  aria-label={`Темы курса: ${title}`}
                >
                  {topics.map((topic, index) => (
                    <m.li
                      key={index}
                      variants={shouldReduceMotion ? {} : animations.item}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg",
                        "hover:bg-muted/30 transition-colors duration-200"
                      )}
                      role="listitem"
                      aria-label={getTopicAriaLabel(index, topic, topics.length)}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check
                            className="w-3 h-3 text-primary"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed">
                        {topic}
                      </span>
                    </m.li>
                  ))}
                </ul>
              </m.div>
            </CardContent>
          </Card>
        </m.section>
      </LazyMotion>
    );
  }
);
