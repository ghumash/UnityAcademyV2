import type { ErrorsDict } from "./types";

export const errors: ErrorsDict = {
  error: {
    title: "Что-то пошло не так",
    description: "Попробуй обновить страницу или вернись на главную.",
    tryAgain: "Попробовать снова",
    goHome: "На главную",
    errorCode: "Код ошибки",
  },
  notFound: {
    title: "Страница не найдена",
    description: "Такой страницы нет. Проверь адрес или вернись на главную.",
    goHome: "На главную",
    courses: "Курсы",
  },
  courseNotFound: {
    description: "Курс не найден или ещё не опубликован.",
    backToCourses: "← К курсам",
  },
};
