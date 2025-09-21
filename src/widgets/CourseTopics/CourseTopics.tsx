"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui";

export type CourseTopicsProps = {
  title: string;
  topics: string[];
  className?: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

export const CourseTopics = memo(
  ({ title, topics, className }: CourseTopicsProps) => {
    const shouldReduceMotion = useReducedMotion();
    const useGridLayout = topics.length > 8;
    const [scrollProgress, setScrollProgress] = React.useState(0);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const needsScroll = topics.length > 8;

    // Обработчик скролла для индикатора прогресса
    const handleScroll = React.useCallback(() => {
      if (!scrollContainerRef.current || !needsScroll) return;

      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    }, [needsScroll]);

    React.useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container || !needsScroll) return;

      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }, [handleScroll, needsScroll]);

    const motionProps = shouldReduceMotion
      ? {}
      : {
          initial: "hidden" as const,
          animate: "visible" as const,
          variants: containerVariants,
        };

    return (
      <motion.section
        className={cn("w-full", className)}
        aria-labelledby="course-topics-heading"
        {...motionProps}
      >
        <Card>
          <CardContent className="p-6 sm:p-8">
            <motion.div
              variants={shouldReduceMotion ? {} : itemVariants}
              className="mb-6"
            >
              <h2
                id="course-topics-heading"
                className="text-xl sm:text-2xl font-semibold tracking-tight"
              >
                {title}
              </h2>
            </motion.div>

            {/* Индикатор прогресса скролла - всегда виден */}
            {needsScroll && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 h-1 bg-muted rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${scrollProgress * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </motion.div>
            )}

            <motion.div
              ref={scrollContainerRef}
              variants={shouldReduceMotion ? {} : itemVariants}
              className={cn(
                topics.length > 8 && "max-h-80 overflow-y-auto pr-2",
                topics.length > 8 && [
                  "scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent",
                  "[&::-webkit-scrollbar]:w-2",
                  "[&::-webkit-scrollbar-track]:bg-transparent",
                  "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20",
                  "[&::-webkit-scrollbar-thumb]:rounded-full",
                  "[&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground/30",
                ]
              )}
            >
              <ul
                id="topics-list"
                className={cn(
                  "space-y-3",
                  useGridLayout &&
                    topics.length <= 8 &&
                    "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3 sm:space-y-0"
                )}
                role="list"
                aria-label={`Темы курса: ${title}`}
              >
                {topics.map((topic, index) => (
                  <motion.li
                    key={index}
                    variants={shouldReduceMotion ? {} : itemVariants}
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: 1.01,
                            transition: { duration: 0.2 },
                          }
                    }
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg",
                      "hover:bg-muted/50 transition-colors duration-200",
                      "group cursor-default"
                    )}
                    tabIndex={0}
                    role="listitem"
                    aria-label={`Тема ${index + 1}: ${topic}`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check
                          className="w-3 h-3 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <span className="text-sm sm:text-base leading-relaxed group-hover:text-foreground transition-colors duration-200">
                      {topic}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>
    );
  }
);
