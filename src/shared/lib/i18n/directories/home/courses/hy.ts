import type { CoursesDict } from "../../../types";

export const courses: CoursesDict = {
  title: "Մեր դասընթացները",
  courses: [
    {
      title: "Վեբ-զարգացում: HTML, CSS, JavaScript, React",
      description: "Սկսած զրոյից մինչև առաջին նախագծերը: վերստակում, բաղադրիչներ, երթուղավորում, API-ի հետ աշխատանք և տեղակայում: Գործնական աշխատանք իրական առաջադրանքների վրա:",
      duration: "3 ամիս",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Արհեստական բանականություն: հիմունքներ և պրակտիկաներ",
      description: "ML/AI հիմունքներ, հուշում-ինժեներություն, պատրաստի մոդելների հետ աշխատանք և նախագծերում ինտեգրում:",
      duration: "2 ամիս",
      level: "intermediate",
      format: "hybrid",
    },
    {
      title: "Գրաֆիկական դիզայն",
      description: "Կոմպոզիցիա, տիպոգրաֆիա, գույն, Figma/Photoshop-ում աշխատանք: Պոստերների, բանների և բրենդ-գայդների ստեղծում:",
      duration: "2 ամիս",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Android զարգացում",
      description: "Ծրագրերի ճարտարապետություն, UI/UX բջջայինի համար, հրապարակում և աջակցություն: Գործնական աշխատանք իրական դեպքերի հետ:",
      duration: "3 ամիս",
      level: "intermediate",
      format: "online",
    },
    {
      title: "SMM և բովանդակության ստեղծում",
      description: "Ռազմավարություն, բովանդակության պլան, պատմություն պատմել, մետրիկներ և աճ: Գործնական աշխատանք Instagram, TikTok և YouTube-ի համար:",
      duration: "1.5 ամիս",
      level: "beginner",
      format: "hybrid",
    },
    {
      title: "Soft Skills և կարիերա",
      description: "Հաղորդակցություն, ժամանակի կառավարում, թիմում աշխատանք, հարցազրույցներ և պորտֆոլիո:",
      duration: "1 ամիս",
      level: "beginner",
      format: "offline",
    },
  ],
  levels: {
    beginner: "Սկսնակներին",
    intermediate: "Միջին",
    advanced: "Ընդլայնված",
  },
  formats: {
    online: "Առցանց",
    offline: "Անձամբ",
    hybrid: "Հիբրիդ",
  },
};
