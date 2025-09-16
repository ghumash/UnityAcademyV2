import type { ErrorsDict } from "./types";

export const errors: ErrorsDict = {
  error: {
    title: "Что-то пошло не так",
    description: "Попробуй обновить страницу или вернуться на главную страницу.",
    tryAgain: "Попробовать снова",
    goHome: "Главная",
    errorCode: "Код ошибки",
  },
  notFound: {
    title: "Страница не найдена",
    description: "Такая страница не существует. Проверь адрес или вернись на главную.",
    goHome: "Главная",
    courses: "Курсы",
  },
  courseNotFound: {
    description: "Курс не найден или еще не опубликован.",
    backToCourses: "Курсы",
  },
};
