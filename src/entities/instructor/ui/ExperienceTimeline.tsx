"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import { Badge, Button } from "@/shared/ui";
import type { ExperienceItem, InstructorLabels } from "../model/types";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

const detailsVariants: Variants = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.4, 0, 0.2, 1],
      opacity: { delay: 0.1 }
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

type ExperienceTimelineProps = {
  experience: ExperienceItem[];
  labels: Pick<InstructorLabels, 'experienceLabel' | 'showDetails' | 'hideDetails'>;
};

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ 
  experience,
  labels
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const motionProps = shouldReduceMotion ? {} : { variants: itemVariants };

  return (
    <motion.div {...motionProps} className="space-y-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-primary" />
        {labels.experienceLabel}
      </h3>
      
      <div className="relative">
        {/* Вертикальная линия с градиентом */}
        <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        
        <div className="space-y-6">
          {experience.map((item, index) => {
            const isOpen = openItems.has(index);
            
            return (
              <motion.div 
                key={index} 
                className="relative flex gap-6"
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                transition={shouldReduceMotion ? {} : { delay: index * 0.1 }}
              >
                {/* Точка на временной шкале с анимацией */}
                <div className="relative z-10 flex h-8 w-8 items-center justify-center">
                  <motion.div 
                    className="h-3 w-3 rounded-full bg-primary shadow-lg"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                  {/* Пульсирующий эффект */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                </div>
                
                <div className="flex-1 min-w-0 pb-6">
                  {/* Карточка опыта */}
                  <motion.div 
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
                    whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-base font-semibold leading-tight mb-1 text-foreground">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground font-medium">
                          {item.company}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="text-xs shrink-0 bg-primary/10 text-primary border-primary/20"
                      >
                        {item.period}
                      </Badge>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-lg"
                      onClick={() => toggleItem(index)}
                      aria-label={`${isOpen ? labels.hideDetails : labels.showDetails} для ${item.title}`}
                      aria-expanded={isOpen}
                    >
                      {isOpen ? (
                        <>
                          <ChevronUp className="h-3 w-3 mr-1" />
                          {labels.hideDetails}
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3 mr-1" />
                          {labels.showDetails}
                        </>
                      )}
                    </Button>
                    
                    {/* Анимированные детали */}
                    <motion.div
                      initial="hidden"
                      animate={isOpen ? "visible" : "hidden"}
                      exit="exit"
                      variants={shouldReduceMotion ? {} : detailsVariants}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="mt-3 pt-3 border-t border-border/30">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
