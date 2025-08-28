import { Button } from "@/shared/ui";
import { Container, Section } from "@/shared/ui/custom";

export default function Home() {
  return (
    <main>
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">Unity Academy</h1>
          <p className="mt-3 text-muted-foreground">
            Стартовый каркас готов. Двигаемся по шагам.
          </p>
          <div className="mt-6">
            <Button>Начать</Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
