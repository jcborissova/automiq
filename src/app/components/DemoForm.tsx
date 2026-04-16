"use client";

import emailjs from "@emailjs/browser";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import Button from "./ui/Button";
import { fieldBase, fieldHint, fieldHintError, fieldLabel } from "./ui/field";
import type { LeadFormLabels, Locale } from "../lib/site-content";

type FormState = "idle" | "loading" | "success" | "error";

type DemoFormProps = {
  locale: Locale;
  labels: LeadFormLabels;
  source: string;
  compact?: boolean;
};

type DemoFormData = {
  name: string;
  email: string;
  message: string;
  _trap: string;
};

const INITIAL_FORM: DemoFormData = {
  name: "",
  email: "",
  message: "",
  _trap: "",
};

export default function DemoForm({
  locale,
  labels,
  source,
  compact = false,
}: DemoFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<DemoFormData>(INITIAL_FORM);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const messageValid = form.message.trim().length >= 10;
  const canSubmit =
    form.name.trim().length >= 2 &&
    validEmail &&
    messageValid &&
    !form._trap &&
    state !== "loading";

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setState("loading");
    setError(null);

    try {
      const res = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          source,
          title: labels.emailSubject,
          name: form.name,
          email: form.email,
          message: form.message,
          time: new Date().toLocaleString(locale === "es" ? "es-DO" : "en-US"),
          reply_to: form.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (res.status !== 200) {
        throw new Error(labels.errorFallback);
      }

      setState("success");
      setForm(INITIAL_FORM);
      window.setTimeout(() => setState("idle"), 3200);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : labels.errorFallback
      );
      setState("error");
      window.setTimeout(() => {
        setState("idle");
        setError(null);
      }, 3200);
    }
  };

  const messagePlaceholder =
    locale === "es"
      ? "Cuentanos en pocas palabras que necesitas"
      : "Tell us briefly what you need";
  const messageValidation =
    locale === "es"
      ? "Minimo 10 caracteres"
      : "At least 10 characters";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={compact ? "space-y-4" : "space-y-4 sm:space-y-5"}
    >
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-[var(--ink-950)] sm:text-xl">
          {labels.title}
        </h3>
        <p className="mt-1.5 text-sm leading-6 text-[var(--ink-500)]">
          {labels.description}
        </p>
      </div>

      {state === "success" && (
        <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-emerald-900">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div className="min-w-0">
            <p className="text-sm font-semibold">{labels.successTitle}</p>
            <p className="mt-0.5 text-sm text-emerald-700">
              {labels.successBody}
            </p>
          </div>
        </div>
      )}

      {state === "error" && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-red-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm font-medium">{error ?? labels.errorFallback}</p>
        </div>
      )}

      <input
        type="text"
        name="_trap"
        value={form._trap}
        onChange={onChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <Field label={labels.fields.name.label}>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder={labels.fields.name.placeholder}
          required
          minLength={2}
          autoComplete="name"
          className={fieldBase}
        />
      </Field>

      <Field label={labels.fields.email.label}>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder={labels.fields.email.placeholder}
          required
          autoComplete="email"
          className={fieldBase}
        />
        {!validEmail && form.email.length > 0 && (
          <p className={`${fieldHint} ${fieldHintError}`}>
            {labels.validation.email}
          </p>
        )}
      </Field>

      <Field label={labels.fields.message.label}>
        <textarea
          name="message"
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={onChange}
          placeholder={messagePlaceholder}
          required
          minLength={10}
          className={`${fieldBase} resize-none`}
        />
        {form.message.length > 0 && !messageValid && (
          <p className={`${fieldHint} ${fieldHintError}`}>{messageValidation}</p>
        )}
      </Field>

      <Button
        type="submit"
        disabled={!canSubmit}
        size="lg"
        full
        leftIcon={
          state === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )
        }
      >
        {state === "loading" ? labels.submitting : labels.submit}
      </Button>

      <p className="text-xs leading-5 text-[var(--ink-500)]">{labels.privacy}</p>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={fieldLabel}>{label}</span>
      {children}
    </label>
  );
}
