import type { CommonDict } from "./types";
import { errors } from "./errors/en";
import { navigation } from "./navigation/en";
import { footer } from "./footer/en";

export const common: CommonDict = {
  site: {
    name: "Unity Academy",
    shortName: "Unity",
    description: "Your future in IT starts here",
    locale: "en-US",
  },
  errors,
  navigation,
  footer,
};
