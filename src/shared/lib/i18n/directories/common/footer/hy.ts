import { siteConfig } from "@/shared/config/common";
import type { FooterDict } from "./types";

export const footer: FooterDict = {
  resources: {
    title: "Ռեսուրսներ",
    home: "Գլխավոր",
    about: "Մեր մասին",
    courses: "Դասընթացներ",
    contacts: "Կապ",
    faq: "Հաճախ տրվող հարցեր",
  },
  social: {
    title: "Սոցիալական ցանցեր",
  },
  copyright: "Բոլոր իրավունքները պաշտպանված են:",
  description: `${siteConfig.name}-ն Վանաձորում գործող ժամանակակից կենտրոն է, որտեղ կարող ես սովորել պահանջված մասնագիտություններ նոր մեթոդներով և հնարավորություններով։`,
};
