import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    fullname: "Имя Фамилия",
    email: "Эл. адрес",
    phone: "Номер телефона",
    course: {
      label: "Курс",
      list: [
        { label: "Веб-разработка" },
        { label: "Графический дизайн" },
        { label: "Программирование для детей" },
        { label: "SMM и Digital Marketing" },
        { label: "Программирование Python" },
        { label: "Android разработка" },
        { label: "UI/UX дизайн" },
        { label: "HR" },
        { label: "Soft Skills" },
      ],
    },
    button: {
      label: "Подать заявку",
    },
  },
  feedbackForm: {
    name: "Имя",
    surname: "Фамилия",
    email: "Эл. адрес",
    message: "Сообщение",
    button: {
      label: "Отправить",
    },
  },
};
