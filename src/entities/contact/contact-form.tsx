"use client";

import * as React from "react";
import { useActionState } from "react";
import type { ActionState } from "@/shared/lib/actions/result";
import { Button, Input, Label, Textarea, Checkbox } from "@/shared/ui";
import { contactAction } from "./actions";

const initial: ActionState = { ok: false, message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(contactAction, initial);
  const createdAt = React.useRef<number>(Date.now());

  return (
    <form action={formAction} className="grid gap-4">
      {/* hidden anti-bot */}
      <input
        type="text"
        name="hp"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <input type="hidden" name="ts" value={createdAt.current} />

      <div className="grid gap-2">
        <Label htmlFor="name">Имя</Label>
        <Input
          id="name"
          name="name"
          required
          aria-invalid={!!state?.errors?.name}
        />
        {state?.errors?.name && (
          <p className="text-sm text-destructive">{state.errors.name}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          aria-invalid={!!state?.errors?.email}
        />
        {state?.errors?.email && (
          <p className="text-sm text-destructive">{state.errors.email}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Сообщение</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={!!state?.errors?.message}
        />
        {state?.errors?.message && (
          <p className="text-sm text-destructive">{state.errors.message}</p>
        )}
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="consent"
          name="consent"
          aria-invalid={!!state?.errors?.consent}
        />
        <Label htmlFor="consent" className="text-sm text-foreground/80">
          Согласие на обработку данных
        </Label>
      </div>
      {state?.errors?.consent && (
        <p className="text-sm text-destructive">{state.errors.consent}</p>
      )}

      {state?.errors?.form && (
        <p className="text-sm text-destructive">{state.errors.form}</p>
      )}

      <div className="pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Отправка..." : "Отправить"}
        </Button>
      </div>

      {state?.ok && (
        <p className="text-sm text-green-600">Сообщение отправлено. Спасибо!</p>
      )}
      {!state?.ok && state?.message && (
        <p className="text-sm text-muted-foreground">{state.message}</p>
      )}
    </form>
  );
}
