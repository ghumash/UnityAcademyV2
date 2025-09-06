import type { CommonDict } from "./types";
import { errors } from "./errors/hy";
import { navigation } from "./navigation/hy";
import { footer } from "./footer/hy";
import { site } from "./site/hy";

export const common: CommonDict = {
  site,
  errors,
  navigation,
  footer,
};
