import type { CourseDict } from "../../types";

export const scratch: CourseDict = {
  courseHeroSection: {
    title: "Scratch: Ծրագրավորման հիմունքներ երեխաների համար",
    description:
      "Սովորիր ծրագրավորման հիմունքները Scratch-ի միջոցով։ Ստեղծիր սեփական խաղեր, անիմացիաներ և ինտերակտիվ պատմություններ։ Կատարյալ է սկսնակների և երեխաների համար։",
    level: "Սկսնակ",
    format: "Օֆլայն",
    duration: "4 Ամիս",
    lessonsCount: "32 Դաս",
    weeklyLessonCount: "Շաբաթական 2 Դաս",
    projectsCount: "8 Նախագիծ",
    certificateIncluded: true,
    price: "20 000 ֏",
    originalPrice: "50 000 ֏",
    sale: "60% Զեղչ",
    registerCourseButtonText: "Գրանցվել դասընթացին",
    registerFreeLessonButtonText: "",
    certificate: "Սերտիֆիկատ",
    theme: "orange",
    formatLabel: "Ֆորմատ",
    discountTimer: {
      title: "Զեղչը գործում է՝",
      subtitle: "Շտապիր գրանցվել:",
    },
  },
  projects: {
    display: false,
    subtitle: "ՍՏԵՂԾԻՐ ՔՈ ԱՆՁՆԱԿԱՆԸ",
    titlePart1: "Դասընթացավարի",
    titlePart2: "Աշխատանքները",    list: [
      {
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project1",
      },
      {
        img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project2",
      },
      {
        img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project3",
      },
      {
        img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project4",
      },
    ],
  },
  instructor: {
    name: "Անի Թամարյան",
    role: "Scratch Instructor & Game Developer",
    bio: "Ես ծրագրավորման ուսուցիչ եմ՝ փորձառություն ունենալով ավելի քան 100+ երեխաների ուսուցման մեջ։ Մասնագիտանում եմ Scratch ծրագրավորման, ալգորիթմների և թվային հմտությունների ուսուցման մեջ, ինչպես նաև զբաղվում եմ ուսումնական ծրագրերի մշակմամբ։ Իմ նպատակն է տեխնոլոգիաները դարձնել հասանելի, հետաքրքիր և մոտիվացնող՝ նպաստելով երեխաների տրամաբանական մտածողության և ստեղծագործականության զարգացմանը։",
    avatarUrl: "/images/users/ani.png",
    socials: {
      // instagram: "https://instagram.com/mariam_scratch_teacher",
      // linkedin: "https://linkedin.com/in/mariam-avagyan",
    },
    experience: {
      senior: {
        title: "Coding Instructor",
        company: "Armath Engineering Laboratories",
        period: "2024 - ներկայումս",
        summary:
          "Դասավանդում եմ երեխաներին Scratch ծրագրավորում, ալգորիթմների հիմունքներ և թվային հմտություններ։ Ուսուցանել եմ ավելի քան 200+ երեխայի, մշակել եմ ուսումնական ծրագրեր և կազմակերպել արդյունավետ հաղորդակցություն թե՛ երեխաների, թե՛ ծնողների հետ։",
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
      "Թեմա 5: Իվենթներ և հսկողություն",
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
        description:
          "Երեխաները ստեղծում են իրենց անիմացիաներ, խաղեր և ինտերակտիվ պատմություններ:",
      },
      {
        title: "Լոգիկական մտածելակերպ",
        description:
          "Սովորում են ալգորիթմական մտածելակերպը, հաջարդականությունը և խնդիր լուծման հմտությունները:",
      },
      {
        title: "Տասնային ատմոսֆեր",
        description:
          "Աշխատում են բարեկամական միջավայրում և սովորում են միասին աշխատել նախագծերի վրա:",
      },
    ],
  },
  cta: {
    title: "Scratch: Գրանցման հայտ",
    subtitle: "Սկսիր ծրագրավորման արկածը",
  },
};
