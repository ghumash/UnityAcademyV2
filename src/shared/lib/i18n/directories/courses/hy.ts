import { coursesSection } from "./general/coursesSection/hy";
import { graphic_design } from "./list/graphic_design/hy";
import { single } from "./single/hy";
import type { CoursesDict } from "./types";

export const courses: CoursesDict = {
  general: {
    coursesSection,
  },
  list: {
    graphic_design,
  },
  single,
};
