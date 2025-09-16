"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Instagram,
  Facebook,
  Palette,
  ChevronDown,
  ChevronUp 
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage,
  Badge,
  Button,
} from "@/shared/ui";

// Типы данных
export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  summary: string;
};

export type SocialLinks = {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  behance?: string;
  github?: string;
  x?: string;
  website?: string;
};

export type UserCardData = {
  display?: boolean;
  name: string;
  role: string;
  avatarUrl?: string;
  bio: string;
  experience: ExperienceItem[];
  socials: SocialLinks;
  experienceLabel?: string;
  socialNetworksLabel?: string;
  showDetails?: string;
  hideDetails?: string;
};

export type UserCardLabels = {
  experienceLabel: string;
  socialNetworksLabel: string;
  showDetails: string;
  hideDetails: string;
};

export type UserCardProps = {
  data: UserCardData;
  labels?: UserCardLabels;
  className?: string;
};

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

// Анимационные варианты
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.08,
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

// Компонент временной шкалы опыта
const ExperienceTimeline: React.FC<{ 
  experience: ExperienceItem[];
  labels: Pick<UserCardLabels, 'experienceLabel' | 'showDetails' | 'hideDetails'>;
}> = ({ 
  experience,
  labels
}) => {
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

  return (
    <motion.div variants={itemVariants} className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        {labels.experienceLabel}
      </h3>
      <div className="relative">
        {/* Вертикальная линия */}
        <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
        
        <div className="space-y-4">
          {experience.map((item, index) => {
            const isOpen = openItems.has(index);
            return (
              <div key={index} className="relative flex gap-4">
                {/* Точка на временной шкале */}
                <div className="relative z-10 flex h-4 w-4 items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.company}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {item.period}
                    </Badge>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
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
                  
                  {isOpen && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Компонент социальных ссылок
const SocialLinks: React.FC<{ 
  socials: SocialLinks;
  labels: Pick<UserCardLabels, 'socialNetworksLabel'>;
}> = ({ socials, labels }) => {
  const socialEntries = Object.entries(socials).filter(([, url]) => url);

  if (socialEntries.length === 0) return null;

  return (
    <motion.div variants={itemVariants}>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        {labels.socialNetworksLabel}
      </h3>
      <div className="flex gap-2">
        {socialEntries.map(([platform, url]) => {
          const Icon = socialIcons[platform as SocialIconKey];
          const platformName = {
            instagram: 'Instagram',
            facebook: 'Facebook',
            linkedin: 'LinkedIn',
            behance: 'Behance',
            github: 'GitHub',
            x: 'X (Twitter)',
            website: 'Веб-сайт'
          }[platform as SocialIconKey];

          return (
            <Button
              key={platform}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              asChild
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Открыть ${platformName} профиль`}
                title={platformName}
              >
                <Icon className="h-4 w-4" />
              </a>
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
};

// Основной компонент UserCard
const UserCardComponent = memo(({ data, labels, className }: UserCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { name, role, avatarUrl, bio, experience, socials, experienceLabel, socialNetworksLabel, showDetails, hideDetails } = data;
  
  // Используем labels из data или переданные отдельно
  const finalLabels = labels || {
    experienceLabel: experienceLabel || 'Experience',
    socialNetworksLabel: socialNetworksLabel || 'Social Networks',
    showDetails: showDetails || 'Show Details',
    hideDetails: hideDetails || 'Hide Details'
  };

  // Получаем инициалы для fallback аватара
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
        "relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm",
        "hover:shadow-lg transition-shadow duration-200",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
      {...motionProps}
    >
      {/* Заголовок с аватаром */}
      <motion.div 
        variants={shouldReduceMotion ? {} : itemVariants}
        className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6"
      >
        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mx-auto sm:mx-0 shrink-0">
          <AvatarImage 
            src={avatarUrl} 
            alt={name}
          />
          <AvatarFallback className="text-lg font-medium">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center sm:text-left min-w-0 flex-1">
          <h2 className="text-xl font-semibold leading-tight mb-1">
            {name}
          </h2>
          <p className="text-muted-foreground font-medium mb-2">
            {role}
          </p>
        </div>
      </motion.div>

      {/* Биография */}
      <motion.div variants={shouldReduceMotion ? {} : itemVariants} className="mb-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {bio}
        </p>
      </motion.div>

      {/* Опыт работы */}
      {experience.length > 0 && (
        <div className="mb-6">
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

export const UserCard = dynamic(() => 
  Promise.resolve(UserCardComponent), 
  { ssr: false }
);
