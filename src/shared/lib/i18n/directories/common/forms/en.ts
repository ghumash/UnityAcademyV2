import type { FormsDict } from "./types";

export const forms: FormsDict = {
  applyForm: {
    fullname: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    course: {
      label: "Course",
      list: [
        { label: "Web Development" },
        { label: "Graphic Design" },
        { label: "Kids Programming" },
        { label: "SMM & Digital Marketing" },
        { label: "Python Programming" },
        { label: "Android Development" },
        { label: "UI/UX Design" },
        { label: "HR" },
        { label: "Soft Skills" },
      ],
    },
    button: {
      label: "Apply",
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
