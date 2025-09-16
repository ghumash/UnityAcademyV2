import type { CoursesSectionDict } from "../../types";

export const coursesSection: CoursesSectionDict = {
  title: "Наши курсы",
  list: [
    {
      title: "Веб-программирование: HTML, CSS, JavaScript, React",
      description: "Изучи HTML, CSS, JavaScript и React для создания быстрых, надежных и адаптивных сайтов.",
      duration: "6 месяцев",
      level: "Новичкам",
      format: "Офлайн",
    },
    {
      title: "Графический дизайн: Photoshop, Illustrator, Canva",
      description: "Брендинг, композиция, типографика, цвет. Создание постеров, баннеров и бренд-гайдов.",
      duration: "3 месяца",
      level: "Новичкам",
      format: "Офлайн",
    },
    {
      title: "Детское программирование: Scratch, Python",
      description: "Детское программирование на Scratch и Python - игровые проекты, анимации, творчество.",
      duration: "4 месяца",
      level: "Новичкам",
      format: "Офлайн",
    },
    {
      title: "SMM и Digital Marketing",
      description: "Стратегия, контент, таргетинг и аналитика. Собери кейсы и запусти кампании с наставником.",
      duration: "3 месяца",
      level: "Новичкам",
      format: "Офлайн",
    },
    {
      title: "Python программирование: основы AI/ML",
      description: "Изучи Python, алгоритмы и базовые ML модели. Поймешь работу с данными и создашь мини-проекты.",
      duration: "6 месяцев",
      level: "Средний",
      format: "Офлайн",
    },
    {
      title: "Android программирование: Java, Kotlin",
      description: "С нуля до Java/Kotlin приложений. UI, данные, публикация и практические мини-проекты в Google Play.",
      duration: "6 месяцев",
      level: "Средний",
      format: "Офлайн",
    },
    {
      title: "UI/UX дизайн: Figma",
      description: "От исследований до прототипов. UX процессы, UI системы, Figma и портфолио с кейсами проектов.",
      duration: "3 месяца",
      level: "Средний",
      format: "Офлайн",
    },
    {
      title: "HR: Управление человеческими ресурсами",
      description: "Рекрутинг, собеседования, адаптация. Практические шаблоны, кейсы и HR аналитика.",
      duration: "3 месяца",
      level: "Средний",
      format: "Офлайн",
    },
    {
      title: "Soft Skills: Командная работа, Коммуникация",
      description: "Коммуникация, управление временем, команда и лидерство. Практика, обратная связь, рост, выступления.",
      duration: "2 месяца",
      level: "Средний",
      format: "Офлайн",
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
