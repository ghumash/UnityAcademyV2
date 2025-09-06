import type { Dict } from "../types";

import { common } from "./common/ru";
import { home } from "./home/ru";
import { about } from "./about/ru";
import { contact } from "./contact/ru";

export const ru: Dict = {
  common,
  navigation: common.navigation,
  footer: common.footer,
  errors: common.errors,
  home,
  about,
  contact,
} as const;

export default ru