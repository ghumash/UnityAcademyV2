import { Section, Container } from "@/shared/ui/custom";

export default function HomePage() {
  return (
    <main>
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">Unity Academy</h1>
          <p className="mt-3 text-muted-foreground">
            Стартовый каркас готов. Двигаемся по шагам.
          </p>
        </Container>
      </Section>
    </main>
  );
}
