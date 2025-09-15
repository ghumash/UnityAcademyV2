import type { CommonDict } from "./types";
import { errors } from "./errors/hy";
import { navigation } from "./navigation/hy";
import { footer } from "./footer/hy";
import { site } from "./site/hy";
import { forms } from "./forms/hy";
import { seo } from "./seo/hy";

export const common: CommonDict = {
  site,
  errors,
  navigation,
  footer,
  forms,
  seo,
};
