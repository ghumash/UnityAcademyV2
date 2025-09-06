import type { Dict } from "../types";

import { common } from "./common/hy";
import { home } from "./home/hy";
import { about } from "./about/hy";
import { contact } from "./contact/hy";

export const hy: Dict = {
  common,
  navigation: common.navigation,
  footer: common.footer,
  errors: common.errors,
  home,
  about,
  contact,
} as const;

export default hy
