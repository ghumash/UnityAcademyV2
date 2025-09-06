import { CommonDict } from "./directories/common/types";
import { NavigationDict } from "./directories/navigation/types";
import { FooterDict } from "./directories/footer/types";
import { AboutDict } from "./directories/about/types";
import { ContactDict } from "./directories/contact/types";
import { HomeDict } from "./directories/home/types";


export type Dict = {
  common: CommonDict;
  navigation: NavigationDict;
  footer: FooterDict;
  home: HomeDict;
  about: AboutDict;
  contact: ContactDict;
};
