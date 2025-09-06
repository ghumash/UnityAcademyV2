import type { CommonDict } from "./types";
import { errors } from "./errors/hy";
import { navigation } from "./navigation/hy";
import { footer } from "./footer/hy";

export const common: CommonDict = {
  site: {
    name: "Unity Academy",
    shortName: "Unity",
    description: "Ձեր ապագան IT-ում սկսվում է այստեղ",
    locale: "hy-AM",
  },
  errors,
  navigation,
  footer,
};
