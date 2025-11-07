/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DemoForm.tsx
"use client";
import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

type FormState = "idle" | "loading" | "success" | "error";

export default function DemoForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    _trap: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const canSubmit =
    form.name.trim().length >= 2 &&
    isValidEmail(form.email) &&
    form.message.trim().length >= 10 &&
    !form._trap &&
    state !== "loading";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setState("loading");
    setError(null);

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

      if (res.status !== 200) throw new Error("No se pudo enviar el mensaje");

      setState("success");
      setForm({ name: "", email: "", company: "", message: "", _trap: "" });
      setTimeout(() => setState("idle"), 2800);
    } catch (err: any) {
      setError(err?.message ?? "Ocurrió un error inesperado");
      setState("error");
      setTimeout(() => setState("idle"), 3500);
    }
  };

  if (state === "success") {
    return (
      <div className="text-center py-10">
        <div className="flex items-center justify-center gap-2 text-emerald-600 font-semibold text-lg mb-2">
          <CheckCircle2 className="h-5 w-5" />
          Solicitud enviada con éxito
        </div>
        <p className="text-slate-500 dark:text-slate-400">Gracias por tu interés. Te contactaremos muy pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {state === "error" && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-red-700 ring-1 ring-red-200">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <input type="text" name="_trap" value={form._trap} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Nombre completo</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
            autoComplete="name"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          />
          {!isValidEmail(form.email) && form.email.length > 0 && (
            <p className="mt-1 text-xs text-red-600">Ingresa un correo válido.</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Empresa (opcional)</label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          autoComplete="organization"
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Describe brevemente tu necesidad</label>
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
          minLength={10}
          placeholder="¿Qué necesitas automatizar o mejorar?"
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 resize-none"
        />
        {form.message.length > 0 && form.message.length < 10 && (
          <p className="mt-1 text-xs text-red-600">Escribe un poco más de detalle (mín. 10 caracteres).</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 px-4 py-2.5 text-white font-semibold shadow-md hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar solicitud
          </>
        )}
      </button>

      <p className="text-xs text-slate-500">Al enviar aceptas ser contactado para dar seguimiento a tu solicitud. No compartimos tus datos.</p>
    </form>
  );
}
