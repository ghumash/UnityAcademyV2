import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    buttonLabel: "Register",
    successText: "Thank you! The message has been sent.",
    errorText: "Something went wrong. Please try again.",
    fullname: "Full Name",
    birthday: "Date of Birth",
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
    name: {
      required: "Enter your name",
      minLength: "Name must be at least 2 characters",
    },
    surname: {
      required: "Enter your surname", 
      minLength: "Surname must be at least 2 characters",
    },
    fullname: {
      required: "Full name is required",
      minLength: "Full name must be at least 2 characters",
      invalid: "Please enter your full name (first and last name)",
    },
    email: {
      required: "Enter email address",
      invalid: "Invalid email",
    },
    phone: {
      required: "Enter phone number",
      minLength: "Phone number must be at least 5 characters",
      invalid: "Phone number must start with +374 and be 12 digits",
    },
    telegram: {
      required: "Enter Telegram username",
      invalid: "Telegram username must start with @ and be 5-32 characters",
    },
    birthday: {
      required: "Select date of birth",
      invalid: "Invalid date",
    },
    message: {
      required: "Write a message",
      minLength: "Write a message (min. 5 characters)",
    },
    course: {
      required: "Select a course",
      invalid: "Invalid course",
    },
  },
};
