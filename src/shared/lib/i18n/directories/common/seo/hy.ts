import type { SeoDict } from "./types";
import { siteConfig } from "@/shared/config/common";

export const seo: SeoDict = {
  home: {
    title: "ՏՏ կրթություն Վանաձորում",
    description: `Սովորեք ծրագրավորում, դիզայն և թվային մարքեթինգ ${siteConfig.name}-ում Վանաձորում: Վեբ մշակում, Python, Android, UI/UX, SMM և այլ դասընթացներ:`,
  },
  about: {
    title: "Մեր մասին",
    description: `${siteConfig.name}-ը ՏՏ կրթական կենտրոն է Վանաձորում: Մենք տրամադրում ենք որակյալ կրթություն ծրագրավորման, դիզայնի և թվային մարքեթինգի ոլորտում:`,
  },
  courses: {
    title: "Դասընթացներ",
    description:
      "Բացահայտեք մեր IT դասընթացները Վանաձորում. Վեբ մշակում, Python, Android, UI/UX դիզայն, SMM, գրաֆիկական դիզայն և փափուկ հմտություններ:",
  },
  events: {
    title: "Իվենթներ",
    description: `Գիտացեք ${siteConfig.name}-ի ամենալավ իվենթների մասին Վանաձորում. բութկամպեր, վորքշոփեր, հանդիպումներ և կարիերային օր:`,
  },
  contacts: {
    title: "Կապ",
    description: `Կապվեք ${siteConfig.name}-ի հետ Վանաձորում. մեր հասցեն, հեռախոսահամարը և սոցիալական ցանցերը:`,
  },
  apply: {
    title: "Դիմել",
    description: `Դիմեք ${siteConfig.name}-ի IT դասընթացներին Վանաձորում. լրացրեք դիմումը և սկսեք ձեր IT կարիերան մեզ հետ:`,
  },
  faq: {
    title: "Հաճախ տրվող հարցեր",
    description: `Գտեք պատասխաններ ${siteConfig.name}-ի մասին ամենահաճախ տրվող հարցերին. դասընթացներ, գրանցում, վճարում և այլն:`,
  },
  general: {
    description: `${siteConfig.name}-ն Վանաձորում գործող ժամանակակից կենտրոն է, որտեղ կարող ես սովորել պահանջված մասնագիտություններ նոր մեթոդներով և հնարավորություններով։`,
  },
} as const;
