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

const CONTACT_EMAIL = "automiq@hotmail.com";
const MESSAGE_MIN_LENGTH = 10;

function getEmailJsConfig() {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return null;
  }

  return { serviceId, templateId, publicKey };
}

function buildMailtoHref({
  form,
  labels,
  locale,
  source,
}: {
  form: DemoFormData;
  labels: LeadFormLabels;
  locale: Locale;
  source: string;
}) {
  const lines = [
    `${labels.fields.name.label}: ${form.name.trim()}`,
    `${labels.fields.email.label}: ${form.email.trim()}`,
    "",
    labels.fields.message.label,
    form.message.trim(),
    "",
    `Source: ${source}`,
    `Locale: ${locale}`,
  ].filter((line): line is string => line !== null);

  const params = new URLSearchParams({
    subject: labels.emailSubject,
    body: lines.join("\n"),
  });

  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

function getSubmissionErrorMessage(
  submissionError: unknown,
  fallback: string
) {
  if (submissionError instanceof Error && submissionError.message) {
    return submissionError.message;
  }

  if (typeof submissionError === "string") {
    return submissionError;
  }

  if (
    typeof submissionError === "object" &&
    submissionError !== null &&
    "text" in submissionError &&
    typeof submissionError.text === "string"
  ) {
    return submissionError.text;
  }

  return fallback;
}

export default function DemoForm({
  locale,
  labels,
  source,
  compact = false,
}: DemoFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fallbackHref, setFallbackHref] = useState<string | null>(null);
  const [form, setForm] = useState<DemoFormData>(INITIAL_FORM);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (state === "error") {
      setState("idle");
      setError(null);
      setFallbackHref(null);
    }
  };

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const messageValid = form.message.trim().length >= MESSAGE_MIN_LENGTH;
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
    setFallbackHref(null);

    const mailtoHref = buildMailtoHref({ form, labels, locale, source });
    const emailJsConfig = getEmailJsConfig();

    try {
      if (!emailJsConfig) {
        throw new Error(labels.errorFallback);
      }

      const name = form.name.trim();
      const email = form.email.trim();
      const message = form.message.trim();
      const time = new Date().toLocaleString(locale === "es" ? "es-DO" : "en-US");
      const formattedMessage = [
        `${labels.fields.name.label}: ${name}`,
        `${labels.fields.email.label}: ${email}`,
        "",
        labels.fields.message.label,
        message,
        "",
        `Source: ${source}`,
        `Time: ${time}`,
      ].join("\n");

      const res = await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          source,
          title: labels.emailSubject,
          subject: labels.emailSubject,
          name,
          user_name: name,
          from_name: name,
          email,
          user_email: email,
          reply_to: email,
          message: formattedMessage,
          raw_message: message,
          time,
          to_email: CONTACT_EMAIL,
          recipient_email: CONTACT_EMAIL,
          to_name: "AutomIQ",
          from_email: CONTACT_EMAIL,
          website_email: CONTACT_EMAIL,
        },
        { publicKey: emailJsConfig.publicKey }
      );

      if (res.status !== 200) {
        throw new Error(labels.errorFallback);
      }

      setState("success");
      setFallbackHref(null);
      setForm(INITIAL_FORM);
      window.setTimeout(() => setState("idle"), 3200);
    } catch (submissionError) {
      setError(getSubmissionErrorMessage(submissionError, labels.errorFallback));
      setFallbackHref(mailtoHref);
      setState("error");
    }
  };

  const messagePlaceholder =
    labels.fields.message.placeholder ||
    (locale === "es"
      ? "Cuéntanos en pocas palabras qué necesitas"
      : "Tell us briefly what you need");
  const fallbackLabel =
    locale === "es" ? "Enviar por correo" : "Send by email";

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
        <div
          role="status"
          className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-emerald-900"
        >
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
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-red-900"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div className="min-w-0">
            <p className="text-sm font-medium">
              {error ?? labels.errorFallback}
            </p>
            {fallbackHref ? (
              <a
                href={fallbackHref}
                className="mt-1.5 inline-flex text-sm font-semibold text-red-700 underline-offset-4 hover:underline"
              >
                {fallbackLabel}
              </a>
            ) : null}
          </div>
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
          minLength={MESSAGE_MIN_LENGTH}
          className={`${fieldBase} resize-none`}
        />
        {form.message.length > 0 && !messageValid && (
          <p className={`${fieldHint} ${fieldHintError}`}>
            {labels.validation.message}
          </p>
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
