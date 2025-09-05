export type OurStoryDict = {
  title: string;
  content: string;
};

export type TeamSectionDict = {
  title: string;
  emptyState: string;
};

export type SubscribeSectionDict = {
  title: string;
  description: string;
  placeholder: string;
  button: string;
};

export type AboutDict = {
  ourStory: OurStoryDict;
  teamSection: TeamSectionDict;
  subscribeSection: SubscribeSectionDict;
};
