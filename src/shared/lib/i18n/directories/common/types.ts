import type { ErrorsDict } from "./errors/types";
import type { NavigationDict } from "./navigation/types";
import type { FooterDict } from "./footer/types";
import type { FormsDict } from "./forms/types";
import type { SeoDict } from "./seo/types";
import type { CountdownDict } from "./countdown/types";

export type CommonDict = {
  errors: ErrorsDict;
  navigation: NavigationDict;
  footer: FooterDict;
  forms: FormsDict;
  seo: SeoDict;
  countdown: CountdownDict;
};
