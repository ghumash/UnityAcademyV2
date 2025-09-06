import type { HomeDict } from "./types";
import { carousel } from "./carousel/hy";
import { courses } from "./courses/hy";
import { ctaBanner } from "./ctaBanner/hy";
import { featuresSection } from "./featuresSection/hy";
import { hero } from "./hero/hy";
import { logoCarouselSection } from "./logoCarouselSection/hy";
import { videoCardsCarousel } from "./videoCardsCarousel/hy";

export const home: HomeDict = {
  carousel,
  courses,
  ctaBanner,
  featuresSection,
  hero,
  logoCarouselSection,
  videoCardsCarousel,
};
