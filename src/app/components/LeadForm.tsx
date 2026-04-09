"use client";

import emailjs from "@emailjs/browser";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";
import type { LeadFormLabels, Locale } from "../lib/site-content";

type FormState = "idle" | "loading" | "success" | "error";

type LeadFormProps = {
  locale: Locale;
  labels: LeadFormLabels;
  source: string;
  compact?: boolean;
};

type LeadFormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  primaryNeed: string;
  teamSize: string;
  timeframe: string;
  message: string;
  _trap: string;
};

const INITIAL_FORM: LeadFormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  primaryNeed: "",
  teamSize: "",
  timeframe: "",
  message: "",
  _trap: "",
};

export default function LeadForm({
  locale,
  labels,
  source,
  compact = false,
}: LeadFormProps) {
  const [form, setForm] = useState<LeadFormData>(INITIAL_FORM);
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = useMemo(
    () => (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    []
  );

  const canSubmit =
    form.name.trim().length >= 2 &&
    isValidEmail(form.email) &&
    form.primaryNeed &&
    form.teamSize &&
    form.timeframe &&
    form.message.trim().length >= 20 &&
    !form._trap &&
    state !== "loading";

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const getOptionLabel = (
    key: keyof LeadFormLabels["options"],
    value: string
  ) => labels.options[key].find((option) => option.value === value)?.label ?? value;

  const resetLater = () => {
    window.setTimeout(() => {
      setState("idle");
      setError(null);
    }, 3200);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit || form._trap) {
      return;
    }

    setState("loading");
    setError(null);

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          title: labels.emailSubject,
          time: new Date().toLocaleString(locale === "es" ? "es-DO" : "en-US"),
          source,
          name: form.name,
          email: form.email,
          company: form.company || "N/A",
          role: form.role || "N/A",
          primary_need: getOptionLabel("primaryNeed", form.primaryNeed),
          team_size: getOptionLabel("teamSize", form.teamSize),
          timeframe: getOptionLabel("timeframe", form.timeframe),
          message: form.message,
          reply_to: form.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (response.status !== 200) {
        throw new Error(labels.errorFallback);
      }

      setState("success");
      setForm(INITIAL_FORM);
      resetLater();
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : labels.errorFallback;
      setError(message);
      setState("error");
      resetLater();
    }
  };

  const fieldClassName =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={compact ? "space-y-5" : "space-y-6"}
    >
      <div>
        <h3 className="text-xl font-semibold text-slate-950">{labels.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {labels.description}
        </p>
      </div>

      {state === "success" && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">{labels.successTitle}</p>
            <p className="text-sm text-emerald-700">{labels.successBody}</p>
          </div>
        </div>
      )}

      {state === "error" && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{error ?? labels.errorFallback}</p>
        </div>
      )}

      <input
        type="text"
        name="_trap"
        value={form._trap}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label={labels.fields.name.label}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={labels.fields.name.placeholder}
            minLength={2}
            required
            autoComplete="name"
            className={fieldClassName}
          />
        </FormField>

        <FormField label={labels.fields.email.label}>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={labels.fields.email.placeholder}
            required
            autoComplete="email"
            className={fieldClassName}
          />
          {!isValidEmail(form.email) && form.email.length > 0 && (
            <FieldHint error>{labels.validation.email}</FieldHint>
          )}
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label={labels.fields.company.label}>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder={labels.fields.company.placeholder}
            autoComplete="organization"
            className={fieldClassName}
          />
        </FormField>

        <FormField label={labels.fields.role.label}>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder={labels.fields.role.placeholder}
            autoComplete="organization-title"
            className={fieldClassName}
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <FormField label={labels.fields.primaryNeed.label}>
          <select
            name="primaryNeed"
            value={form.primaryNeed}
            onChange={handleChange}
            required
            className={fieldClassName}
          >
            <option value="">{labels.fields.primaryNeed.placeholder}</option>
            {labels.options.primaryNeed.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label={labels.fields.teamSize.label}>
          <select
            name="teamSize"
            value={form.teamSize}
            onChange={handleChange}
            required
            className={fieldClassName}
          >
            <option value="">{labels.fields.teamSize.placeholder}</option>
            {labels.options.teamSize.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label={labels.fields.timeframe.label}>
          <select
            name="timeframe"
            value={form.timeframe}
            onChange={handleChange}
            required
            className={fieldClassName}
          >
            <option value="">{labels.fields.timeframe.placeholder}</option>
            {labels.options.timeframe.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label={labels.fields.message.label}>
        <textarea
          name="message"
          rows={compact ? 4 : 5}
          value={form.message}
          onChange={handleChange}
          placeholder={labels.fields.message.placeholder}
          minLength={20}
          required
          className={`${fieldClassName} resize-none`}
        />
        {form.message.length > 0 && form.message.trim().length < 20 && (
          <FieldHint error>{labels.validation.message}</FieldHint>
        )}
      </FormField>

      <button
        type="submit"
        disabled={!canSubmit}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {labels.submitting}
          </>
        ) : (
          <>
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            {labels.submit}
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-slate-500">{labels.privacy}</p>
    </form>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-800">{label}</span>
      {children}
    </label>
  );
}

function FieldHint({
  children,
  error = false,
}: {
  children: React.ReactNode;
  error?: boolean;
}) {
  return (
    <p className={`mt-2 text-xs ${error ? "text-red-600" : "text-slate-500"}`}>
      {children}
    </p>
  );
}
