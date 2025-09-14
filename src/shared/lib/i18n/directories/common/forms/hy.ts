import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    buttonLabel: "Գրանցվել",
    successText: "Շնորհակալություն! Հաղորդագրությունը ուղարկվել է.",
    errorText: "Ինչ-որ բան սխալ գնաց. Խնդրում ենք փորձել կրկին.",
    fullname: "Անուն Ազգանուն",
    email: "Էլ. հասցե",
    phone: "Հեռախոսահամար",
    telegram: "Telegram @username",
    course: {
      label: "Դասընթաց",
      list: {
        web_development: "Վեբ ծրագրավորում",
        graphic_design: "Գրաֆիկ դիզայն",
        scratch: "Ծրագրավորում երեխաների համար",
        smm: "SMM և Digital Marketing",
        python: "Python ծրագրավորում",
        android: "Android ծրագրավորում",
        ui_ux: "UI/UX դիզայն",
        hr: "HR",
        soft_skills: "Soft Skills",
      },
    },
  },
  feedbackForm: {
    buttonLabel: "Ուղարկել",
    successText: "Շնորհակալություն! Հաղորդագրությունը ուղարկվել է:",
    errorText: "Ինչ-որ բան սխալ գնաց: Խնդրում ենք փորձել կրկին:",
    name: "Անուն",
    surname: "Ազգանուն",
    email: "Էլ. հասցե",
    message: "Հաղորդագրություն",
  },
  validation: {
    fullnameRequired: "Մուտքագրեք անուն ազգանունը",
    emailInvalid: "Սխալ email",
    phoneRequired: "Մուտքագրեք հեռախոսահամարը",
    telegramRequired: "Մուտքագրեք Telegram username",
    telegramInvalid: "Telegram username-ը պետք է սկսվի @ նշանով և լինի 5-32 նիշ",
    courseRequired: "Սխալ դասընթաց",
    nameRequired: "Մուտքագրեք անունը",
    surnameRequired: "Մուտքագրեք ազգանունը",
    messageRequired: "Մուտքագրեք հաղորդագրությունը",
  },
};
