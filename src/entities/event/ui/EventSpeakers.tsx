"use client";

import React from "react";
import { Building, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { Section, Container } from "@/shared/ui/custom";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";

interface Speaker {
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  social?: {
    linkedin?: string;
    github?: string;
    x?: string;
    website?: string;
  };
}

interface EventSpeakersProps {
  title: string;
  list: Speaker[];
  display?: boolean;
  speakersLabels: {
    subtitle: string;
    contact_label: string;
  };
}

export const EventSpeakers: React.FC<EventSpeakersProps> = ({ title, list, display = true, speakersLabels }) => {
  if (!display || !list.length) return null;

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {speakersLabels.subtitle}
            </p>
          </div>

          {/* Speakers Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((speaker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10 space-y-4">
                    {/* Avatar & Basic Info */}
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarImage 
                          src={speaker.avatarUrl} 
                          alt={speaker.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {speaker.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                          {speaker.name}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {speaker.role}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {speaker.bio}
                    </p>


                    {/* Social Links */}
                    {speaker.social && Object.keys(speaker.social).length > 0 && (
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-muted-foreground">{speakersLabels.contact_label}</span>
                          <div className="flex gap-2">
                            {speaker.social.linkedin && (
                              <a
                                href={speaker.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                              >
                                <Building className="w-3 h-3" />
                              </a>
                            )}
                            {speaker.social.website && (
                              <a
                                href={speaker.social.website}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
