import { coursesSection } from "./general/coursesSection/en";
import { graphic_design } from "./list/graphic_design/en";
import { scratch } from "./list/scratch/en";
import { web_development } from "./list/web_development/en";
import { smm } from "./list/smm/en";
import { python } from "./list/python/en";
import { android } from "./list/android/en";
import { ui_ux } from "./list/ui_ux/en";
import { hr } from "./list/hr/en";
import { soft_skills } from "./list/soft_skills/en";
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
    smm,
    python,
    android,
    ui_ux,
    hr,
    soft_skills,
  },
  single,
};
