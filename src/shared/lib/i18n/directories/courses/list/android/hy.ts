import type { CourseDict } from "../../types";

export const android: CourseDict = {
  courseHeroSection: {
    title: "Android ծրագրավորում: Java & Kotlin",
    description:
      "Սովորիր Android հավելվածների մշակումը Java և Kotlin լեզուներով։ Ստեղծիր բջջային հավելվածներ, աշխատիր Google Play Store-ի հետ և զարգացրու քո մոբայլ մշակման հմտությունները։",
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
    registerFreeLessonButtonText: "",
    certificate: "Սերտիֆիկատ",
    theme: "emerald",
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
    name: "Արտակ Գրիգորյան",
    role: "Senior Android Developer & Mobile Architect",
    bio: "Փորձառու Android մշակող 8+ տարվա փորձով մոբայլ հավելվածների մշակման ոլորտում: Մասնագիտանում եմ Java, Kotlin, Android SDK և ժամանակակից մոբայլ ճարտարապետության ոլորտում:",
    avatarUrl: "/instructors/artak-grigoryan.jpg",
    experience: {
      senior: {
        title: "Senior Android Developer",
        company: "MobileTech Armenia",
        period: "2020 - ներկայումս",
        summary:
          "Android հավելվածների ճարտարապետություն և մշակում, թիմի ղեկավարություն, կոդի գրախոսություն, 30+ հավելվածների հրապարակում:",
      },
      mid: {
        title: "Android Developer",
        company: "AppStudio Yerevan",
        period: "2018 - 2020",
        summary:
          "Native Android հավելվածներ, Material Design իրականացում, REST API ինտեգրացիա, Google Services աշխատանք:",
      },
      junior: {
        title: "Junior Mobile Developer",
        company: "DevHub Armenia",
        period: "2016 - 2018",
        summary:
          "Android հիմունքներ, Java ծրագրավորում, UI/UX իրականացում, բազային հավելվածների մշակում:",
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
      "Թեմա 1: Android մշակման ներածություն, Android Studio",
      "Թեմա 2: Java հիմունքներ Android-ի համար",
      "Թեմա 3: Kotlin լեզվի ներածություն",
      "Թեմա 4: Android SDK և API levels",
      "Թեմա 5: Activities և Lifecycle",
      "Թեմա 6: Fragments և Navigation",
      "Թեմա 7: Layouts և Views",
      "Թեմա 8: Material Design և UI/UX",
      "Թեմա 9: RecyclerView և Adapters",
      "Թեմա 10: Intents և Data Passing",
      "Թեմա 11: SharedPreferences և Data Storage",
      "Թեմա 12: SQLite տվյալների բազա",
      "Թեմա 13: Room Database",
      "Թեմա 14: Networking և HTTP requests",
      "Թեմա 15: JSON parsing և Retrofit",
      "Թեմա 16: Images և Picasso/Glide",
      "Թեմա 17: Background Tasks և AsyncTask",
      "Թեմա 18: Services և Broadcast Receivers",
      "Թեմա 19: Notifications և Push Messages",
      "Թեմա 20: Location Services և Maps",
      "Թեմա 21: Camera և Media",
      "Թեմա 22: Permissions և Security",
      "Թեմա 23: Testing և Debugging",
      "Թեմա 24: Publishing և Google Play Store",
    ],
  },
  conditions: {
    title: "Դասընթացի հատուկ առավելությունները",
    list: [
      {
        title: "Գործնական նախագծեր",
        description: "Ստեղծում ենք իրական Android հավելվածներ՝ սկսած պարզ գործիքներից մինչև բարդ ծրագրեր:",
      },
      {
        title: "Ինդուստրիայի ստանդարտներ",
        description: "Սովորում ենք Google-ի լավագույն պրակտիկաները և Material Design սկզբունքները:",
      },
      {
        title: "Կարիերային աջակցություն",
        description: "Օգնություն CV կազմելու և տեխնիկական հարցազրույցների նախապատրաստության համար:",
      },
    ],
  },
  cta: {
    title: "Android ծրագրավորում: Գրանցման հայտ",
    subtitle: "Սկսիր քո կարիերան մոբայլ մշակման ոլորտում",
  },
};
