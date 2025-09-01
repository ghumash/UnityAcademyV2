import { GoogleFormEmbed } from "@/shared/ui/custom";

const APPLY_ID = process.env.NEXT_PUBLIC_GOOGLE_FORM_APPLY_ID;

export default function ApplyForm() {
  return (
    <GoogleFormEmbed
      id={APPLY_ID}
      title="Application form"
      openText="Открыть форму в новой вкладке"
      height={1400}
    />
  );
}
