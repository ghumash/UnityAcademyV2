import type { CommonDict } from "./directories/common/types";
import type { AboutDict } from "./directories/about/types";
import type { ContactDict } from "./directories/contact/types";
import type { HomeDict } from "./directories/home/types";

export const locales = ["hy", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export type Dict = {
  common: CommonDict;
  home: HomeDict;
  about: AboutDict;
  contact: ContactDict;
};
