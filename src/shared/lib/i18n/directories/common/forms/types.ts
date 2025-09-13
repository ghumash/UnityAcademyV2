export type FormsDict = {
  applyForm: {
    fullname: string;
    email: string;
    phone: string;
    course: {
      label: string;
      list: { label: string }[];
    };
    button: {
      label: string;
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
