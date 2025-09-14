import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import { COURSE_DATA } from "@/entities/course";

export async function getFormConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    applyForm: {
      buttonLabel: t("common.forms.applyForm.buttonLabel"),
      successText: t("common.forms.applyForm.successText"),
      errorText: t("common.forms.applyForm.errorText"),
      fullname: t("common.forms.applyForm.fullname"),
      email: t("common.forms.applyForm.email"),
      phone: t("common.forms.applyForm.phone"),
      telegram: t("common.forms.applyForm.telegram"),
      course: {
        label: t("common.forms.applyForm.course.label"),
        list: {
          web_development: {
            value: COURSE_DATA.web_development.value,
            label: t("common.forms.applyForm.course.list.web_development"),
          },
          graphic_design: {
            value: COURSE_DATA.graphic_design.value,
            label: t("common.forms.applyForm.course.list.graphic_design"),
          },
          scratch: {
            value: COURSE_DATA.scratch.value,
            label: t("common.forms.applyForm.course.list.scratch"),
          },
          smm: {
            value: COURSE_DATA.smm.value,
            label: t("common.forms.applyForm.course.list.smm"),
          },
          python: {
            value: COURSE_DATA.python.value,
            label: t("common.forms.applyForm.course.list.python"),
          },
          android: {
            value: COURSE_DATA.android.value,
            label: t("common.forms.applyForm.course.list.android"),
          },
          ui_ux: {
            value: COURSE_DATA.ui_ux.value,
            label: t("common.forms.applyForm.course.list.ui_ux"),
          },
          hr: {
            value: COURSE_DATA.hr.value,
            label: t("common.forms.applyForm.course.list.hr"),
          },
          soft_skills: {
            value: COURSE_DATA.soft_skills.value,
            label: t("common.forms.applyForm.course.list.soft_skills"),
          },
        },
      },
    },
    feedbackForm: {
      buttonLabel: t("common.forms.feedbackForm.buttonLabel"),
      successText: t("common.forms.feedbackForm.successText"),
      errorText: t("common.forms.feedbackForm.errorText"),
      name: t("common.forms.feedbackForm.name"),
      surname: t("common.forms.feedbackForm.surname"),
      email: t("common.forms.feedbackForm.email"),
      message: t("common.forms.feedbackForm.message"),
    },
  } as const;
}
