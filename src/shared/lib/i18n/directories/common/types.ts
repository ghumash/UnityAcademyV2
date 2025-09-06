import type { ErrorsDict } from "./errors/types";
import type { NavigationDict } from "./navigation/types";
import type { FooterDict } from "./footer/types";

export type CommonDict = {
  site: {
    name: string;
    shortName: string;
    description: string;
    locale: string;
  };
  errors: ErrorsDict;
  navigation: NavigationDict;
  footer: FooterDict;
};
