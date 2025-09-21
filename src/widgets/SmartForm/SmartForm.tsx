"use client";

import * as React from "react";
import { useForm, type Path } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Textarea,
  Label,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui"; // ⚡️ проверь, что эти компоненты экспортятся из shared/ui
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";
import { DatePickerField } from "./fields/DatePicker";

type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "hidden"
  | "invisible"
  | "select"
  | "checkbox"
  | "multiselect"
  | "date";

type Option = { label: string; value: string };

type FieldDef<TValues> = {
  name: Path<TValues>;
  label?: string;
  placeholder?: string;
  type?: FieldType;
  autoComplete?: string;
  /** layout hint */
  col?: "full" | "half";
  /** options для select/multiselect */
  options?: Option[];
};

type AnySchema = z.ZodType<any, any, any>;

type SmartFormProps<TSchema extends z.ZodType<any, any, any>> = {
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

function SmartFormInner<TSchema extends AnySchema>(
  props: SmartFormProps<TSchema>
) {
  const {
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
  } = props;

  const [status, setStatus] = React.useState<"idle" | "ok" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<any>({
    resolver: zodResolver(schema as any),
    defaultValues: defaults as any,
    mode: "onChange",
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields
            .filter((f) => f.type !== "invisible")
            .map((f) => {
              const id = f.name as string;
              const isHalf = f.col === "half";
              const colClass = isHalf ? "" : "sm:col-span-2";
              const err = (errors as Record<string, any>)[id]?.message as
                | string
                | undefined;

              const common = {
                id,
                placeholder: f.placeholder,
                autoComplete: f.autoComplete,
                "aria-invalid": !!err,
                ...register(f.name),
              };

              return (
                <div
                  key={id}
                  className={cn("grid w-full items-start gap-1.5", colClass)}
                >
                  {f.label && <Label htmlFor={id}>{f.label}</Label>}

                  {/* TEXTAREA */}
                  {f.type === "textarea" && (
                    <Textarea className="resize-none" {...common} />
                  )}

                  {/* INPUT */}
                  {(f.type === "text" ||
                    f.type === "email" ||
                    f.type === "hidden") && (
                    <Input type={f.type ?? "text"} {...common} />
                  )}

                  {/* CHECKBOX */}
                  {f.type === "checkbox" && (
                    <Checkbox
                      id={id}
                      checked={watch(f.name) as boolean}
                      onCheckedChange={(val) => setValue(f.name, val as any)}
                    />
                  )}

                  {/* SELECT */}
                  {f.type === "select" && f.options && (
                    <Select
                      value={watch(f.name) as string}
                      onValueChange={(val) => setValue(f.name, val as any)}
                    >
                      <SelectTrigger id={id}>
                        <SelectValue placeholder={f.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {f.options.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {/* MULTISELECT (простой) */}
                  {f.type === "multiselect" && f.options && (
                    <Select
                      value={watch(f.name) as string}
                      onValueChange={(val) => setValue(f.name as any, val)}
                    >
                      <SelectTrigger id={id}>
                        <SelectValue placeholder={f.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {f.options.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {/* DATE */}
                  {f.type === "date" && (
                    <DatePickerField
                      name={f.name}
                      placeholder={f.placeholder}
                      value={watch(f.name) as string}
                      onChange={async (value) => {
                        setValue(f.name, value as any);
                        // Принудительно запускаем валидацию для этого поля
                        await trigger(f.name);
                      }}
                      error={err}
                      locale={"ru"} // TODO: получать из контекста локализации
                    />
                  )}

                  {err && f.type !== "date" && <p className="text-sm text-destructive">{err}</p>}
                </div>
              );
            })}

          {/* Invisible fields - регистрируем но не отображаем */}
          {fields
            .filter((f) => f.type === "invisible")
            .map((f) => (
              <input
                key={f.name as string}
                type="hidden"
                {...register(f.name)}
              />
            ))}

          {/* Honeypot */}
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

export function SmartForm(props: SmartFormProps<AnySchema>) {
  return <SmartFormInner {...props} />;
}
