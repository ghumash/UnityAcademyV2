"use client";

import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { Section, Container } from "@/shared/ui/custom";
import { Badge, Button } from "@/shared/ui";
import {
  isEventFull,
  getRegistrationProgress,
  calculateDaysUntilEvent,
} from "../lib/utils";
import Link from "next/link";

interface EventHeroProps {
  config: {
    title: string;
    description: string;
    date?: {
      month: string;
      day: string;
      time: string;
      fullDate: string;
    };
    soon: string; // Добавляем soon
    duration: string;
    formatLabel: string;
    eventType: string;
    maxParticipants?: number;
    currentParticipants?: number;
    price?: string;
    originalPrice?: string;
    sale?: string;
    requiresRegistration?: boolean;
    heroUILabels: {
      completed: string;
      full: string;
      registration_open: string;
      duration_label: string;
      participants_label: string;
      discount_label: string;
      days_until: string;
      days_label: string;
      event_completed: string;
      at_time: string;
      register_button: string;
    };
  };
}

export const EventHero: React.FC<EventHeroProps> = ({ config }) => {
  const {
    title,
    description,
    date,
    soon,
    duration,
    formatLabel,
    eventType,
    maxParticipants,
    currentParticipants = 0,
    price,
    originalPrice,
    sale,
    requiresRegistration = true,
    heroUILabels: {
      full,
      registration_open,
      duration_label,
      participants_label,
      days_until,
      days_label,
      event_completed,
      at_time,
      register_button,
    },
  } = config;

  const { daysUntilEvent, isUpcoming } = date
    ? calculateDaysUntilEvent(date.fullDate)
    : { daysUntilEvent: 0, isUpcoming: true };

  const eventIsFull = isEventFull(currentParticipants, maxParticipants);
  const registrationProgress = getRegistrationProgress(
    currentParticipants,
    maxParticipants
  );

  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-background via-background/50 to-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_50%,transparent_75%)] bg-[length:60px_60px]" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left Column - Event Info */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Event Type & Status */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  {eventType}
                </Badge>
                {!isUpcoming && (
                  <Badge variant="destructive" className="px-3 py-1">
                    <XCircle className="w-3 h-3 mr-1" />
                    {event_completed}
                  </Badge>
                )}
                {eventIsFull && isUpcoming && (
                  <Badge variant="destructive" className="px-3 py-1">
                    <XCircle className="w-3 h-3 mr-1" />
                    {full}
                  </Badge>
                )}
                {isUpcoming && !eventIsFull && requiresRegistration && (
                  <Badge
                    variant="default"
                    className="px-3 py-1 bg-green-200 text-green-800"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {registration_open}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
                <p className="text-lg text-muted-foreground sm:text-xl">
                  {description}
                </p>
              </div>

              {/* Event Meta */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Date & Time */}
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    {date ? (
                      <>
                        <p className="text-sm font-medium text-foreground">
                          {date.day} {date.month}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {at_time} {date.time}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-medium text-foreground">
                        {soon}
                      </p>
                    )}
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {duration_label}
                    </p>
                    <p className="text-sm text-muted-foreground">{duration}</p>
                  </div>
                </div>

                {/* Format */}
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {formatLabel}
                    </p>
                  </div>
                </div>

                {/* Participants */}
                {requiresRegistration && maxParticipants && (
                  <div className="flex items-center gap-3 rounded-lg border p-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {currentParticipants} / {maxParticipants}{" "}
                        {participants_label}
                      </p>
                      <div className="mt-1 w-full bg-muted rounded-full h-2">
                        <div
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            registrationProgress > 75
                              ? "bg-destructive"
                              : "bg-primary"
                          )}
                          style={{ width: `${registrationProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Price */}
              {price && (
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-6">
                  <div className="flex items-start gap-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">{price}</p>
                      {originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {originalPrice}
                        </p>
                      )}
                    </div>
                    {originalPrice && sale && (
                      <Badge variant="destructive">{sale}</Badge>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Visual Card */}
              <div className="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-lg">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

                <div className="relative z-10 flex flex-col items-center space-y-6">
                  <div className="rounded-full bg-primary/10 p-6">
                    <Calendar />
                  </div>

                  {/* Calendar Widget */}
                  <div className="text-center">
                    <div className="inline-block rounded-lg bg-primary/10 px-6 py-4">
                      {date ? (
                        <>
                          <p className="text-3xl font-bold text-primary">
                            {date.day}
                          </p>
                          <p className="text-sm uppercase tracking-wide text-primary/80">
                            {date.month.slice(0, 3)}
                          </p>
                        </>
                      ) : (
                        <p className="text-lg font-bold text-primary">{soon}</p>
                      )}
                    </div>
                  </div>

                  {/* Countdown or Status */}
                  {date && (
                    <div className="text-center">
                      {isUpcoming ? (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            {days_until}
                          </p>
                          <div className="flex justify-center gap-2">
                            {/* Dynamic countdown */}
                            <div className="rounded bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                              {daysUntilEvent} {days_label}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            {event_completed}
                          </p>
                          <div className="rounded bg-muted px-3 py-1 text-sm text-muted-foreground">
                            {date ? date.month : soon}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {isUpcoming && (
                    <Button size="lg" className="w-full" asChild>
                      <Link href="#form">{register_button}</Link>
                    </Button>
                  )}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 rounded-full bg-primary/20 p-3"
              >
                <User className="h-6 w-6 text-primary" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 rounded-full bg-primary/20 p-3"
              >
                <Clock className="h-6 w-6 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
