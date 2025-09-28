"use client";

import React from "react";
import { Clock, User, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { Section, Container } from "@/shared/ui/custom";

interface AgendaItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
  type?: "presentation" | "workshop" | "break" | "networking";
}

interface EventAgendaProps {
  title: string;
  items: AgendaItem[];
  display?: boolean;
  agendaLabels: {
    subtitle: string;
    completion: string;
    speaker_label: string;
  };
}

const getItemTypeColor = (type?: string) => {
  switch (type) {
    case "presentation":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800";
    case "workshop":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800";
    case "break":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800";
    case "networking":
      return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800";
    default:
      return "bg-primary/10 text-primary border-primary/30 dark:bg-primary/5 dark:border-primary/20";
  }
};

const getItemTypeIcon = (type?: string) => {
  switch (type) {
    case "presentation":
      return "📊";
    case "workshop":
      return "🛠️";
    case "break":
      return "☕";
    case "networking":
      return "🤝";
    default:
      return "📋";
  }
};

export const EventAgenda: React.FC<EventAgendaProps> = ({
  title,
  items,
  display = true,
  agendaLabels,
}) => {
  if (!display || !items.length) return null;

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {agendaLabels.subtitle}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div
              className="absolute left-8 sm:left-17.5 top-0 w-0.5 bg-gradient-to-b from-primary/50 via-border to-primary/20"
              style={{ height: "calc(100% - 3.5rem)" }}
            />

            {/* Timeline Items */}
            <div className="space-y-8">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  className="relative flex gap-6 sm:gap-10"
              >
                {/* Time Badge Zone */}
                <div className="flex-shrink-0 w-16 sm:w-36 relative items-center">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-primary shadow-lg border-2 border-background" />
                    {/* Пульсирующий эффект */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  </div>

                  {/* Time */}
                  <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/60 rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/60 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Type Badge */}
                  {item.type && (
                    <div className="mb-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border shadow-sm",
                          getItemTypeColor(item.type)
                        )}
                      >
                        <span className="text-base">
                          {getItemTypeIcon(item.type)}
                        </span>
                        {item.type}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-5 leading-relaxed text-base">
                    {item.description}
                  </p>

                  {/* Speaker */}
                  {item.speaker && (
                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {agendaLabels.speaker_label} {item.speaker}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
              ))}
            </div>

            {/* End Marker */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 2 * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="relative flex gap-6 sm:gap-10 mt-12"
            >
              {/* Time Badge Zone */}
              <div className="flex-shrink-0 w-16 sm:w-36 relative items-center">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 border-2 border-background shadow-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>

                  {/* Пульсирующий эффект */}
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                  <p className="text-base font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    {agendaLabels.completion}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
