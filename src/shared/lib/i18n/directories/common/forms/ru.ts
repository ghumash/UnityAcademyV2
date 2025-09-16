import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    buttonLabel: "Зарегистрироваться",
    successText: "Спасибо! Сообщение отправлено.",
    errorText: "Что-то пошло не так. Пожалуйста, попробуйте еще раз.",
    fullname: "Имя Фамилия",
    birthday: "Дата рождения",
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
      required: "Полное имя обязательно",
      minLength: "Полное имя должно содержать минимум 2 символа",
      invalid: "Укажите полное имя (имя и фамилию)",
    },
    email: {
      required: "Введите email адрес",
      invalid: "Неверный email",
    },
    phone: {
      required: "Введите номер телефона",
      minLength: "Номер телефона должен содержать минимум 5 символов",
      invalid: "Номер телефона должен начинаться с +374 и содержать 12 цифр",
    },
    telegram: {
      required: "Введите Telegram username",
      invalid: "Telegram username должен начинаться с @ и быть 5-32 символа",
    },
    birthday: {
      required: "Выберите дату рождения",
      invalid: "Неверная дата",
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
