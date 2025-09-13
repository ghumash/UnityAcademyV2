import { coursesSection } from "./general/coursesSection/hy";
import { graphic_design } from "./list/graphic_design/hy";
import type { CoursesDict } from "./types";

export const courses: CoursesDict = {
  general: {
    coursesSection,
  },
  list: {
    graphic_design,
  },
  single: {
    benefits: {
      title_part1: "Սովորելով Unity Academy-ում՝",
      title_part2: "դու կստանաս հետևյալ առավելությունները",
      hr_training: {
        title_part1: "Անվճար",
        title_part2: "HR թրեյնինգ",
        description:
          "Թրեյնինգը շրջանավարտներին հնարավորություն կտա ծանոթանալ CV ստեղծելու կարևոր կանոններին, հասկանալ՝ ինչպես ճիշտ պատրաստվել և ներկայանալ հարցազրույցի և իմանալ բոլոր հուզող հարցերի պատասխանները:",
      },
      english_course: {
        title_part1: "Անգլերեն դասընթաց",
        title_part2: "հատուկ պայմաններով",
        description:
          "Լավագույն ուսանողները կստանան աշխատանքի առաջարկ մեր և/կամ գործընկերների կողմից",
      },
      portfolio: {
        title: "Պորտֆոլիո և ինքնակենսագրական",
        description:
          "Դասընթացի ավարտին դուք կունենաք պրոֆեսիոնալ աշխատանքներ և կօգնենք ստեղծել գրագետ ինքնակենսագրական (CV)՝ արագ մուտք գործելու համար աշխատաշուկա",
      },
    },
    conditions: {
      badge: "Դասընթացի պայմանները",
      community: {
        title: "Լինել",
        description: "Ուժեղ և ոգեշնչող համայնքի մաս",
      },
    },
    instructor: {
      name: "Անա Պետրովա",
      role: "Senior Frontend Developer",
      bio: "Փորձառու ֆրոնտենդ-մշակող 5+ տարվա փորձով ժամանակակից վեբ-հավելվածներ ստեղծելու գործում: Մասնագիտանում եմ React, TypeScript և արդյունավետության բարելավման ոլորտում:",
      experience: {
        senior: {
          title: "Senior Frontend Developer",
          company: "TechCorp Inc.",
          period: "2022 - ներկայումս",
          summary:
            "4 մշակողների թիմի ղեկավարություն, մեծածավալ React հավելվածների ճարտարապետություն և մշակում, լավագույն պրակտիկաների ներդրում և կոդի գնահատում:",
        },
        mid: {
          title: "Frontend Developer",
          company: "StartupXYZ",
          period: "2020 - 2022",
          summary:
            "SaaS հարթակի օգտատիրական ինտերֆեյսների մշակում, արդյունավետության օպտիմիզացում, REST API և GraphQL-ի հետ ինտեգրում:",
        },
        junior: {
          title: "Junior Frontend Developer",
          company: "WebStudio",
          period: "2019 - 2020",
          summary:
            "Ադապտիվ վեբ-կայքերի ստեղծում, ժամանակակից ֆրեյմվորկների ուսուցում, թիմային մշակման և կոդի գնահատման գործընթացներում մասնակցություն:",
        },
      },
    },
    topics: {
      title: "Դասընթացի թեմաները",
    },
    faq_banner: {
      heading: "Քեզ անհանգստացնող հարցերի պատասխանները",
      button_text: "Անցնել հղումով",
    },
  },
};
