import { CommonDict } from "./directories/common/types";
import { AboutDict } from "./directories/about/types";
import { ContactDict } from "./directories/contact/types";
import { HomeDict } from "./directories/home/types";

export type HeaderDict = CommonDict["nav"];

export type Dict = {
  common: CommonDict;
  home: HomeDict;
  about: AboutDict;
  contact: ContactDict;
};
