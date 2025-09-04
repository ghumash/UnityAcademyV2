import type { Dict } from "../types";

import { hero } from "./home/hero/hy";
import { carousel } from "./home/carousel/hy";
import { featuresSection } from "./home/featuresSection/hy";
import { videoCardsCarousel } from "./home/videoCardsCarousel/hy";
import { logoCarouselSection } from "./home/logoCarouselSection/hy";
import { courses } from "./home/courses/hy";
import { ctaBanner } from "./home/ctaBanner/hy";

import { ourStory } from "./about/ourStory/hy";
import { teamSection } from "./about/teamSection/hy";
import { subscribeSection } from "./about/subscribeSection/hy";

import { contactsSection } from "./contact/contactsSection/hy";
import { mapSection } from "./contact/mapSection/hy";
import { formSection } from "./contact/formSection/hy";

export const hy: Dict = {
  common: { home: "Գլխավոր" },
  header: {
    menu: "Մենյու",
    nav: {
      courses: "Դասընթացներ",
      about: "Մեր մասին",
      contacts: "Կոնտակտներ",
      apply: "Դիմել",
    },
    footer: {
      navigation: "Նավիգացիա",
      contacts: "Կոնտակտներ",
      madeIn: "Ստեղծված Վանաձորում",
      rights: "Բոլոր իրավունքները պաշտպանված են։",
    },
  },
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
export default hy;
