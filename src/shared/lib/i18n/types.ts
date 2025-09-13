import type { CommonDict } from "./directories/common/types";
import type { AboutDict } from "./directories/about/types";
import type { ContactDict } from "./directories/contacts/types";
import type { HomeDict } from "./directories/home/types";
import type { CoursesDict } from "./directories/courses/types";
import type { ApplyDict } from "./directories/apply/types";
import type { FaqDict } from "./directories/faq/types";

export const locales = ["hy", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export type Dict = {
  common: CommonDict;
  home: HomeDict;
  about: AboutDict;
  courses: CoursesDict;
  contacts: ContactDict;
  apply: ApplyDict;
  faq: FaqDict;
};
