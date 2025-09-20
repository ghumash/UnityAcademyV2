"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { User, Sparkles } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { getInitials } from "../lib/utils";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { SocialLinks } from "./SocialLinks";
import type { InstructorCardProps } from "../model/types";

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
      stiffness: 100
    },
  },
};

// Основной компонент InstructorCard
const InstructorCardComponent = memo(({ data, labels, className }: InstructorCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { 
    name, 
    role, 
    avatarUrl, 
    bio, 
    experience, 
    socials, 
    experienceLabel, 
    socialNetworksLabel, 
    showDetails, 
    hideDetails 
  } = data;
  
  // Используем labels из data или переданные отдельно
  const finalLabels = labels || {
    experienceLabel: experienceLabel || 'Опыт работы',
    socialNetworksLabel: socialNetworksLabel || 'Социальные сети',
    showDetails: showDetails || 'Подробнее',
    hideDetails: hideDetails || 'Скрыть'
  };

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        animate: "visible" as const,
        variants: containerVariants,
      };

  return (
    <motion.div
      className={cn(
        // Основные стили карточки
        "relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-card/80",
        "backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500",
        // Градиентная рамка
        "before:absolute before:inset-0 before:rounded-3xl before:p-[1px]",
        "before:bg-gradient-to-br before:from-primary/20 before:via-primary/10 before:to-transparent",
        "before:mask-composite:exclude before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        // Фокус и hover эффекты
        "focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-2 focus-within:ring-offset-background",
        "hover:border-primary/30 hover:bg-gradient-to-br hover:from-card hover:via-card/95 hover:to-primary/5",
        // Адаптивный padding
        "p-6 sm:p-8",
        className
      )}
      {...motionProps}
    >
      {/* Декоративные элементы фона */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/3 to-transparent rounded-full blur-xl" />
      
      {/* Заголовок с аватаром */}
      <motion.div 
        variants={shouldReduceMotion ? {} : itemVariants}
        className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6 mb-8"
      >
        {/* Аватар с эффектами */}
        <motion.div
          variants={shouldReduceMotion ? {} : avatarVariants}
          className="relative group"
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        >
          {/* Светящийся фон аватара */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
          
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
          
          {/* Иконка статуса */}
          <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-primary rounded-full flex items-center justify-center ring-2 ring-background">
            <User className="h-3 w-3 text-primary-foreground" />
          </div>
        </motion.div>
        
        <div className="min-w-0 flex-1 space-y-2">
          <motion.div
            variants={shouldReduceMotion ? {} : itemVariants}
            className="flex items-center justify-center sm:justify-start gap-2"
          >
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              {name}
            </h2>
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          </motion.div>
          
          <motion.p 
            variants={shouldReduceMotion ? {} : itemVariants}
            className="text-lg font-semibold text-primary"
          >
            {role}
          </motion.p>
        </div>
      </motion.div>

      {/* Биография с улучшенной типографикой */}
      <motion.div 
        variants={shouldReduceMotion ? {} : itemVariants} 
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
          <p className="text-base leading-relaxed text-muted-foreground pl-4 border-l-2 border-primary/10">
            {bio}
          </p>
        </div>
      </motion.div>

      {/* Опыт работы */}
      {experience.length > 0 && (
        <div className="mb-8">
          <ExperienceTimeline 
            experience={experience} 
            labels={{
              experienceLabel: finalLabels.experienceLabel,
              showDetails: finalLabels.showDetails,
              hideDetails: finalLabels.hideDetails
            }}
          />
        </div>
      )}

      {/* Социальные сети */}
      <SocialLinks 
        socials={socials} 
        labels={{ socialNetworksLabel: finalLabels.socialNetworksLabel }}
      />
    </motion.div>
  );
});

InstructorCardComponent.displayName = 'InstructorCard';

export const InstructorCard = dynamic(() => 
  Promise.resolve(InstructorCardComponent), 
  { ssr: false }
);
