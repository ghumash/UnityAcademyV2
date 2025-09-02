import { GoogleFormEmbed } from "@/shared/ui/custom";

const CONTACT_ID = process.env.NEXT_PUBLIC_GOOGLE_FORM_CONTACT_ID;

export default function ContactForm() {
  return (
    <GoogleFormEmbed
      id={CONTACT_ID}
      title="Contact form"
      openText="Открыть форму в новой вкладке"
      height={1200}
    />
  );
}
