import type { CourseKey, EventKey } from "@/shared/lib/const";

export type CourseConfig = {
  label: string;
  list: Record<CourseKey, string>;
};

export type EventConfig = {
  list: Record<EventKey, string>;
};

export type FormsDict = {
  applyForm: {
    buttonLabel: string;
    successText: string;
    errorText: string;
    fullname: string;
    birthday: string;
    phone: string;
    telegram: string;
    course: CourseConfig;
  };
  eventRegisterForm: {
    buttonLabel: string;
    successText: string;
    errorText: string;
    fullname: string;
    birthday: string;
    phone: string;
    event: EventConfig;
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
      invalid: string;
    };
    email: {
      required: string;
      invalid: string;
    };
    phone: {
      required: string;
      minLength: string;
      invalid: string;
    };
    telegram: {
      required: string;
      invalid: string;
    };
    message: {
      required: string;
      minLength: string;
    };
    birthday: {
      required: string;
      invalid: string;
    };
    course: {
      required: string;
      invalid: string;
    };
    event: {
      required: string;
      invalid: string;
    };
  };
};
