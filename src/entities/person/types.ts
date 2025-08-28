export type PersonSocials = Partial<{
  instagram: string;
  facebook: string;
  linkedin: string;
  github: string;
}>;

export type Person = {
  slug: string;
  name: string;
  role: string;
  avatarUrl?: string;
  bio?: string;
  socials?: PersonSocials;
};
