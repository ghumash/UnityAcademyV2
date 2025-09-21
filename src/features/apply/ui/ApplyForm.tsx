"use client";

import { createApplySchema } from "../model/schema";
import type { CourseValue } from "../model/schema";
import { SmartForm } from "@/shared/ui/custom";
import type { FormsDict } from "@/shared/lib/i18n";
import { COURSE_DATA, COURSE_KEYS } from "@/entities/course";

interface ApplyFormProps {
  defaultCourse?: CourseValue;
  hideCourseSelect?: boolean;
  config: FormsDict;
}

export const ApplyForm = ({
  defaultCourse,
  hideCourseSelect = false,
  config,
}: ApplyFormProps) => {
  const { applyForm, validation } = config;
  const schema = createApplySchema(validation);

  return (
    <SmartForm
      action="/api/forms/apply"
      schema={schema}
      buttonLabel={applyForm.buttonLabel}
      successText={applyForm.successText}
      errorText={applyForm.errorText}
      fields={[
        {
          name: "fullname",
          placeholder: applyForm.fullname,
          autoComplete: "given-name",
          type: "text",
        },
        {
          name: "birthday",
          placeholder: applyForm.birthday,
          autoComplete: "bday",
          type: "date",
        },
        {
          name: "phone",
          placeholder: applyForm.phone,
          autoComplete: "tel",
          type: "text",
        },
        {
          name: "telegram",
          placeholder: applyForm.telegram,
          autoComplete: "username",
          type: "text",
        },
        {
          name: "course",
          placeholder: applyForm.course.label,
          type: hideCourseSelect ? "invisible" : "select",
          ...(!hideCourseSelect && {
            options: COURSE_KEYS.map((key) => ({
              value: COURSE_DATA[key].value,
              label: applyForm.course.list[key],
            })),
          }),
        },
      ]}
      defaults={{
        fullname: "",
        birthday: "",
        phone: "",
        telegram: "",
        course: defaultCourse || "",
      }}
      transform={(v: any) => ({
        fullname: v.fullname.trim(),
        birthday: v.birthday.trim(),
        phone: v.phone.trim(),
        telegram: v.telegram.trim(),
        course: v.course.trim(),
      })}
    />
  );
};
