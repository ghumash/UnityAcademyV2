import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    buttonLabel: "Գրանցվել",
    successText: "Շնորհակալություն! Հաղորդագրությունը ուղարկվել է.",
    errorText: "Ինչ-որ բան սխալ գնաց. Խնդրում ենք փորձել կրկին.",
    fullname: "Անուն Ազգանուն",
    email: "Էլ. հասցե",
    phone: "Հեռախոսահամար",
    course: {
      label: "Դասընթաց",
      list: {
        web_development: "Վեբ ծրագրավորում",
        graphic_design: "Գրաֆիկ դիզայն",
        scratch: "Երեխաների ծրագրավորում",
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
    name: "Անուն",
    surname: "Ազգանուն",
    email: "Էլ. հասցե",
    message: "Հաղորդագրություն",
    button: {
      label: "Ուղարկել",
    },
  },
};
