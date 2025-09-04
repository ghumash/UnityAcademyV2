export type HeaderDict = {
  menu: string;
  nav: { courses: string; about: string; contacts: string; apply: string };
  footer: {
    navigation: string;
    contacts: string;
    madeIn: string;
    rights: string;
  };
};

export type HeroDict = {
  title: string;
  subtitle: string;
  actions: {
    mission: string;
    courses: string;
  };
};

export type CarouselDict = {
  items: Array<{
    title: string;
    desc: string;
  }>;
};

export type FeaturesSectionDict = {
  features: Array<{
    title: string;
    description: string;
  }>;
};

export type VideoCardsCarouselDict = {
  title: string;
  students: Array<{
    student: string;
    group: string;
  }>;
};

export type LogoCarouselSectionDict = {
  title: string;
  subtitle: string;
};

export type CoursesDict = {
  title: string;
  courses: Array<{
    title: string;
    description: string;
    duration: string;
    level: string;
    format: string;
  }>;
  levels: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  formats: {
    online: string;
    offline: string;
    hybrid: string;
  };
};

export type CtaBannerDict = {
  heading: string;
  buttons: {
    primary: string;
  };
};

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

export type ContactsSectionDict = {
  title: string;
  description: string;
  address: string;
  phone: string;
  email: string;
};

export type MapSectionDict = {
  title: string;
  description: string;
};

export type FormSectionDict = {
  title: string;
  description: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  button: string;
  success: string;
  error: string;
};

export type HomeDict = {
  hero: HeroDict;
  carousel: CarouselDict;
  featuresSection: FeaturesSectionDict;
  videoCardsCarousel: VideoCardsCarouselDict;
  logoCarouselSection: LogoCarouselSectionDict;
  courses: CoursesDict;
  ctaBanner: CtaBannerDict;
};

export type AboutDict = {
  ourStory: OurStoryDict;
  teamSection: TeamSectionDict;
  subscribeSection: SubscribeSectionDict;
};

export type ContactDict = {
  contactsSection: ContactsSectionDict;
  mapSection: MapSectionDict;
  formSection: FormSectionDict;
};

export type Dict = {
  common: { home: string };
  header: HeaderDict;
  home: HomeDict;
  about: AboutDict;
  contact: ContactDict;
};
