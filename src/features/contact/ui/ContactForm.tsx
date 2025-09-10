import { Container, GoogleFormEmbed, Section } from "@/shared/ui/custom";

const CONTACT_ID = process.env.NEXT_PUBLIC_GOOGLE_FORM_CONTACT_ID;

export default function ContactForm() {
  return (
    <Section>
      <Container>
        <GoogleFormEmbed
          id={CONTACT_ID}
          title="Կապ"
          openText="Բացել նոր էջում"
          height={500}
        />
      </Container>
    </Section>
  );
}
