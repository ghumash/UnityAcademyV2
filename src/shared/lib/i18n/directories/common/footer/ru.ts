import { siteConfig } from "@/shared/config/common";
import type { FooterDict } from "./types";

export const footer: FooterDict = {
  resources: {
    title: "Ресурсы",
    home: "Главная",
    about: "О нас",
    courses: "Курсы",
    events: "События",
    contacts: "Контакты",
    faq: "Часто задаваемые вопросы",
  },
  social: {
    title: "Социальные сети",
  },
  copyright: "Все права защищены.",
  description: `${siteConfig.name} — современный центр, действующий в Ванадзоре, где ты можешь изучать востребованные профессии новыми методами и возможностями.`,
};
