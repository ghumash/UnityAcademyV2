"use client";

import * as React from "react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Button,
} from "@/shared/ui";
import { toast } from "sonner";
import { ApplicationInput, ApplicationSchema } from "./schema";
import { submitApplication } from "./actions";

const COURSES = [
  { value: "web", label: "Веб-разработка" },
  { value: "ai", label: "Искусственный интеллект" },
  { value: "android", label: "Android" },
  { value: "smm", label: "SMM" },
] as const;

export default function ApplyForm() {
  const [isPending, startTransition] = useTransition();
  const [liveMsg, setLiveMsg] = useState<string>("");

  const form = useForm<ApplicationInput>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      course: "",
      message: "",
      consent: false,
      hp: "",
      ts: undefined,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    form.setValue("ts", Date.now(), {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values: ApplicationInput) => {
    startTransition(async () => {
      const res = await submitApplication(values);
      form.clearErrors();

      if (res.ok) {
        form.reset({
          name: "",
          email: "",
          phone: "",
          course: "",
          message: "",
          consent: false,
          hp: "",
          ts: Date.now(),
        });
        setLiveMsg("Заявка отправлена");
        toast.success("Заявка отправлена. Мы свяжемся в ближайшее время!");
        return;
      }

      if (res.errors) {
        (
          Object.entries(res.errors) as Array<
            [keyof ApplicationInput, string | undefined]
          >
        ).forEach(([field, msg]) => {
          if (msg)
            form.setError(field as any, { type: "server", message: msg });
        });
      }

      const msg =
        res.errors?.form ||
        res.errors?.name ||
        res.errors?.email ||
        res.errors?.phone ||
        res.errors?.course ||
        res.errors?.consent ||
        res.message ||
        "Не удалось отправить. Попробуй позже.";

      setLiveMsg(msg);
      toast.error(msg);
    });
  };

  return (
    <Form {...form}>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {liveMsg}
      </p>

      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...form.register("hp")}
      />
      {/* hidden ts */}
      <input type="hidden" {...form.register("ts", { valueAsNumber: true })} />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 sm:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Иван" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+374 ..."
                  autoComplete="tel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel>Курс</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <SelectTrigger aria-label="Выбор курса">
                    <SelectValue placeholder="Выбери курс" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Сообщение (необязательно)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Коротко о себе или вопросы"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <div className="flex items-start gap-2">
                <FormControl>
                  <Checkbox
                    checked={(field.value as boolean) ?? false}
                    onCheckedChange={(v) => field.onChange(v === true)}
                    aria-describedby="consent-desc"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">
                    Согласие на обработку персональных данных
                  </FormLabel>
                  <p
                    id="consent-desc"
                    className="text-xs text-muted-foreground"
                  >
                    Мы используем контактные данные только для связи по заявке.
                  </p>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sm:col-span-2">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? "Отправка..." : "Отправить"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
