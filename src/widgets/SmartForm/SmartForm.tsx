"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea, Label } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";

type FieldType = "text" | "email" | "textarea" | "hidden";

type FieldDef<TValues> = {
  name: keyof TValues & string;
  label?: string;
  placeholder?: string;
  type?: FieldType;
  autoComplete?: string;
  /** layout hint */
  col?: "full" | "half";
};

type SmartFormProps<TSchema extends z.ZodTypeAny> = {
  schema: TSchema;
  action: string;
  method?: "POST" | "PUT";
  fields: ReadonlyArray<FieldDef<z.infer<TSchema>>>;
  defaults?: Partial<z.infer<TSchema>>;
  className?: string;
  buttonLabel?: string;
  transform?: (values: z.infer<TSchema>) => unknown;
  successText?: string;
  errorText?: string;
};

export function SmartForm<TSchema extends z.ZodTypeAny>({
  schema,
  action,
  method = "POST",
  fields,
  defaults,
  className,
  buttonLabel = "Send",
  transform,
  successText = "Message sent",
  errorText = "Something went wrong",
}: SmartFormProps<TSchema>) {
  type Values = z.infer<TSchema>;
  const [status, setStatus] = React.useState<"idle" | "ok" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Values | any>({
    resolver: zodResolver(schema as any),
    defaultValues: defaults as Values | undefined,
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit(async (v) => {
    setStatus("idle");
    try {
      const payload = transform ? transform(v) : v;
      const res = await fetch(action, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Bad response");
      setStatus("ok");
      toast.success(successText);
      reset();
    } catch {
      setStatus("error");
      toast.error(errorText);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div
        className={cn(
          "mx-auto flex flex-col gap-6 rounded-lg border p-6 sm:p-8 md:p-10",
          className
        )}
      >
        {/* 2-колоночный адаптив: используем подсказку col=half */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((f) => {
            const id = f.name;
            const isHalf = f.col === "half";
            const colClass = isHalf ? "" : "sm:col-span-2";
            const err = (errors as Record<string, any>)[id]?.message as
              | string
              | undefined;

            const commonInputProps = {
              id,
              placeholder: f.placeholder,
              autoComplete: f.autoComplete,
              "aria-invalid": !!err,
              ...register(id as any),
            };

            return (
              <div
                key={id}
                className={cn("grid w-full items-center gap-1.5", colClass)}
              >
                {f.label && <Label htmlFor={id}>{f.label}</Label>}

                {f.type === "textarea" ? (
                  <Textarea rows={5} {...(commonInputProps as any)} />
                ) : (
                  <Input
                    type={f.type ?? "text"}
                    {...(commonInputProps as any)}
                  />
                )}

                {err && <p className="text-sm text-red-600">{err}</p>}
              </div>
            );
          })}
          <div className="hidden">
            <Label htmlFor="_honeypot">Honeypot</Label>
            <Input
              id="_honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              {...register("_honeypot" as any)}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Sending…" : buttonLabel}
        </Button>

        {/* Inline a11y alerts */}
        <div aria-live="polite">
          {status === "ok" && (
            <div className="rounded-md border border-green-600/30 bg-green-50 px-4 py-2 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-300">
              {successText}
            </div>
          )}
          {status === "error" && (
            <div className="rounded-md border border-red-600/30 bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
              {errorText}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
