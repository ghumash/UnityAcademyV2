import type { CourseKey } from "@/entities/course";

export type CourseOption = string;

export type CourseConfig = {
  label: string;
  list: Record<CourseKey, CourseOption>;
};

export type FormsDict = {
  applyForm: {
    buttonLabel: string;
    successText: string;
    errorText: string;
    fullname: string;
    email: string;
    phone: string;
    telegram: string;
    course: CourseConfig;
  };
  feedbackForm: {
    buttonLabel: string;
    successText: string;
    errorText: string;
    name: string;
    surname: string;
    email: string;
    message: string;
  };
  validation: {
    name: {
      required: string;
      minLength: string;
    };
    surname: {
      required: string;
      minLength: string;
    };
    fullname: {
      required: string;
      minLength: string;
    };
    email: {
      required: string;
      invalid: string;
    };
    phone: {
      required: string;
      minLength: string;
    };
    telegram: {
      required: string;
      invalid: string;
    };
    message: {
      required: string;
      minLength: string;
    };
    course: {
      required: string;
      invalid: string;
    };
  };
};
