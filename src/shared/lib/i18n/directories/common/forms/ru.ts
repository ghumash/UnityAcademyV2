import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    buttonLabel: "Подать заявку",
    successText: "Спасибо! Ваша заявка отправлена.",
    errorText: "Произошла ошибка. Попробуйте еще раз.",
    fullname: "Имя Фамилия",
    email: "Эл. адрес",
    phone: "Номер телефона",
    telegram: "Telegram @username",
    course: {
      label: "Курс",
      list: {
        web_development: "Веб-разработка",
        graphic_design: "Графический дизайн",
        scratch: "Программирование для детей",
        smm: "SMM и Digital Marketing",
        python: "Программирование Python",
        android: "Android разработка",
        ui_ux: "UI/UX дизайн",
        hr: "HR",
        soft_skills: "Soft Skills",
      },
    },
  },
  feedbackForm: {
    buttonLabel: "Отправить",
    successText: "Спасибо! Ваше сообщение отправлено.",
    errorText: "Произошла ошибка. Попробуйте еще раз.",
    name: "Имя",
    surname: "Фамилия",
    email: "Эл. адрес",
    message: "Сообщение",
  },
  validation: {
    name: {
      required: "Введите ваше имя",
      minLength: "Имя должно содержать минимум 2 символа",
    },
    surname: {
      required: "Введите вашу фамилию", 
      minLength: "Фамилия должна содержать минимум 2 символа",
    },
    fullname: {
      required: "Введите имя и фамилию",
      minLength: "Имя и фамилия должны содержать минимум 2 символа",
    },
    email: {
      required: "Введите email адрес",
      invalid: "Неверный email",
    },
    phone: {
      required: "Введите номер телефона",
      minLength: "Номер телефона должен содержать минимум 5 символов",
    },
    telegram: {
      required: "Введите Telegram username",
      invalid: "Telegram username должен начинаться с @ и содержать 5-32 символа",
    },
    message: {
      required: "Напишите сообщение",
      minLength: "Напишите сообщение (мин. 5 символов)",
    },
    course: {
      required: "Выберите курс",
      invalid: "Неверный курс",
    },
  },
};
