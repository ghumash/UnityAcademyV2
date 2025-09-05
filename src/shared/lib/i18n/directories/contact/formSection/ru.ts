import type { FormSectionDict } from "../types";

export const formSection: FormSectionDict = {
  title: "Напишите нам",
  description: "Есть вопросы? Мы ответим в течение 24 часов.",
  fields: {
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    message: "Сообщение",
  },
  button: "Отправить",
  success: "Спасибо! Мы свяжемся с вами в ближайшее время.",
  error: "Ошибка. Пожалуйста, попробуйте еще раз.",
};
