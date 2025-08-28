"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, type ContactInput } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Checkbox,
  Button,
} from "@/shared/ui";
import { toast } from "sonner";
import { submitContact } from "./actions";

export default function ContactForm() {
  const [pending, startTransition] = React.useTransition();
  const [liveMsg, setLiveMsg] = useState("");

  const form = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", message: "", consent: false, hp: "" },
    mode: "onBlur",
  });

  useEffect(() => {
    form.setValue("ts", Date.now(), { shouldDirty: false, shouldTouch: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values: ContactInput) => {
    startTransition(async () => {
      const res = await submitContact(values);
      if (res.ok) {
        form.reset({
          name: "",
          email: "",
          message: "",
          consent: false,
          hp: "",
        });
        setLiveMsg("Сообщение отправлено");
        toast.success("Сообщение отправлено. Спасибо!");
      } else {
        const msg =
          res.errors?.form?.[0] ||
          res.errors?.name?.[0] ||
          res.errors?.email?.[0] ||
          res.errors?.message?.[0] ||
          res.errors?.consent?.[0] ||
          "Не удалось отправить. Попробуй позже.";
        setLiveMsg(msg);
        toast.error(msg);
      }
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
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...form.register("hp")}
      />
      <input type="hidden" {...form.register("ts", { valueAsNumber: true })} />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
          name="message"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Сообщение</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Опиши вопрос или предложение"
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
            <FormItem className="md:col-span-2">
              <div className="flex items-start gap-2">
                <FormControl>
                  <Checkbox
                    checked={(field.value as boolean) ?? false}
                    onCheckedChange={(v) => field.onChange(v === true)}
                    aria-describedby="contact-consent"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">
                    Согласие на обработку персональных данных
                  </FormLabel>
                  <p
                    id="contact-consent"
                    className="text-xs text-muted-foreground"
                  >
                    Используем данные только для ответа на обращение.
                  </p>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:col-span-2">
          <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? "Отправка..." : "Отправить"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
