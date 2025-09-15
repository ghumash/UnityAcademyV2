import type { CourseDict } from "../../types";

export const web_development: CourseDict = {
  courseHeroSection: {
    title: "Веб-разработка: HTML, CSS, JavaScript",
    description:
      "Изучи современную веб-разработку с нуля. Создавай адаптивные сайты, интерактивные веб-приложения и профессиональное портфолио. Идеально для начинающих и специалистов среднего уровня.",
    level: "Начинающий",
    format: "Офлайн",
    duration: "6 Месяцев",
    lessonsCount: "48 Уроков",
    projectsCount: "12 Проектов",
    certificateIncluded: true,
    price: "40000 ֏",
    originalPrice: "50000 ֏",
    sale: "20% Скидка",
    registerCourseButtonText: "Записаться на курс",
    registerFreeLessonButtonText: "Записаться на бесплатный урок",
    certificate: "Сертификат",
    theme: "blue",
    formatLabel: "Формат",
  },
  instructor: {
    name: "Вагаршак Гаспарян",
    role: "Senior Full-Stack Developer",
    bio: "Опытный программист с 9+ годами опыта работы, специализируется на полнофункциональной разработке, веб-программировании, программной инженерии и проектировании баз данных.",
    avatarUrl: "/users/vagharshak.jpg",
    socials: {
      github: "https://github.com/vagharshakgasparyan",
      linkedin: "https://www.linkedin.com/in/vagharshak-gasparyan-6401b2316/",
    },
    experience: {
      senior: {
        title: "Senior Full-Stack Developer",
        company: "TechCorp Armenia",
        period: "2020 - настоящее время",
        summary:
          "Архитектура и разработка веб-приложений, руководство командой, код-ревью, реализация 50+ проектов.",
      },
      mid: {
        title: "Frontend Developer",
        company: "WebStudio Pro",
        period: "2018 - 2020",
        summary:
          "Разработка адаптивных веб-сайтов, проекты на React и Vue.js, реализация UI/UX дизайна, прямая работа с клиентами.",
      },
      junior: {
        title: "Junior Web Developer",
        company: "StartupHub Yerevan",
        period: "2016 - 2018",
        summary:
          "Основы HTML/CSS/JavaScript, разработка WordPress тем, базовые веб-приложения, техническая документация.",
      },
    },
    experienceLabel: "Опыт работы",
    socialNetworksLabel: "Социальные сети",
    showDetails: "Показать детали",
    hideDetails: "Скрыть детали",
  },
  topics: {
    title: "Темы курса",
    list: [
      "Тема 1: Введение в веб-разработку, основы HTML",
      "Тема 2: HTML элементы, атрибуты, семантическая разметка",
      "Тема 3: Основы CSS, селекторы, свойства",
      "Тема 4: CSS Box Model, позиционирование, flexbox",
      "Тема 5: CSS Grid, адаптивный дизайн, media queries",
      "Тема 6: Основы JavaScript, переменные, типы данных",
      "Тема 7: JavaScript функции, условия, циклы",
      "Тема 8: DOM манипуляции, события",
      "Тема 9: JavaScript объекты, массивы, методы",
      "Тема 10: Асинхронное программирование, Promise, async/await",
      "Тема 11: Работа с API, fetch, AJAX",
      "Тема 12: Git и GitHub, контроль версий",
      "Тема 13: Архитектура веб-приложений",
      "Тема 14: Основы React.js, компоненты",
      "Тема 15: React Hooks, управление состоянием",
      "Тема 16: Введение в Node.js и Express.js",
      "Тема 17: Основы баз данных, MongoDB",
      "Тема 18: Разработка REST API",
      "Тема 19: Веб-безопасность, аутентификация",
      "Тема 20: Деплой и хостинг",
      "Тема 21: Оптимизация производительности",
      "Тема 22: Тестирование и отладка",
      "Тема 23: Современные инструменты разработки",
      "Тема 24: Создание и презентация портфолио",
    ],
  },
  conditions: {
    title: "Особые преимущества курса",
    list: [
      {
        title: "Современные технологии",
        description:
          "Работаем с HTML, CSS, JavaScript, ReactJS, Git и другими современными frontend технологиями",
      },
      {
        title: "Приложение Task Manager",
        description:
          "В качестве главного проекта курса вы создадите свое персональное приложение Task Manager с полным функционалом",
      },
      {
        title: "Практические проекты",
        description:
          "В течение курса вы создадите различные проекты, которые разместите на своей GitHub платформе для помощи в трудоустройстве",
      },
    ],
  },
  cta: {
    title: "Веб-разработка: Заявка на регистрацию",
    subtitle: "Начни свою карьеру в веб-разработке",
  },
};
