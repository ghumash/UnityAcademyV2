"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Clock, Users, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils";
import type { EventCardProps } from "../model/types";
import { isEventFull, getRegistrationProgress } from "../lib/utils";

export const EventCard = memo(({ event, soon, cardLabels }: EventCardProps) => {
  const Icon = event.icon;
  const isUpcoming = true; // Для простоты считаем все события предстоящими

  const eventIsFull = isEventFull(
    event.currentParticipants,
    event.maxParticipants
  );

  const registrationProgress = getRegistrationProgress(
    event.currentParticipants,
    event.maxParticipants
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link
        href={event.href || "#"}
        className={cn(
          "group relative w-full h-full overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 block",
          "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5",
          !isUpcoming && "opacity-75 grayscale-[0.3]"
        )}
      >
        {/* Calendar Header */}
        <div className="relative">
          {/* Date Display - Calendar Style */}
          <div className="flex">
            {/* Calendar Date Block */}
            <div
              className={cn(
                "flex flex-col items-center justify-center w-20 py-4 text-center border-r border-border/50",
                isUpcoming ? "bg-primary/5" : "bg-muted/50"
              )}
            >
              {event.date ? (
                <>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {event.date.month}
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {event.date.day}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {event.date.time}
                  </div>
                </>
              ) : (
                <div className="text-sm font-semibold text-primary">{soon}</div>
              )}
            </div>

            {/* Event Info */}
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Event Type Badge */}
                  <div
                    className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                      "bg-primary/10 text-primary border border-primary/20"
                    )}
                  >
                    {event.type}
                  </div>

                  {/* Status Badges */}
                  {!isUpcoming && (
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      <XCircle className="w-3 h-3 mr-1" />
                      {cardLabels.completed}
                    </div>
                  )}
                  {eventIsFull && isUpcoming && (
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                      <XCircle className="w-3 h-3 mr-1" />
                      {cardLabels.full}
                    </div>
                  )}
                  {isUpcoming && !eventIsFull && event.requiresRegistration && (
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {cardLabels.registration_open}
                    </div>
                  )}
                </div>

                {/* Event Icon */}
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  {Icon}
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span>{event.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-4 pt-0">
          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {event.description}
          </p>

          {/* Registration Progress */}
          {event.requiresRegistration && event.maxParticipants && (
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>
                    {event.currentParticipants || 0} / {event.maxParticipants}{" "}
                    {cardLabels.participants_label}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs font-medium",
                    registrationProgress > 75
                      ? "text-destructive"
                      : "text-muted-foreground"
                  )}
                >
                  {Math.round(registrationProgress)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    registrationProgress > 75 ? "bg-destructive" : "bg-primary"
                  )}
                  style={{ width: `${registrationProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Indicator */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="text-sm font-medium text-primary">
              {isUpcoming ? cardLabels.learn_more : cardLabels.details}
            </div>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
});
