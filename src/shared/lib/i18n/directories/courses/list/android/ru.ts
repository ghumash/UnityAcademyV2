import type { CourseDict } from "../../types";

export const android: CourseDict = {
  courseHeroSection: {
    title: "Android программирование: Java & Kotlin",
    description:
      "Изучи разработку Android приложений на Java и Kotlin. Создавай мобильные приложения, работай с Google Play Store и развивай навыки мобильной разработки.",
    level: "Начальный",
    format: "Офлайн",
    duration: "6 Месяцев",
    lessonsCount: "48 Уроков",
    projectsCount: "12 Проектов",
    certificateIncluded: true,
    price: "40 000 ֏",
    originalPrice: "50 000 ֏",
    sale: "20% Скидка",
    registerCourseButtonText: "Записаться на курс",
    registerFreeLessonButtonText: "Записаться на бесплатный урок",
    certificate: "Сертификат",
    theme: "emerald",
    formatLabel: "Формат",
  },
  projects: {
    display: false,
    subtitle: "СОЗДАЙ СВОЙ УНИКАЛЬНЫЙ СТИЛЬ",
    titlePart1: "Работы",
    titlePart2: "Преподавателя",
    buttonLabel: "Посмотреть все проекты",
    list: [
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
    name: "Артак Григорян",
    role: "Senior Android Developer & Mobile Architect",
    bio: "Опытный Android разработчик с 8+ летним опытом в разработке мобильных приложений. Специализируюсь на Java, Kotlin, Android SDK и современной мобильной архитектуре.",
    experience: {
      senior: {
        title: "Senior Android Developer",
        company: "MobileTech Armenia",
        period: "2020 - настоящее время",
        summary:
          "Архитектура и разработка Android приложений, руководство командой, код-ревью, публикация 30+ приложений.",
      },
      mid: {
        title: "Android Developer",
        company: "AppStudio Yerevan",
        period: "2018 - 2020",
        summary:
          "Нативные Android приложения, реализация Material Design, интеграция REST API, работа с Google Services.",
      },
      junior: {
        title: "Junior Mobile Developer",
        company: "DevHub Armenia",
        period: "2016 - 2018",
        summary:
          "Основы Android, программирование на Java, реализация UI/UX, разработка базовых приложений.",
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
      "Тема 1: Введение в Android разработку, Android Studio",
      "Тема 2: Основы Java для Android",
      "Тема 3: Введение в язык Kotlin",
      "Тема 4: Android SDK и API уровни",
      "Тема 5: Activities и Lifecycle",
      "Тема 6: Fragments и Navigation",
      "Тема 7: Layouts и Views",
      "Тема 8: Material Design и UI/UX",
      "Тема 9: RecyclerView и Adapters",
      "Тема 10: Intents и передача данных",
      "Тема 11: SharedPreferences и хранение данных",
      "Тема 12: База данных SQLite",
      "Тема 13: Room Database",
      "Тема 14: Сетевые запросы и HTTP",
      "Тема 15: JSON парсинг и Retrofit",
      "Тема 16: Изображения и Picasso/Glide",
      "Тема 17: Фоновые задачи и AsyncTask",
      "Тема 18: Services и Broadcast Receivers",
      "Тема 19: Уведомления и Push сообщения",
      "Тема 20: Location Services и карты",
      "Тема 21: Камера и медиа",
      "Тема 22: Разрешения и безопасность",
      "Тема 23: Тестирование и отладка",
      "Тема 24: Публикация и Google Play Store",
    ],
  },
  conditions: {
    title: "Особые преимущества курса",
    list: [
      {
        title: "Практические проекты",
        description: "Создаем реальные Android-приложения от простых инструментов до сложных программ.",
      },
      {
        title: "Стандарты индустрии",
        description: "Изучаем лучшие практики Google и принципы Material Design.",
      },
      {
        title: "Карьерная поддержка",
        description: "Помощь в составлении резюме и подготовке к техническим собеседованиям.",
      },
    ],
  },
  cta: {
    title: "Android программирование: Заявка на регистрацию",
    subtitle: "Начни свою карьеру в мобильной разработке",
  },
};
