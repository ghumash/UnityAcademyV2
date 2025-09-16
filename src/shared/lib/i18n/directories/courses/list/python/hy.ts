import type { CourseDict } from "../../types";

export const python: CourseDict = {
  courseHeroSection: {
    title: "Python ծրագրավորում",
    description:
      "Սովորիր Python ծրագրավորումը զրոյից։ Ստեղծիր վեբ հավելվածներ, տվյալների վերլուծություն, արհեստական բանականություն և ավտոմատացման գործիքներ։",
    level: "Սկսնակ",
    format: "Օֆլայն",
    duration: "5 Ամիս",
    lessonsCount: "40 Դաս",
    projectsCount: "10 Պրոեկտ",
    certificateIncluded: true,
    price: "40000 ֏",
    originalPrice: "50000 ֏",
    sale: "20% Զեղչ",
    registerCourseButtonText: "Գրանցվել դասընթացին",
    registerFreeLessonButtonText: "Գրանցվել անվճար դասի",
    certificate: "Սերտիֆիկատ",
    theme: "lime",
    formatLabel: "Ֆորմատ",
  },
  instructor: {
    display: false,
    name: "Դավիթ Ավետիսյան",
    role: "Senior Python Developer & Data Scientist",
    bio: "Փորձառու Python մշակող 7+ տարվա փորձով վեբ մշակման, տվյալների գիտության և մեքենայական ուսուցման ոլորտում: Մասնագիտանում եմ Django, Flask, pandas և scikit-learn-ում:",
    avatarUrl: "/users/david.jpg",
    socials: {
      github: "https://github.com/david-avetisyan",
      linkedin: "https://linkedin.com/in/david-avetisyan",
    },
    experience: {
      senior: {
        title: "Senior Python Developer",
        company: "DataTech Armenia",
        period: "2020 - ներկայումս",
        summary:
          "Python վեբ հավելվածների մշակում, տվյալների վերլուծության համակարգեր, ML մոդելների ինտեգրացիա, թիմի ղեկավարություն:",
      },
      mid: {
        title: "Python Developer",
        company: "TechSolutions Yerevan",
        period: "2018 - 2020",
        summary:
          "Django և Flask նախագծեր, REST API մշակում, տվյալների բազաների դիզայն, ավտոմատացման սկրիպտներ:",
      },
      junior: {
        title: "Junior Python Developer",
        company: "CodeAcademy Armenia",
        period: "2017 - 2018",
        summary:
          "Python հիմունքներ, վեբ scraping, տվյալների մշակում, բազային վեբ հավելվածներ:",
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
      "Թեմա 1: Python ներածություն, տեղադրում և կարգավորում",
      "Թեմա 2: Փոփոխականներ, տվյալների տիպեր, օպերատորներ",
      "Թեմա 3: Պայմաններ, ցիկլեր, ֆունկցիաներ",
      "Թեմա 4: Տվյալների կառուցվածքներ: ցուցակներ, բառարաններ",
      "Թեմա 5: Օբյեկտ-կողմնորոշված ծրագրավորում",
      "Թեմա 6: Ֆայլերի հետ աշխատանք, բացառություններ",
      "Թեմա 7: Մոդուլներ և փաթեթներ",
      "Թեմա 8: Ստանդարտ գրադարան և pip",
      "Թեմա 9: Վեբ scraping BeautifulSoup-ով",
      "Թեմա 10: Տվյալների մշակում pandas-ով",
      "Թեմա 11: Տվյալների վիզուալիզացիա matplotlib-ով",
      "Թեմա 12: NumPy և գիտական հաշվարկներ",
      "Թեմա 13: Տվյալների բազաների հետ աշխատանք SQLite",
      "Թեմա 14: Flask վեբ framework ներածություն",
      "Թեմա 15: Flask-ով վեբ հավելվածների ստեղծում",
      "Թեմա 16: Django framework հիմունքներ",
      "Թեմա 17: Django մոդելներ և տվյալների բազա",
      "Թեմա 18: Django templates և views",
      "Թեմա 19: REST API մշակում Django REST framework-ով",
      "Թեմա 20: Ավտոմատացման սկրիպտներ",
      "Թեմա 21: Մեքենայական ուսուցման ներածություն",
      "Թեմա 22: scikit-learn և ML մոդելներ",
      "Թեմա 23: Deployment և production",
      "Թեմա 24: Պորտֆոլիոյի ստեղծում և ներկայացում",
    ],
  },
  conditions: {
    title: "Դասընթացի հատուկ առավելությունները",
    list: [
      {
        title: "Ամբողջական նախագծեր",
        description: "Ստեղծում ենք իրական վեբ հավելվածներ, API-ներ և տվյալների վերլուծության գործիքներ:",
      },
      {
        title: "Ժամանակակից տեխնոլոգիաներ",
        description: "Սովորում ենք Django, Flask, pandas, numpy և այլ հայտնի Python գրադարանները:",
      },
      {
        title: "Մենտորային աջակցություն",
        description: "Անհատական ուղղորդում փորձառու Python մշակողների կողմից և կարիերային խորհրդատվություն:",
      },
    ],
  },
  cta: {
    title: "Python ծրագրավորում: Գրանցման հայտ",
    subtitle: "Սկսիր քո կարիերան Python-ով",
  },
};
