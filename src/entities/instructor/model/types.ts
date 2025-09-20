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

export type InstructorData = {
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

export type InstructorLabels = {
  experienceLabel: string;
  socialNetworksLabel: string;
  showDetails: string;
  hideDetails: string;
};

export type InstructorCardProps = {
  data: InstructorData;
  labels?: InstructorLabels;
  className?: string;
};
