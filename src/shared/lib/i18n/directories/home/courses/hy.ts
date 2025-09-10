import type { CoursesDict } from "../types";

export const courses: CoursesDict = {
  title: "Մեր դասընթացները",
  courses: [
    {
      title: "Web: HTML, CSS, JavaScript, React",
      description:
        "Սկսած զրոյից մինչև առաջին նախագծերը: վերստակում, բաղադրիչներ, երթուղավորում, API-ի հետ աշխատանք և տեղակայում: Գործնական աշխատանք իրական առաջադրանքների վրա:",
      duration: "6 ամիս",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Python: AI, ML",
      description:
        "ML/AI հիմունքներ, հուշում-ինժեներություն, պատրաստի մոդելների հետ աշխատանք և նախագծերում ինտեգրում:",
      duration: "6 ամիս",
      level: "intermediate",
      format: "offline",
    },
    {
      title: "Kids Coding: Scratch, Python",
      description:
        "Հաղորդակցություն, ժամանակի կառավարում, թիմում աշխատանք, հարցազրույցներ և պորտֆոլիո:",
      duration: "4 ամիս",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Android: Java, Kotlin",
      description:
        "Ծրագրերի ճարտարապետություն, UI/UX բջջայինի համար, հրապարակում և աջակցություն: Գործնական աշխատանք իրական դեպքերի հետ:",
      duration: "6 ամիս",
      level: "intermediate",
      format: "offline",
    },
    {
      title: "SMM | Digital Marketing: Instagram, Facebook, LinkedIn, Telegram",
      description:
        "Ռազմավարություն, բովանդակության պլան, պատմություն պատմել, մետրիկներ և աճ: Գործնական աշխատանք Instagram, TikTok և YouTube-ի համար:",
      duration: "3 ամիս",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Graphic Design: Photoshop, Illustrator, Figma",
      description:
        "Կոմպոզիցիա, տիպոգրաֆիա, գույն, Figma/Photoshop-ում աշխատանք: Պոստերների, բանների և բրենդ-գայդների ստեղծում:",
      duration: "3 ամիս",
      level: "beginner",
      format: "offline",
    },
  ],
  levels: {
    beginner: "Սկսնակ",
    intermediate: "Միջին",
    advanced: "Բարձր",
  },
  formats: {
    online: "Առցանց",
    offline: "Լոկալ",
    hybrid: "Հիբրիդ",
  },
};
