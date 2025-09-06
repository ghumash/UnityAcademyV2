import type { Dict } from "../types";

import { common } from "./common/en";
import { home } from "./home/en";
import { about } from "./about/en";
import { contact } from "./contact/en";

export const en: Dict = {
  common,
  navigation: common.navigation,
  footer: common.footer,
  errors: common.errors,
  home,
  about,
  contact,
} as const;

export default en