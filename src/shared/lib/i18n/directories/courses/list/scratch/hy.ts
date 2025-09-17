import type { CourseDict } from "../../types";

export const scratch: CourseDict = {
  courseHeroSection: {
    title: "Scratch: Ծրագրավորման հիմունքներ երեխաների համար",
    description:
      "Սովորիր ծրագրավորման հիմունքները Scratch-ի միջոցով։ Ստեղծիր սեփական խաղեր, անիմացիաներ և ինտերակտիվ պատմություններ։ Կատարյալ է սկսնակների և երեխաների համար։",
    level: "Սկսնակ",
    format: "Օֆլայն",
    duration: "2 Ամիս",
    lessonsCount: "16 Դաս",
    projectsCount: "6 Պրոեկտ",
    certificateIncluded: true,
    price: "20000 ֏",
    originalPrice: "50000 ֏",
    sale: "60% Զեղչ",
    registerCourseButtonText: "Գրանցվել դասընթացին",
    registerFreeLessonButtonText: "Գրանցվել անվճար դասի",
    certificate: "Սերտիֆիկատ",
    theme: "orange",
    formatLabel: "Ֆորմատ",
  },
  projects: [
    {
      img: "/images/projects/project.jpg",
      href: "https://example.com/project1"
    },
    {
      img: "/images/projects/project.jpg",
      href: "https://example.com/project2"
    },
    {
      img: "/images/projects/project.jpg",
      href: "https://example.com/project3"
    },
  ],
  instructor: {
    name: "Մարիամ Ավագյան",
    role: "Scratch Instructor & Game Developer",
    bio: "Փորձառու ուսուցիչ և խաղային մշակող 4+ տարվա փորձով երեխաների ծրագրավորման ուսուցման գործում: Մասնագիտանում եմ Scratch, Blockly և ստեղծագործական ծրագրավորման ոլորտում:",
    avatarUrl: "/users/mariam.jpg",
    socials: {
      instagram: "https://instagram.com/mariam_scratch_teacher",
      linkedin: "https://linkedin.com/in/mariam-avagyan",
    },
    experience: {
      senior: {
        title: "Senior Scratch Instructor",
        company: "CodeKids Academy",
        period: "2021 - ներկայումս",
        summary:
          "200+ երեխաների ուսուցում Scratch ծրագրավորման, ուսումնական ծրագրերի մշակում, ծնողների և երեխաների հետ աշխատանք:",
      },
      mid: {
        title: "Game Developer",
        company: "EduGames Studio",
        period: "2020 - 2021",
        summary:
          "Կրթական խաղերի մշակում երեխաների համար, ինտերակտիվ ուսումնական նյութերի ստեղծում, Scratch-ի հիման վրա կառուցված նախագծեր:",
      },
      junior: {
        title: "Programming Tutor",
        company: "TechStart Kids",
        period: "2019 - 2020",
        summary:
          "Անհատական և խմբային դասեր Scratch-ով, ծրագրավորման հիմունքների ուսուցում, ստեղծագործական մտածողության զարգացում:",
      },
    },
    experienceLabel: "Աշխատանքային փորձ",
    socialNetworksLabel: "Սոցիալական ցանցեր",
    showDetails: "Ցույց տալ մանրամասները",
    hideDetails: "Թաքցնել մանրամասները",
  },
  topics: {
    title: "Դասընթացի թեմաները",
    list: [
      "Թեմա 1: Ծանոթություն Scratch-ի հետ, ինտերֆեյս",
      "Թեմա 2: Sprite-ներ և բեմ, հիմնական գործիքներ",
      "Թեմա 3: Շարժում և կոորդինատներ",
      "Թեմա 4: Տեսք և ձայն, կոստյումներ",
      "Թեմա 5: Իրադարձություններ և հսկողություն",
      "Թեմա 6: Պայմաններ և ճյուղավորում",
      "Թեմա 7: Ցիկլեր և կրկնություններ",
      "Թեմա 8: Փոփոխականներ և ցուցակներ",
      "Թեմա 9: Ֆունկցիաներ և բլոկներ",
      "Թեմա 10: Խաղերի ստեղծում - առաջին նախագիծ",
      "Թեմա 11: Անիմացիա և պատմություններ",
      "Թեմա 12: Ինտերակտիվ նախագծեր",
      "Թեմա 13: Ալգորիթմական մտածողություն",
      "Թեմա 14: Բարդ նախագծերի ստեղծում",
      "Թեմա 15: Նախագծերի ներկայացում և կիսվելու եղանակներ",
      "Թեմա 16: Ամփոփում և հետագա քայլեր",
    ],
  },
  conditions: {
    title: "Դասընթացի հատուկ առավելությունները",
    list: [
      {
        title: "Կրեատիվ մոտեցում",
        description: "Երեխաները ստեղծում են իրենց անիմացիաներ, խաղեր և ինտերակտիվ պատմություններ:",
      },
      {
        title: "Լոգիկական մտածելակերպ",
        description: "Սովորում են ալգորիթմական մտածելակերպը, հաջարդականությունը և խնդիր լուծման հմտությունները:",
      },
      {
        title: "Տասնային ատմոսֆեր",
        description: "Աշխատում են բարեկամական միջավայրում և սովորում են միասին աշխատել նախագծերի վրա:",
      },
    ],
  },
  cta: {
    title: "Scratch: Գրանցման հայտ",
    subtitle: "Սկսիր ծրագրավորման արկածը",
  },
};
