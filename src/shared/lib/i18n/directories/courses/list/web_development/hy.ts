import type { CourseDict } from "../../types";

export const web_development: CourseDict = {
  courseHeroSection: {
    title: "Վեբ ծրագրավորում: HTML, CSS, JavaScript",
    description:
      "Սովորիր ժամանակակից վեբ ծրագրավորումը զրոյից։ Ստեղծիր ռեսպոնսիվ կայքեր, ինտերակտիվ վեբ հավելվածներ և պրոֆեսիոնալ պորտֆոլիո։ Կատարյալ է սկսնակների և միջին մակարդակի մասնագետների համար։",
    level: "Սկսնակ",
    format: "Օֆլայն",
    duration: "6 Ամիս",
    lessonsCount: "48 Դաս",
    weeklyLessonCount: "Շաբաթական 2 Դաս",
    projectsCount: "12 Նախագիծ",
    certificateIncluded: true,
    price: "40 000 ֏",
    originalPrice: "50 000 ֏",
    sale: "20% Զեղչ",
    registerCourseButtonText: "Գրանցվել դասընթացին",
    registerFreeLessonButtonText: "Գրանցվել անվճար դասի",
    certificate: "Սերտիֆիկատ",
    theme: "blue",
    formatLabel: "Ֆորմատ",
  },
    projects: {
    display: false,
    subtitle: "ՍՏԵՂԾԻՐ ՔՈ ԱՆՁՆԱԿԱՆԸ",
    titlePart1: "Դասընթացավարի",
    titlePart2: "Աշխատանքները",    list: [
      {
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project1"
      },
      {
        img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project2"
      },
      {
        img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project3"
      },
      {
        img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project4"
      },
    ],
  },
  instructor: {
    name: "Վաղարշակ Գասպարյան",
    role: "Senior Full-Stack Developer",
    bio: "Փորձառու համակարգչային ծրագրավորող 9+ տարվա աշխատանքային փորձով, հմտորեն զբաղվում է ամբողջական փաթեթի մշակման, վեբ ծրագրավորման, ծրագրային ապահովման ճարտարագիտության և տվյալների բազայի նախագծման մեջ:",
    avatarUrl: "/images/users/vagharshak.png",
    socials: {
      github: "https://github.com/VagharshakGasparyan",
      linkedin: "https://www.linkedin.com/in/vagharshak-gasparyan-6401b2316/",
    },
    experience: {
      senior: {
        title: "Full-Stack Developer",
        company: "WebTop",
        period: "2022 - ներկայումս",
        summary:
          "Վեբ հավելվածների ճարտարապետություն և մշակում, թիմի ղեկավարություն, կոդի գրախոսություն, 50+ նախագծերի իրականացում:",
      },
      mid: {
        title: "Full-Stack Developer",
        company: "OmniCode",
        period: "2016 - 2022",
        summary:
          "Ծրագրավորող-մշակող OmniCode-ում (Հայաստան, Լոռի, Վանաձոր): Բարելավել եմ առկա կայքերը: Գտել եմ թույլ կողմերը և շտկել դրանք: Մշակել եմ կայքեր զրոյից՝ օգտագործելով տվյալների բազա, գրել եմ backend և frontend: Գրել եմ Node js-ի վրա հիմնված socket-ներ, մշակել եմ միկրոսերվիսներ: Աշխատել եմ Google ծառայություններով, Amazon ծառայություններով, տարբեր վճարային համակարգերով և այլն:",
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
      "Թեմա 1: Վեբ ծրագրավորման ներածություն, HTML հիմունքներ",
      "Թեմա 2: HTML տարրեր, ատրիբուտներ, սեմանտիկ մարկապ",
      "Թեմա 3: CSS հիմունքներ, ընտրիչներ, հատկություններ",
      "Թեմա 4: CSS Box Model, դիրքավորում, flexbox",
      "Թեմա 5: CSS Grid, ռեսպոնսիվ դիզայն, media queries",
      "Թեմա 6: JavaScript հիմունքներ, փոփոխականներ, տվյալների տիպեր",
      "Թեմա 7: JavaScript ֆունկցիաներ, պայմաններ, ցիկլեր",
      "Թեմա 8: DOM մանիպուլյացիա, իրադարձություններ",
      "Թեմա 9: JavaScript օբյեկտներ, զանգվածներ, մեթոդներ",
      "Թեմա 10: Ասինխրոն ծրագրավորում, Promise, async/await",
      "Թեմա 11: API-ների հետ աշխատանք, fetch, AJAX",
      "Թեմա 12: Git և GitHub, տարբերակների վերահսկողություն",
      "Թեմա 13: Վեբ հավելվածների ճարտարապետություն",
      "Թեմա 14: React.js հիմունքներ, կոմպոնենտներ",
      "Թեմա 15: React Hooks, վիճակի կառավարում",
      "Թեմա 16: Node.js և Express.js ներածություն",
      "Թեմա 17: Տվյալների բազաների հիմունքներ, MongoDB",
      "Թեմա 18: REST API մշակում",
      "Թեմա 19: Վեբ անվտանգություն, authentication",
      "Թեմա 20: Deployment և hosting",
      "Թեմա 21: Կատարողականության օպտիմիզացիա",
      "Թեմա 22: Testing և debugging",
      "Թեմա 23: Ժամանակակից զարգացման գործիքներ",
      "Թեմա 24: Պորտֆոլիոյի ստեղծում և ներկայացում",
    ],
  },
  conditions: {
    title: "Դասընթացի հատուկ առավելությունները",
    list: [
      {
        title: "Ժամանակակից տեխնոլոգիաներ",
        description:
          "Աշխատում ենք HTML, CSS, JavaScript, ReactJS, Git և այլ ժամանակակից ֆրոնտենդ տեխնոլոգիաներով",
      },
      {
        title: "Task Manager ծրագիր",
        description:
          "Դասընթացի որպես գլխավոր պրոեկտ կստեղծեք ձեր անձնական Task Manager ծրագիրը ամբողջական ֆունկցիոնալով",
      },
      {
        title: "Պրակտիկ նախագծեր",
        description:
          "Դասընթացի ընթացքում կստեղծեք տարբեր պրոեկտներ որոնք կամրացնեք ձեր GitHub-ի հարթակում որոնք կոգնեն աշխատանքի ընդունման հարցում",
      },
    ],
  },
  cta: {
    title: "Վեբ ծրագրավորում: Գրանցման հայտ",
    subtitle: "Սկսիր քո կարիերան վեբ մշակման ոլորտում",
  },
};
