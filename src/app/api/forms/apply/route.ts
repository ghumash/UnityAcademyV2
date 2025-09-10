import { handleForm, gforms } from "@/shared/lib/google";
import { ApplySchema } from "@/features/apply";

export async function POST(req: Request) {
  return handleForm(req, {
    schema: ApplySchema,
    formId: gforms.apply.formId,
    entries: gforms.apply.entries,
  });
}
