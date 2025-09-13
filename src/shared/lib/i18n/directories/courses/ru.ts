import { coursesSection } from "./general/coursesSection/ru";
import { graphic_design } from "./list/graphic_design/ru";
import type { CoursesDict } from "./types";

export const courses: CoursesDict = {
  general: {
    coursesSection,
  },
  list: {
    graphic_design,
  },
  single: {
    benefits: {
      title_part1: "Обучаясь в Unity Academy",
      title_part2: "вы получите следующие преимущества",
      hr_training: {
        title_part1: "Бесплатный",
        title_part2: "HR тренинг",
        description: "Тренинг даст выпускникам возможность ознакомиться с важными правилами создания резюме, понять, как правильно подготовиться и представить себя на собеседовании, и узнать ответы на все волнующие вопросы.",
      },
      english_course: {
        title_part1: "Курс английского языка",
        title_part2: "на особых условиях",
        description: "Лучшие студенты получат предложения о работе от нас и/или наших партнеров",
      },
      portfolio: {
        title: "Портфолио и резюме",
        description: "По окончании курса у вас будут профессиональные работы, и мы поможем создать грамотное резюме для быстрого входа на рынок труда",
      },
    },
    conditions: {
      badge: "Условия курса",
      community: {
        title: "Быть",
        description: "Частью сильного и вдохновляющего сообщества",
      },
    },
    instructor: {
      name: "Анна Петрова",
      role: "Senior Frontend Developer",
      bio: "Опытный фронтенд-разработчик с 5+ годами опыта в создании современных веб-приложений. Специализируюсь на React, TypeScript и оптимизации производительности.",
      experience: {
        senior: {
          title: "Senior Frontend Developer",
          company: "TechCorp Inc.",
          period: "2022 - настоящее время",
          summary: "Руководство командой из 4 разработчиков, архитектура и разработка крупномасштабных React приложений, внедрение лучших практик и code review.",
        },
        mid: {
          title: "Frontend Developer",
          company: "StartupXYZ",
          period: "2020 - 2022",
          summary: "Разработка пользовательских интерфейсов для SaaS платформы, оптимизация производительности, интеграция с REST API и GraphQL.",
        },
        junior: {
          title: "Junior Frontend Developer",
          company: "WebStudio",
          period: "2019 - 2020",
          summary: "Создание адаптивных веб-сайтов, изучение современных фреймворков, участие в командной разработке и code review процессах.",
        },
      },
    },
    topics: {
      title: "Темы курса",
    },
    faq_banner: {
      heading: "Ответы на ваши волнующие вопросы",
      button_text: "Перейти по ссылке",
    },
  },
};
