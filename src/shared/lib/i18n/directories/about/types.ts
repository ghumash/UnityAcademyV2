export type OurStoryDict = {
  title: string;
  content: string;
};

export type TeamMember = {
  name: string;
  role: string;
  avatarUrl?: string;
  bio?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    github?: string;
  };
};

export type TeamSectionDict = {
  title: string;
  emptyState: string;
  members: readonly TeamMember[];
};

export type SubscribeSectionDict = {
  title: string;
  description: string;
  placeholder: string;
  button: string;
};

export type GlowingGridDict = {
  readonly items: readonly {
    readonly title: string;
    readonly description: string;
  }[];
};

export type IntroWithDescDict = {
  readonly title: string;
  readonly description: string;
  readonly description_2: string;
  readonly description_3: string;
};

export type ContentSectionDict = {
  readonly blocks: readonly {
    readonly title: string;
    readonly items: readonly {
      readonly title?: string;
      readonly description: string;
    }[];
  }[];
  readonly badge: {
    readonly text: string;
  };
};

export type AboutDict = {
  ourStory: OurStoryDict;
  teamSection: TeamSectionDict;
  subscribeSection: SubscribeSectionDict;
  glowingGrid: GlowingGridDict;
  contentSection: ContentSectionDict;
  introWithDesc: IntroWithDescDict;
};

export type CtaBannerDict = {
  heading: string;
  buttons: {
    primary: string;
  };
};
