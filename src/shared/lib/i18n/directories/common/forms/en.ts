import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    buttonLabel: "Apply",
    successText: "Thank you! Your application has been sent.",
    errorText: "An error occurred. Please try again.",
    fullname: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    telegram: "Telegram @username",
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
    buttonLabel: "Send",
    successText: "Thank you! Your message has been sent.",
    errorText: "An error occurred. Please try again.",
    name: "Name",
    surname: "Surname",
    email: "Email Address",
    message: "Message",
  },
  validation: {
    fullnameRequired: "Please enter your full name",
    emailInvalid: "Invalid email address",
    phoneRequired: "Please enter your phone number",
    telegramRequired: "Please enter your Telegram username",
    telegramInvalid: "Telegram username must start with @ and be 5-32 characters long",
    courseRequired: "Please select a course",
    nameRequired: "Please enter your name",
    surnameRequired: "Please enter your surname",
    messageRequired: "Please enter your message",
  },
};
