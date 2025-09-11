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

export type CoursesSectionDict = {
  title: string;
  list: Array<{
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

export type HomeDict = {
  hero: HeroDict;
  carousel: CarouselDict;
  featuresSection: FeaturesSectionDict;
  videoCardsCarousel: VideoCardsCarouselDict;
  logoCarouselSection: LogoCarouselSectionDict;
  coursesSection: CoursesSectionDict;
  ctaBanner: CtaBannerDict;
};
