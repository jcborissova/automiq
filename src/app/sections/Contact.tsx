/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageSquare,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const prefersReduced = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    _trap: "",
  });

  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const canSubmit = () =>
    form.name.trim().length >= 2 &&
    isValidEmail(form.email) &&
    form.message.trim().length >= 10 &&
    !form._trap;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit()) return;
    if (form._trap) return;

    setState("loading");
    setError(null);

    try {
      const res = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          title: "Nuevo contacto desde AutomIQ",
          time: new Date().toLocaleString(),
          reply_to: form.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (res.status !== 200) throw new Error("No se pudo enviar el mensaje");

      setState("success");
      setForm({ name: "", email: "", message: "", _trap: "" });
    } catch (err: any) {
      setError(
        err?.message ?? "Ocurrió un error inesperado al enviar el mensaje."
      );
      setState("error");
    } finally {
      setTimeout(() => setState("idle"), 2800);
    }
  };

  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-50 py-20 sm:py-24 lg:py-28 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 scroll-mt-24"
    >
      {/* Fondo sutil (sin imagen, sin textura fuerte) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_0%,rgba(56,189,248,0.12),transparent_60%),radial-gradient(900px_500px_at_90%_0%,rgba(16,185,129,0.10),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReduced ? 0 : 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            Contacto
          </p>
          <h2
            id="contact-title"
            className="mt-3 text-[clamp(28px,4.4vw,40px)] font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Hablemos de tu <span className="text-emerald-500">proyecto</span>
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            Cuéntanos en qué punto estás y vemos juntos cómo convertir tu idea,
            producto o proceso en algo más rápido, claro y automatizado.
          </p>
        </motion.div>

        {/* Grid principal */}
        <div className="mt-12 grid gap-8 sm:gap-10 md:grid-cols-2 lg:gap-12">
          {/* Formulario */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReduced ? 0 : 0.6 }}
            className="relative rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-7 lg:p-8 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.55)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90"
            noValidate
          >
            {state === "success" && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-500/30">
                <CheckCircle2 className="h-5 w-5" />
                <p className="text-sm font-medium">
                  ¡Mensaje enviado! Te contactaremos pronto.
                </p>
              </div>
            )}
            {state === "error" && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-red-700 ring-1 ring-red-200 dark:bg-red-500/10 dark:text-red-200 dark:ring-red-500/30">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Honeypot */}
            <input
              type="text"
              name="_trap"
              value={form._trap}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                minLength={2}
                required
                autoComplete="name"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white/95 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-50 dark:placeholder-slate-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/20"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tucorreo@empresa.com"
                required
                autoComplete="email"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white/95 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-50 dark:placeholder-slate-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/20"
              />
              {!isValidEmail(form.email) && form.email.length > 0 && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                  Ingresa un correo válido.
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                ¿En qué podemos ayudarte?
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Por ejemplo: mejorar tu web, automatizar un proceso interno, integrar sistemas, etc."
                minLength={10}
                required
                className="mt-1 w-full resize-none rounded-xl border border-slate-300 bg-white/95 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-50 dark:placeholder-slate-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/20"
              />
              {form.message.length > 0 && form.message.length < 10 && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                  Escribe un poco más de detalle (mín. 10 caracteres).
                </p>
              )}
            </div>

            <div className="flex">
              <button
                type="submit"
                disabled={!canSubmit() || state === "loading"}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando…
                  </>
                ) : (
                  "Enviar mensaje"
                )}
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Al enviar, aceptas ser contactado para dar seguimiento a tu
              solicitud. No compartimos tus datos con terceros.
            </p>
          </motion.form>

          {/* Columna lateral */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReduced ? 0 : 0.6,
              delay: prefersReduced ? 0 : 0.1,
            }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-7 lg:p-8 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Contacto directo
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Respuesta rápida en horario laboral (GMT-4).
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href="mailto:info@automiq.dev"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-emerald-300 hover:bg-emerald-50/40 dark:border-slate-700 dark:bg-slate-950/90 dark:hover:border-emerald-400/70 dark:hover:bg-emerald-500/5"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900 dark:text-slate-100">
                    info@automiq.dev
                  </span>
                </a>

                <a
                  href="tel:+18297071293"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-emerald-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950/90 dark:hover:border-emerald-400/70 dark:hover:bg-slate-900"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900 dark:text-slate-100">
                    +1 (829) 707-1293
                  </span>
                </a>

                <a
                  href="https://wa.me/18297071293"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-emerald-300 hover:bg-emerald-50/40 dark:border-slate-700 dark:bg-slate-950/90 dark:hover:border-emerald-400/70 dark:hover:bg-emerald-500/5"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900 dark:text-slate-100">
                    WhatsApp directo
                  </span>
                </a>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Qué puedes esperar
                </p>
                <ul className="mt-3 space-y-2 text-[13.5px] text-slate-700 dark:text-slate-300">
                  <li>· Respuesta inicial normalmente en menos de 24 horas.</li>
                  <li>· 1 llamada corta para entender contexto y prioridades.</li>
                  <li>· Propuesta clara con alcance, tiempos y aproximación técnica.</li>
                  <li>· Opciones escalables: empezar pequeño y crecer sobre la misma base.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
