import type { SeoDict } from "./types";
import { siteConfig } from "@/shared/config/common";

export const seo: SeoDict = {
  home: {
    title: "IT образование в Ванадзоре",
    description: `Изучайте программирование, дизайн и цифровой маркетинг в ${siteConfig.name} в Ванадзоре: Веб-разработка, Python, Android, UI/UX, SMM и другие курсы.`,
  },
  about: {
    title: "О нас",
    description: `${siteConfig.name} - это IT образовательный центр в Ванадзоре. Мы предоставляем качественное образование в области программирования, дизайна и цифрового маркетинга.`,
  },
  courses: {
    title: "Курсы",
    description:
      "Откройте для себя наши IT курсы в Ванадзоре: Веб-разработка, Python, Android, UI/UX дизайн, SMM, графический дизайн и soft skills.",
  },
  contacts: {
    title: "Контакт",
    description: `Свяжитесь с ${siteConfig.name} в Ванадзоре: Наш адрес, номер телефона и социальные сети.`,
  },
  apply: {
    title: "Регистрация",
    description: `Подайте заявку на IT курсы ${siteConfig.name} в Ванадзоре: Заполните заявление и начните свою IT карьеру с нами.`,
  },
  faq: {
    title: "Часто задаваемые вопросы",
    description: `Найдите ответы на самые часто задаваемые вопросы о ${siteConfig.name}: курсы, поступление, оплата и многое другое.`,
  },
  general: {
    description: `${siteConfig.name} - современный образовательный центр в Ванадзоре, где вы можете изучать востребованные профессии новыми методами и возможностями.`,
  },
} as const;
