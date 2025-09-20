import type { CourseDict } from "../../types";

export const ui_ux: CourseDict = {
  courseHeroSection: {
    title: "UI/UX դիզայն",
    description:
      "Սովորիր օգտատիրական ինտերֆեյսի և փորձի դիզայնը։ Ստեղծիր գեղեցիկ և ֆունկցիոնալ դիզայններ, աշխատիր Figma-ով և զարգացրու քո ստեղծագործական հմտությունները։",
    level: "Սկսնակ",
    format: "Օֆլայն",
    duration: "4 Ամիս",
    lessonsCount: "32 Դաս",
    weeklyLessonCount: "Շաբաթական 2 Դաս",
    projectsCount: "8 Պրոեկտ",
    certificateIncluded: true,
    price: "40 000 ֏",
    originalPrice: "50 000 ֏",
    sale: "20% Զեղչ",
    registerCourseButtonText: "Գրանցվել դասընթացին",
    registerFreeLessonButtonText: "",
    certificate: "Սերտիֆիկատ",
    theme: "fuchsia",
    formatLabel: "Ֆորմատ",
    discountTimer: {
      title: "Զեղչը գործում է",
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
    display: false,
    name: "Նարե Հակոբյան",
    role: "Senior UI/UX Designer & Product Designer",
    bio: "Փորձառու UI/UX դիզայներ 6+ տարվա փորձով թվային արտադրանքների դիզայնի ոլորտում: Մասնագիտանում եմ օգտագործների հետազոտության, wireframing և prototyping ոլորտում:",
    avatarUrl: "/instructors/nare-hakobyan.jpg",
    experience: {
      senior: {
        title: "Senior UI/UX Designer",
        company: "DesignLab Armenia",
        period: "2021 - ներկայումս",
        summary:
          "Բարդ վեբ և մոբայլ հավելվածների UX/UI դիզայն, օգտատիրական հետազոտություններ, դիզայն համակարգերի ստեղծում:",
      },
      mid: {
        title: "Product Designer",
        company: "TechStudio Yerevan",
        period: "2019 - 2021",
        summary:
          "Մոբայլ հավելվածների դիզայն, օգտատիրական ինտերֆեյսների մշակում, A/B testing, դիզայն մետրիկաների վերլուծություն:",
      },
      junior: {
        title: "Junior UI Designer",
        company: "Creative Hub",
        period: "2018 - 2019",
        summary:
          "Վեբ կայքերի դիզայն, գրաֆիկական նյութերի ստեղծում, բրենդինգ, Figma և Adobe Creative Suite-ով աշխատանք:",
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
      "Թեմա 1: UI/UX դիզայնի ներածություն",
      "Թեմա 2: Դիզայնի սկզբունքներ և տեսություն",
      "Թեմա 3: Օգտատիրական հետազոտություններ",
      "Թեմա 4: Personas և User Journey Mapping",
      "Թեմա 5: Information Architecture",
      "Թեմա 6: Wireframing և Sketching",
      "Թեմա 7: Figma գործիքի ծանոթություն",
      "Թեմա 8: Typography և տառատեսակներ",
      "Թեմա 9: Գույների տեսություն և պալիտրա",
      "Թեմա 10: Layout և Grid Systems",
      "Թեմա 11: Visual Hierarchy և Composition",
      "Թեմա 12: Iconography և Illustrations",
      "Թեմա 13: Mobile-First Design",
      "Թեմա 14: Responsive Design",
      "Թեմա 15: Prototyping և Interactions",
      "Թեմա 16: Micro-interactions և Animations",
      "Թեմա 17: Usability Testing",
      "Թեմա 18: Accessibility և Inclusive Design",
      "Թեմա 19: Design Systems",
      "Թեմա 20: Handoff և Developer Collaboration",
      "Թեմա 21: Portfolio Development",
      "Թեմա 22: Case Study Creation",
      "Թեմա 23: Design Trends և Best Practices",
      "Թեմա 24: Career Development և Presentation",
    ],
  },
  conditions: {
    title: "Դասընթացի հատուկ առավելությունները",
    list: [
      {
        title: "Ինտերակտիվ պրոտոտիպներ",
        description: "Ստեղծում ենք կենդանի պրոտոտիպներ Figma-ով և սովորում ենք օգտատերերի փորձի դիզայնի սկզբունքները:",
      },
      {
        title: "Իրական պրոյեկտներ",
        description: "Աշխատում ենք իրական բիզնես խնդիրների վրա և ստեղծում ենք ամբողջական UI/UX լուծումներ:",
      },
      {
        title: "Ինդուստրիայի ստանդարտներ",
        description: "Սովորում ենք Design System-ներ, Accessibility և ժամանակակից դիզայնի լավագույն պրակտիկաները:",
      },
    ],
  },
  cta: {
    title: "UI/UX դիզայն: Գրանցման հայտ",
    subtitle: "Սկսիր քո կարիերան դիզայնի ոլորտում",
  },
};
