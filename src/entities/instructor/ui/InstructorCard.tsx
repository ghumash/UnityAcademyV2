"use client";

import React, { memo } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { getInitials } from "../lib/utils";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { SocialLinks } from "./SocialLinks";
import type { InstructorCardProps } from "../model/types";
import dynamic from "next/dynamic";

// Анимационные варианты
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

const avatarVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      type: "spring",
      stiffness: 100,
    },
  },
};

// Основной компонент InstructorCard
const InstructorCardComponent = memo(
  ({ data, labels, className }: InstructorCardProps) => {
    const shouldReduceMotion = useReducedMotion();
    const {
      name,
      role,
      avatarUrl,
      bio,
      experience,
      socials,
    } = data;


    const motionProps = shouldReduceMotion
      ? {}
      : {
          initial: "hidden" as const,
          animate: "visible" as const,
          variants: containerVariants,
        };

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          className={cn(
            "relative overflow-hidden rounded-3xl border border-border/50 bg-card",
            "backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500",
            "p-6 sm:p-8",
            className
          )}
          {...motionProps}
        >
          {/* Заголовок с аватаром */}
          <m.div
            variants={shouldReduceMotion ? {} : itemVariants}
            className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6 mb-8"
          >
            {/* Аватар с эффектами */}
            <m.div
              variants={shouldReduceMotion ? {} : avatarVariants}
              className="relative group"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            >
              <Avatar className="relative h-20 w-20 sm:h-24 sm:w-24 ring-4 ring-primary/10 ring-offset-4 ring-offset-background group-hover:ring-primary/20 transition-all duration-300">
                <AvatarImage
                  src={avatarUrl}
                  alt={name}
                  className="object-cover"
                />
                <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>
            </m.div>

            <div className="min-w-0 flex-1 space-y-2">
              <m.div
                variants={shouldReduceMotion ? {} : itemVariants}
                className="flex items-center justify-center sm:justify-start gap-2"
              >
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  {name}
                </h2>
              </m.div>

              <m.p
                variants={shouldReduceMotion ? {} : itemVariants}
                className="text-lg font-semibold text-primary"
              >
                {role}
              </m.p>
            </div>
          </m.div>

          <m.div
            variants={shouldReduceMotion ? {} : itemVariants}
            className="mb-8"
          >
            <p className="text-base leading-relaxed text-muted-foreground pl-4 border-l-2 border-primary/10">
              {bio}
            </p>
          </m.div>

          {/* Опыт работы */}
          {experience.length > 0 && (
              <ExperienceTimeline
                experience={experience}
                labels={{
                  experienceLabel: labels.experienceLabel,
                  showDetails: labels.showDetails,
                  hideDetails: labels.hideDetails,
                }}
              />
          )}

          {/* Социальные сети */}
          <SocialLinks
            socials={socials}
            labels={{ socialNetworksLabel: labels.socialNetworksLabel }}
          />
        </m.div>
      </LazyMotion>
    );
  }
);

export const InstructorCard = dynamic(
  () => Promise.resolve(InstructorCardComponent),
  { ssr: false }
);
