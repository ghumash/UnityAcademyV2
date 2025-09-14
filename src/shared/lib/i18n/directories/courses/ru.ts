import { coursesSection } from "./general/coursesSection/ru";
import { graphic_design } from "./list/graphic_design/ru";
import { scratch } from "./list/scratch/ru";
import { web_development } from "./list/web_development/ru";
import { single } from "./single/ru";
import type { CoursesDict } from "./types";

export const courses: CoursesDict = {
  general: {
    coursesSection,
  },
  list: {
    graphic_design,
    scratch,
    web_development,
  },
  single,
};
