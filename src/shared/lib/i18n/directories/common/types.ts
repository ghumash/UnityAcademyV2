import type { ErrorsDict } from "./errors/types";
import type { NavigationDict } from "./navigation/types";
import type { FooterDict } from "./footer/types";
import type { SiteDict } from "./site/types";
import type { FormsDict } from "./forms/types";
import type { SeoDict } from "./seo/types";

export type CommonDict = {
  site: SiteDict;
  errors: ErrorsDict;
  navigation: NavigationDict;
  footer: FooterDict;
  forms: FormsDict;
  seo: SeoDict;
};
