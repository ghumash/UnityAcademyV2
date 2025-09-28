import { handleForm, gforms } from "@/shared/lib/google";
import { createEventRegisterSchema } from "@/features/event-register";
import { getDictionarySync, resolveLocaleFromPath } from "@/shared/lib/i18n/helpers";

export async function POST(req: Request) {
  // Определяем локаль из заголовков или URL
  const referer = req.headers.get("referer") || "";
  const locale = resolveLocaleFromPath(new URL(referer).pathname);
  
  // Получаем словарь для текущей локали
  const dict = getDictionarySync(locale);
  const schema = createEventRegisterSchema(dict.common.forms.validation);

  return handleForm(req, {
    schema,
    formId: gforms.eventRegister.formId,
    entries: gforms.eventRegister.entries,
  });
}
