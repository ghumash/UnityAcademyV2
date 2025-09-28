import type { Dict } from "../types";

import { common } from "./common/hy";
import { home } from "./home/hy";
import { about } from "./about/hy";
import { courses } from "./courses/hy";
import { contacts } from "./contacts/hy";
import { apply } from "./apply/hy";
import { faq } from "./faq/hy";
import { events } from "./events/hy";

export const hy: Dict = {
  common,
  home,
  about,
  courses,
  events,
  contacts,
  apply,
  faq,
};
