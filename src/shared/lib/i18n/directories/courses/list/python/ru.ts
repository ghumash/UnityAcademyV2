import type { CourseDict } from "../../types";

export const python: CourseDict = {
  courseHeroSection: {
    title: "Python программирование",
    description:
      "Изучи программирование на Python с нуля. Создавай веб-приложения, анализируй данные, изучай искусственный интеллект и инструменты автоматизации.",
    level: "beginner",
    format: "offline",
    duration: "5 месяцев",
    lessonsCount: "40 Уроков",
    projectsCount: "10 Проектов",
    certificateIncluded: true,
    price: "100000 ֏",
    originalPrice: "125000 ֏",
    sale: "20% Скидка",
    registerCourseButtonText: "Записаться на курс",
    registerFreeLessonButtonText: "Записаться на бесплатный урок",
    certificate: "Сертификат",
    theme: "lime",
    formatLabel: "Формат",
  },
  instructor: {
    name: "Давид Аветисян",
    role: "Senior Python Developer & Data Scientist",
    bio: "Опытный Python разработчик с 7+ летним опытом в веб-разработке, науке о данных и машинном обучении. Специализируюсь на Django, Flask, pandas и scikit-learn.",
    experience: {
      senior: {
        title: "Senior Python Developer",
        company: "DataTech Armenia",
        period: "2020 - настоящее время",
        summary:
          "Разработка веб-приложений на Python, системы анализа данных, интеграция ML моделей, руководство командой.",
      },
      mid: {
        title: "Python Developer",
        company: "TechSolutions Yerevan",
        period: "2018 - 2020",
        summary:
          "Проекты на Django и Flask, разработка REST API, дизайн баз данных, скрипты автоматизации.",
      },
      junior: {
        title: "Junior Python Developer",
        company: "CodeAcademy Armenia",
        period: "2017 - 2018",
        summary:
          "Основы Python, веб-скрепинг, обработка данных, базовые веб-приложения.",
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
      "Тема 1: Введение в Python, установка и настройка",
      "Тема 2: Переменные, типы данных, операторы",
      "Тема 3: Условия, циклы, функции",
      "Тема 4: Структуры данных: списки, словари",
      "Тема 5: Объектно-ориентированное программирование",
      "Тема 6: Работа с файлами, исключения",
      "Тема 7: Модули и пакеты",
      "Тема 8: Стандартная библиотека и pip",
      "Тема 9: Веб-скрепинг с BeautifulSoup",
      "Тема 10: Обработка данных с pandas",
      "Тема 11: Визуализация данных с matplotlib",
      "Тема 12: NumPy и научные вычисления",
      "Тема 13: Работа с базами данных SQLite",
      "Тема 14: Введение в веб-фреймворк Flask",
      "Тема 15: Создание веб-приложений с Flask",
      "Тема 16: Основы фреймворка Django",
      "Тема 17: Django модели и база данных",
      "Тема 18: Django шаблоны и представления",
      "Тема 19: Разработка REST API с Django REST Framework",
      "Тема 20: Скрипты автоматизации",
      "Тема 21: Введение в машинное обучение",
      "Тема 22: scikit-learn и ML модели",
      "Тема 23: Деплой и продакшн",
      "Тема 24: Создание и презентация портфолио",
    ],
  },
  conditions: {
    badge: "Условия курса",
    duration: {
      title: "Длительность",
      description: "4 месяца, 2 занятия в неделю",
    },
    level: {
      title: "Начинающий",
      description: "Предварительный опыт не требуется",
    },
    community: {
      title: "Стать частью",
      description: "Сообщества Python разработчиков",
    },
  },
  cta: {
    title: "Python программирование: Заявка на регистрацию",
    subtitle: "Начни свою карьеру с Python",
  },
};
