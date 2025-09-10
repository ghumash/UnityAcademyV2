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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
} from "@/shared/ui"; // ⚡️ проверь, что эти компоненты экспортятся из shared/ui
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";

type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "hidden"
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
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((f) => {
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
                    value={watch(f.name) as string[]}
                    onValueChange={(val) => setValue(f.name, val as any)}
                    multiple
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !watch(f.name) && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {watch(f.name)
                          ? new Date(
                              watch(f.name) as string
                            ).toLocaleDateString()
                          : f.placeholder || "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          watch(f.name)
                            ? new Date(watch(f.name) as string)
                            : undefined
                        }
                        onSelect={(date) =>
                          setValue(f.name, date?.toISOString() as any)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}

                {err && <p className="text-sm text-red-600">{err}</p>}
              </div>
            );
          })}

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
