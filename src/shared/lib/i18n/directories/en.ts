import type { Dict } from "../types";

import { common } from "./common/en";

import { navigation } from "./navigation/en";
import { footer } from "./footer/en";

import { hero } from "./home/hero/en";
import { carousel } from "./home/carousel/en";
import { featuresSection } from "./home/featuresSection/en";
import { videoCardsCarousel } from "./home/videoCardsCarousel/en";
import { logoCarouselSection } from "./home/logoCarouselSection/en";
import { courses } from "./home/courses/en";
import { ctaBanner } from "./home/ctaBanner/en";

import { ourStory } from "./about/ourStory/en";
import { teamSection } from "./about/teamSection/en";
import { subscribeSection } from "./about/subscribeSection/en";

import { contactsSection } from "./contact/contactsSection/en";
import { mapSection } from "./contact/mapSection/en";
import { formSection } from "./contact/formSection/en";

export const en: Dict = {
  common,
  navigation,
  footer,
  home: {
    hero,
    carousel,
    featuresSection,
    videoCardsCarousel,
    logoCarouselSection,
    courses,
    ctaBanner,
  },
  about: {
    ourStory,
    teamSection,
    subscribeSection,
  },
  contact: {
    contactsSection,
    mapSection,
    formSection,
  },
};

export default en;
