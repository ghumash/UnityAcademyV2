"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeedbackSchema, type FeedbackValues } from "@/features/feedback";
import { Button, Input, Textarea, Label } from "@/shared/ui";

export const FeedbackForm = () => {
  const [status, setStatus] = React.useState<"idle" | "ok" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FeedbackValues>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      message: "",
      _company: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        setStatus("idle");
        try {
          const res = await fetch("/api/forms/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          if (res.ok) {
            setStatus("ok");
            reset();
          } else {
            setStatus("error");
          }
        } catch {
          setStatus("error");
        }
      })}
      className="grid gap-4 max-w-xl"
    >
      <div>
        <Label htmlFor="name">Անուն / Name</Label>
        <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="surname">Ազգանուն / Surname</Label>
        <Input
          id="surname"
          {...register("surname")}
          aria-invalid={!!errors.surname}
        />
        {errors.surname && (
          <p className="text-sm text-red-600 mt-1">{errors.surname.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Հաղորդագրություն / Message</Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot (скрытое поле) */}
      <div className="hidden">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          tabIndex={-1}
          autoComplete="off"
          {...register("_company")}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Ուղարկվում է… / Sending…" : "Ուղարկել / Send"}
      </Button>

      {status === "ok" && (
        <p className="text-sm text-green-600">
          Շնորհակալություն, հաղորդագրությունը ուղարկված է / Thank you!
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Տեղի ունեցավ սխալ․ փորձեք կրկին / Something went wrong.
        </p>
      )}
    </form>
  );
};
