import { coursesSection } from "./general/coursesSection/ru";
import { graphic_design } from "./list/graphic_design/ru";
import { scratch } from "./list/scratch/ru";
import { web_development } from "./list/web_development/ru";
import { smm } from "./list/smm/ru";
import { python } from "./list/python/ru";
import { android } from "./list/android/ru";
import { ui_ux } from "./list/ui_ux/ru";
import { hr } from "./list/hr/ru";
import { soft_skills } from "./list/soft_skills/ru";
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
    smm,
    python,
    android,
    ui_ux,
    hr,
    soft_skills,
  },
  single,
};
