import { Alert, AlertTitle, AlertDescription } from "@/shared/ui";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type Tone = "info" | "success" | "warning" | "danger";

const ICONS: Record<Tone, any> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
};

const TONES: Record<Tone, string> = {
  info: "border-blue-500/50",
  success: "border-emerald-500/50",
  warning: "border-amber-500/50",
  danger: "border-red-500/50",
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: Tone;
  title?: string;
  children?: React.ReactNode;
}) {
  const Icon = ICONS[type];
  return (
    <Alert className={TONES[type]}>
      <Icon className="size-4" aria-hidden />
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
