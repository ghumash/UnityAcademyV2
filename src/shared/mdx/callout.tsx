import * as React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/shared/ui";
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

type Kind = "info" | "success" | "warning" | "error";

const ICON: Record<Kind, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

const TITLE: Record<Kind, string> = {
  info: "Note",
  success: "Success",
  warning: "Warning",
  error: "Error",
};

export function Callout({
  kind = "info",
  title,
  children,
}: {
  kind?: Kind;
  title?: string;
  children?: React.ReactNode;
}) {
  const Icon = ICON[kind];
  const isError = kind === "error";
  return (
    <Alert variant={isError ? "destructive" : "default"} className="mt-6">
      <Icon className="size-4" aria-hidden />
      <AlertTitle>{title ?? TITLE[kind]}</AlertTitle>
      {children ? <AlertDescription>{children}</AlertDescription> : null}
    </Alert>
  );
}
