"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Instagram,
  Facebook,
  Palette,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { getPlatformName } from "../lib/utils";
import type { SocialLinks as SocialLinksType, InstructorLabels } from "../model/types";

// Иконки для социальных сетей
const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  behance: Palette,
  github: Github,
  x: Twitter,
  website: Globe,
} as const;

type SocialIconKey = keyof typeof socialIcons;

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

type SocialLinksProps = {
  socials: SocialLinksType;
  labels: Pick<InstructorLabels, 'socialNetworksLabel'>;
};

export const SocialLinks: React.FC<SocialLinksProps> = ({ socials, labels }) => {
  const shouldReduceMotion = useReducedMotion();
  const socialEntries = Object.entries(socials).filter(([, url]) => url);

  if (socialEntries.length === 0) return null;

  const motionProps = shouldReduceMotion ? {} : { variants: itemVariants };

  return (
    <motion.div {...motionProps}>
      <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
        <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-1" />
        {labels.socialNetworksLabel}
        <div className="h-px bg-gradient-to-l from-primary/50 to-transparent flex-1" />
      </h3>
      
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {socialEntries.map(([platform, url]) => {
          const Icon = socialIcons[platform as SocialIconKey];
          const platformName = getPlatformName(platform);

          return (
            <motion.div
              key={platform}
              whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 rounded-full border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group relative overflow-hidden"
                asChild
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Открыть ${platformName} профиль`}
                  title={platformName}
                >
                  {/* Градиентный фон при hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon className="h-4 w-4 relative z-10 group-hover:text-primary transition-colors duration-300" />
                </a>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
