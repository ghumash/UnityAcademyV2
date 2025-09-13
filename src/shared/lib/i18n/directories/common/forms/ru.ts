import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    buttonLabel: "Подать заявку",
    successText: "Спасибо! Ваша заявка отправлена.",
    errorText: "Произошла ошибка. Попробуйте еще раз.",
    fullname: "Имя Фамилия",
    email: "Эл. адрес",
    phone: "Номер телефона",
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
};
