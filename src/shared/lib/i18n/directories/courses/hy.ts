import { coursesSection } from "./general/coursesSection/hy";
import { graphic_design } from "./list/graphic_design/hy";
import { scratch } from "./list/scratch/hy";
import { web_development } from "./list/web_development/hy";
import { smm } from "./list/smm/hy";
import { python } from "./list/python/hy";
import { android } from "./list/android/hy";
import { ui_ux } from "./list/ui_ux/hy";
import { hr } from "./list/hr/hy";
import { soft_skills } from "./list/soft_skills/hy";
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
    smm,
    python,
    android,
    ui_ux,
    hr,
    soft_skills,
  },
  single,
};
