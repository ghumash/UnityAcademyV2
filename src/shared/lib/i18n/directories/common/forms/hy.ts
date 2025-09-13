import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    fullname: "Անուն Ազգանուն",
    email: "Էլ. հասցե",
    phone: "Հեռախոսահամար",
    course: {
      label: "Դասընթաց",
      list: [
        { label: "Վեբ ծրագրավորում" },
        { label: "Գրաֆիկ դիզայն" },
        { label: "Երեխաների ծրագրավորում" },
        { label: "SMM և Digital Marketing" },
        { label: "Python ծրագրավորում" },
        { label: "Android ծրագրավորում" },
        { label: "UI/UX դիզայն" },
        { label: "HR" },
        { label: "Soft Skills" },
      ],
    },
    button: {
      label: "Գրանցվել",
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
