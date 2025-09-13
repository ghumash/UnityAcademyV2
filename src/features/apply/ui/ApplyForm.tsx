"use client";

import { ApplySchema } from "@/features/apply";
import { SmartForm } from "@/widgets";

// Типы курсов на основе существующих значений
export type CourseValue =
  | "Վեբ ծրագրավորում"
  | "Գրաֆիկ դիզայն: Photoshop, Illustrator, Canva"
  | "Երեխաների ծրագրավորում"
  | "SMM և Digital Marketing"
  | "Python ծրագրավորում"
  | "Android ծրագրավորում"
  | "UI/UX դիզայն"
  | "HR"
  | "Soft Skills";

interface CourseOption {
  value: string;
  label: string;
}

interface CourseConfig {
  label: string;
  list: {
    web_development: CourseOption;
    graphic_design: CourseOption;
    scratch: CourseOption;
    smm: CourseOption;
    python: CourseOption;
    android: CourseOption;
    ui_ux: CourseOption;
    hr: CourseOption;
    soft_skills: CourseOption;
  };
}

interface ApplyFormConfig {
  applyForm: {
    fullname: string;
    email: string;
    phone: string;
    course: CourseConfig;
    buttonLabel: string;
    successText: string;
    errorText: string;
  };
}

interface ApplyFormProps {
  defaultCourse?: CourseValue;
  hideCourseSelect?: boolean;
  config: ApplyFormConfig;
}

export const ApplyForm = ({
  defaultCourse,
  hideCourseSelect = false,
  config,
}: ApplyFormProps) => {
  const {
    fullname,
    email,
    phone,
    course,
    successText,
    errorText,
    buttonLabel,
  } = config.applyForm;

  return (
    <SmartForm
      action="/api/forms/apply"
      schema={ApplySchema}
      buttonLabel={buttonLabel}
      successText={successText}
      errorText={errorText}
      fields={[
        {
          name: "fullname",
          placeholder: fullname,
          autoComplete: "given-name",
          type: "text",
        },
        {
          name: "email",
          placeholder: email,
          autoComplete: "email",
          type: "email",
        },
        {
          name: "phone",
          placeholder: phone,
          autoComplete: "tel",
          type: "text",
        },
        {
          name: "course",
          placeholder: course.label,
          type: hideCourseSelect ? "invisible" : "select",
          ...(!hideCourseSelect && {
            options: [
              {
                value: course.list.web_development.value,
                label: course.list.web_development.label,
              },
              {
                value: course.list.graphic_design.value,
                label: course.list.graphic_design.label,
              },
              {
                value: course.list.scratch.value,
                label: course.list.scratch.label,
              },
              {
                value: course.list.smm.value,
                label: course.list.smm.label,
              },
              {
                value: course.list.python.value,
                label: course.list.python.label,
              },
              {
                value: course.list.android.value,
                label: course.list.android.label,
              },
              {
                value: course.list.ui_ux.value,
                label: course.list.ui_ux.label,
              },
              {
                value: course.list.hr.value,
                label: course.list.hr.label,
              },
              {
                value: course.list.soft_skills.value,
                label: course.list.soft_skills.label,
              },
            ],
          }),
        },
      ]}
      defaults={{
        fullname: "",
        email: "",
        phone: "",
        course: defaultCourse || "",
      }}
      transform={(v) => ({
        fullname: v.fullname.trim(),
        email: v.email.trim(),
        phone: v.phone.trim(),
        course: v.course.trim(),
      })}
    />
  );
};
