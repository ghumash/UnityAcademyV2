import { coursesSection } from "./general/coursesSection/hy";
import { graphic_design } from "./list/graphic_design/hy";
import { scratch } from "./list/scratch/hy";
import { web_development } from "./list/web_development/hy";
import { single } from "./single/hy";
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
