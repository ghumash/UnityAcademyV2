import type { CourseDict } from "../../types";

export const scratch: CourseDict = {
  courseHeroSection: {
    title: "Scratch: Основы программирования для детей",
    description:
      "Изучи основы программирования через Scratch. Создавай собственные игры, анимации и интерактивные истории. Идеально подходит для начинающих и детей.",
    level: "Начинающий",
    format: "Офлайн",
    duration: "2 Месяца",
    lessonsCount: "16 Уроков",
    weeklyLessonCount: "2 Урока в неделю",
    projectsCount: "6 Проектов",
    certificateIncluded: true,
    price: "20 000 ֏",
    originalPrice: "50 000 ֏",
    sale: "60% Скидка",
    registerCourseButtonText: "Записаться на курс",
    registerFreeLessonButtonText: "",
    certificate: "Сертификат",
    theme: "orange",
    formatLabel: "Формат",
    discountTimer: {
      title: "Скидка действует",
      subtitle: "Успей записаться!",
    },
  },
    projects: {
    display: false,
    subtitle: "СОЗДАЙ СВОЙ УНИКАЛЬНЫЙ СТИЛЬ",
    titlePart1: "Работы",
    titlePart2: "Преподавателя",    list: [
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
    name: "Ани Тамарян",
    role: "Scratch Instructor & Game Developer",
    bio: "Я преподаватель программирования с опытом обучения более 100+ детей. Специализируюсь на программировании в Scratch, обучении алгоритмам и цифровым навыкам, а также занимаюсь разработкой образовательных программ. Моя цель — сделать технологии доступными, интересными и мотивирующими, способствуя развитию логического мышления и творчества у детей.",
    avatarUrl: "/images/users/ani.png",
    socials: {
      // instagram: "https://instagram.com/mariam_scratch_teacher",
      // linkedin: "https://linkedin.com/in/mariam-avagyan",
    },
    experience: {
      senior: {
        title: "Преподаватель программирования",
        company: "Armath Engineering Laboratories",
        period: "2024 - настоящее время",
        summary:
          "Преподаю детям программирование в Scratch, основы алгоритмов и цифровые навыки. Обучила более 200+ детей, разработала образовательные программы и организовала эффективное общение как с детьми, так и с родителями.",
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
      "Тема 1: Знакомство со Scratch, интерфейс",
      "Тема 2: Спрайты и сцена, основные инструменты",
      "Тема 3: Движение и координаты",
      "Тема 4: Внешность и звук, костюмы",
      "Тема 5: События и управление",
      "Тема 6: Условия и ветвление",
      "Тема 7: Циклы и повторения",
      "Тема 8: Переменные и списки",
      "Тема 9: Функции и блоки",
      "Тема 10: Создание игр - первый проект",
      "Тема 11: Анимация и истории",
      "Тема 12: Интерактивные проекты",
      "Тема 13: Алгоритмическое мышление",
      "Тема 14: Создание сложных проектов",
      "Тема 15: Презентация проектов и способы делиться",
      "Тема 16: Подведение итогов и дальнейшие шаги",
    ],
  },
  conditions: {
    title: "Особые преимущества курса",
    list: [
      {
        title: "Креативный подход",
        description: "Дети создают свои анимации, игры и интерактивные истории.",
      },
      {
        title: "Логическое мышление",
        description: "Изучают алгоритмическое мышление, последовательность и навыки решения задач.",
      },
      {
        title: "Дружеская атмосфера",
        description: "Работают в дружеской обстановке и учатся сотрудничать над проектами.",
      },
    ],
  },
  cta: {
    title: "Scratch: Заявка на регистрацию",
    subtitle: "Начни своё программистское приключение",
  },
};
