import type { Dict } from "../types";

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
  common: { home: "Главная" },
  header: {
    menu: "Меню",
    nav: {
      courses: "Курсы",
      about: "О нас",
      contacts: "Контакты",
      apply: "Подать заявку",
    },
    footer: {
      navigation: "Навигация",
      contacts: "Контакты",
      madeIn: "Сделано в Ванадзоре",
      rights: "Все права защищены.",
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
export default ru;
