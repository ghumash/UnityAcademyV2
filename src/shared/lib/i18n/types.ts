import type { CommonDict } from "./directories/common/types";
import type { NavigationDict } from "./directories/common/navigation/types";
import type { FooterDict } from "./directories/common/footer/types";
import type { ErrorsDict } from "./directories/common/errors/types";
import { AboutDict } from "./directories/about/types";
import { ContactDict } from "./directories/contact/types";
import { HomeDict } from "./directories/home/types";


export type Dict = {
  common: CommonDict;
  navigation: NavigationDict;
  footer: FooterDict;
  errors: ErrorsDict;
  home: HomeDict;
  about: AboutDict;
  contact: ContactDict;
};
