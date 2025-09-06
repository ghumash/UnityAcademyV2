import type { Dict } from "../types";

import { common } from "./common/en";

import { navigation } from "./navigation/ru";
import { footer } from "./footer/ru";

import { hero } from "./home/hero/ru";
import { carousel } from "./home/carousel/ru";
import { featuresSection } from "./home/featuresSection/ru";
import { videoCardsCarousel } from "./home/videoCardsCarousel/ru";
import { logoCarouselSection } from "./home/logoCarouselSection/ru";
import { courses } from "./home/courses/ru";
import { ctaBanner } from "./home/ctaBanner/ru";

import { ourStory } from "./about/ourStory/ru";
import { teamSection } from "./about/teamSection/ru";
import { subscribeSection } from "./about/subscribeSection/ru";

import { contactsSection } from "./contact/contactsSection/ru";
import { mapSection } from "./contact/mapSection/ru";
import { formSection } from "./contact/formSection/ru";

export const ru: Dict = {
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
export default ru;
