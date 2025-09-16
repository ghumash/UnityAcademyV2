import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    buttonLabel: "Գրանցվել",
    successText: "Շնորհակալություն! Հաղորդագրությունը ուղարկվել է.",
    errorText: "Ինչ-որ բան սխալ գնաց. Խնդրում ենք փորձել կրկին.",
    fullname: "Անուն Ազգանուն",
    birthday: "Ծննդյան ամսաթիվ",
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
    name: {
      required: "Մուտքագրեք ձեր անունը",
      minLength: "Անունը պետք է լինի նվազագույնը 2 նիշ",
    },
    surname: {
      required: "Մուտքագրեք ձեր ազգանունը", 
      minLength: "Ազգանունը պետք է լինի նվազագույնը 2 նիշ",
    },
    fullname: {
      required: "Մուտքագրեք անուն ազգանունը",
      minLength: "Անուն ազգանունը պետք է լինի նվազագույնը 2 նիշ",
    },
    email: {
      required: "Մուտքագրեք email հասցեն",
      invalid: "Սխալ email",
    },
    phone: {
      required: "Մուտքագրեք հեռախոսահամարը",
      minLength: "Հեռախոսահամարը պետք է լինի նվազագույնը 5 նիշ",
      invalid: "Հեռախոսահամարը պետք է սկսվի +374-ով և լինի 12 նիշ",
    },
    telegram: {
      required: "Մուտքագրեք Telegram username",
      invalid: "Telegram username-ը պետք է սկսվի @ նշանով և լինի 5-32 նիշ",
    },
    birthday: {
      required: "Ընտրեք ծննդյան ամսաթիվը",
      invalid: "Սխալ ամսաթիվ",
    },
    message: {
      required: "Գրեք հաղորդագրություն",
      minLength: "Գրեք հաղորդագրություն (նվազ. 5 նշան)",
    },
    course: {
      required: "Ընտրեք դասընթաց",
      invalid: "Սխալ դասընթաց",
    },
  },
};
