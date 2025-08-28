import { ModeToggle } from "@/features/theme";
import { Button } from "@/shared/ui";
import { Container, Section } from "@/shared/ui/custom";

export default function Home() {
  return (
    <main>
      <Section>
        <Container className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Unity Academy</h1>
            <p className="mt-3 text-muted-foreground">
              Стартовый каркас готов. Двигаемся по шагам.
            </p>
          </div>
          <ModeToggle />
        </Container>
      </Section>

      <Section>
        <Container>
          <Button>Начать</Button>
        </Container>
      </Section>
    </main>
  );
}
