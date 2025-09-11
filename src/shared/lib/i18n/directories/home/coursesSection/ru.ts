import type { CoursesSectionDict } from "../types";

export const coursesSection: CoursesSectionDict = {
  title: "Наши курсы",
  list: [
    {
      title: "Веб-разработка: HTML, CSS, JavaScript, React",
      description: "С нуля до первых проектов: верстка, компоненты, роутинг, работа с API и деплой. Практика на реальных задачах.",
      duration: "3 месяца",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Искусственный интеллект: основы и практики",
      description: "Основы ML/AI, промпт-инжиниринг, работа с готовыми моделями и интеграции в проекты.",
      duration: "2 месяца",
      level: "intermediate",
      format: "hybrid",
    },
    {
      title: "Графический дизайн",
      description: "Композиция, типографика, цвет, работа в Figma/Photoshop. Создание постеров, баннеров и бренд-гайдов.",
      duration: "2 месяца",
      level: "beginner",
      format: "offline",
    },
    {
      title: "Android разработка",
      description: "Архитектура приложений, UI/UX для мобильных, публикация и поддержка. Практика с реальными кейсами.",
      duration: "3 месяца",
      level: "intermediate",
      format: "online",
    },
    {
      title: "SMM и создание контента",
      description: "Стратегия, контент-план, сторителлинг, метрики и рост. Практика для Instagram, TikTok и YouTube.",
      duration: "1.5 месяца",
      level: "beginner",
      format: "hybrid",
    },
    {
      title: "Soft Skills и карьера",
      description: "Коммуникация, тайм-менеджмент, работа в команде, собеседования и портфолио.",
      duration: "1 месяц",
      level: "beginner",
      format: "offline",
    },
  ],
  levels: {
    beginner: "Новичкам",
    intermediate: "Средний",
    advanced: "Продвинутый",
  },
  formats: {
    online: "Онлайн",
    offline: "Офлайн",
    hybrid: "Гибрид",
  },
};
