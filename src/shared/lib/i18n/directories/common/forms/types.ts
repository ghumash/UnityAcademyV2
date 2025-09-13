export type FormsDict = {
  applyForm: {
    buttonLabel: string;
    successText: string;
    errorText: string;
    fullname: string;
    email: string;
    phone: string;
    course: {
      label: string;
      list: {
        web_development: string;
        graphic_design: string;
        scratch: string;
        smm: string;
        python: string;
        android: string;
        ui_ux: string;
        hr: string;
        soft_skills: string;
      };
    };
  };
  feedbackForm: {
    name: string;
    surname: string;
    email: string;
    message: string;
    button: {
      label: string;
    };
  };
};
