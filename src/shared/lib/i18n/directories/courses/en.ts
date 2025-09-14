import { coursesSection } from "./general/coursesSection/en";
import { graphic_design } from "./list/graphic_design/en";
import { scratch } from "./list/scratch/en";
import { web_development } from "./list/web_development/en";
import { single } from "./single/en";
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
