import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    buttonLabel: "Apply",
    successText: "Thank you! Your application has been sent.",
    errorText: "An error occurred. Please try again.",
    fullname: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    course: {
      label: "Course",
      list: {
        web_development: "Web Development",
        graphic_design: "Graphic Design",
        scratch: "Kids Programming",
        smm: "SMM & Digital Marketing",
        python: "Python Programming",
        android: "Android Development",
        ui_ux: "UI/UX Design",
        hr: "HR",
        soft_skills: "Soft Skills",
      },
    },
  },
  feedbackForm: {
    name: "Name",
    surname: "Surname",
    email: "Email Address",
    message: "Message",
    button: {
      label: "Send",
    },
  },
};
