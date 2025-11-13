/* eslint-disable @typescript-eslint/no-explicit-any */
/* components/DemoForm.tsx */
"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

type FormState = "idle" | "loading" | "success" | "error";

export default function DemoForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", _trap: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const canSubmit =
    form.name.trim().length >= 2 && validEmail && form.message.trim().length >= 10 && !form._trap && state !== "loading";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setState("loading"); setError(null);
    try {
      const res = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: form.name,
          email: form.email,
          company: form.company || "N/D",
          message: form.message,
          title: "Solicitud de demo - AutomIQ",
          time: new Date().toLocaleString(),
          reply_to: form.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      if (res.status !== 200) throw new Error("No se pudo enviar el mensaje.");
      setState("success");
      setForm({ name: "", email: "", company: "", message: "", _trap: "" });
      setTimeout(() => setState("idle"), 2600);
    } catch (err: any) {
      setError(err?.message ?? "Ocurrió un error inesperado");
      setState("error");
      setTimeout(() => setState("idle"), 3200);
    }
  };

  if (state === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-6 text-emerald-800 shadow-sm
                      dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
        <p className="flex items-center gap-2 font-semibold"><CheckCircle2 className="h-5 w-5" />
          Solicitud enviada con éxito
        </p>
        <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-200/80">Te contactaremos muy pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {state === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700
                        dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <input type="text" name="_trap" value={form._trap} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Nombre / Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nombre completo">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            minLength={2}
            autoComplete="name"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none
                       transition placeholder:text-slate-400
                       focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30
                       dark:border-slate-700 dark:bg-transparent dark:text-slate-100
                       dark:focus:border-emerald-500 dark:focus:ring-emerald-500/35"
            placeholder="Juan Carlos Borissova"
          />
          {form.name.length > 0 && form.name.trim().length < 2 && <Hint error>Mínimo 2 caracteres.</Hint>}
        </Field>

        <Field label="Correo electrónico">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none
                       transition placeholder:text-slate-400
                       focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30
                       dark:border-slate-700 dark:bg-transparent dark:text-slate-100
                       dark:focus:border-sky-400 dark:focus:ring-sky-400/35"
            placeholder="tucorreo@empresa.com"
          />
          {!validEmail && form.email.length > 0 && <Hint error>Ingresa un correo válido.</Hint>}
        </Field>
      </div>

      {/* Empresa */}
      <Field label="Empresa (opcional)">
        <input
          name="company"
          value={form.company}
          onChange={onChange}
          autoComplete="organization"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none
                     transition placeholder:text-slate-400
                     focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30
                     dark:border-slate-700 dark:bg-transparent dark:text-slate-100
                     dark:focus:border-emerald-500 dark:focus:ring-emerald-500/35"
          placeholder="Banco Caribe"
        />
      </Field>

      {/* Mensaje */}
      <Field label="Describe brevemente tu necesidad">
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={onChange}
          required
          minLength={10}
          placeholder="¿Qué necesitas automatizar o mejorar?"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none
                     transition placeholder:text-slate-400 resize-none
                     focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30
                     dark:border-slate-700 dark:bg-transparent dark:text-slate-100
                     dark:focus:border-emerald-500 dark:focus:ring-emerald-500/35"
        />
        {form.message.length > 0 && form.message.length < 10 && <Hint error>Mín. 10 caracteres.</Hint>}
      </Field>

      {/* Botón: sólido (brand) */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5
                   font-semibold text-white shadow-sm transition active:scale-[0.99]
                   hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/40
                   disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            <Send className="h-4 w-4 transition-transform group-hover:-translate-y-[1px]" />
            Enviar solicitud
          </>
        )}
      </button>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Al enviar aceptas ser contactado para dar seguimiento a tu solicitud. No compartimos tus datos.
      </p>
    </form>
  );
}

/* ——— Subcomponentes minimalistas ——— */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-800 dark:text-slate-200">{label}</span>
      {children}
    </label>
  );
}

function Hint({ children, error }: { children: React.ReactNode; error?: boolean }) {
  return <p className={`mt-1 text-xs ${error ? "text-red-600" : "text-slate-500 dark:text-slate-400"}`}>{children}</p>;
}
