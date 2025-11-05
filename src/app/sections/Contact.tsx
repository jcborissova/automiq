/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, MessageSquare, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const prefersReduced = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "", _trap: "" }); // _trap = honeypot
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
    !form._trap; // evita bots simples

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit()) return;

    setState("loading");
    setError(null);

    try {
      // 🔄 Aquí puedes llamar a tu API real:
      // const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
      // if (!res.ok) throw new Error("No se pudo enviar el mensaje");
      await new Promise((r) => setTimeout(r, 900)); // simulación
      setState("success");
      setForm({ name: "", email: "", message: "", _trap: "" });
    } catch (err: any) {
      setError(err?.message ?? "Ocurrió un error inesperado");
      setState("error");
    } finally {
      setTimeout(() => setState("idle"), 2800);
    }
  };

  const mailtoHref = `mailto:info@automiq.dev?subject=${encodeURIComponent(
    "[Contacto] " + (form.name || "Nuevo mensaje")
  )}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name} <${form.email}>`)}`;

  const whatsappHref = `https://wa.me/18297071293?text=${encodeURIComponent(
    `Hola, soy ${form.name || "—"}. ${form.message || "Me gustaría hablar sobre un proyecto."}`
  )}`;

  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="relative overflow-hidden py-24 sm:py-28"
    >
      {/* Fondo elegante con glow y textura sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" />
        <div className="absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)] bg-[radial-gradient(700px_380px_at_50%_-80px,rgba(56,189,248,0.12),transparent)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReduced ? 0 : 0.55 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 id="contact-title" className="text-[clamp(28px,4.8vw,40px)] font-extrabold tracking-tight text-slate-900">
            Hablemos de tu <span className="text-emerald-600">Proyecto</span>
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">
            Cuéntanos tu idea y te ayudamos a convertirla en resultados medibles,
            con soluciones inteligentes y a tu medida.
          </p>
        </motion.div>

        {/* Contenido */}
        <div className="mt-14 grid md:grid-cols-2 gap-8 sm:gap-12">
          {/* Formulario */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReduced ? 0 : 0.6 }}
            className="relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_18px_50px_-24px_rgba(2,6,23,0.2)]"
            noValidate
          >
            {/* Estado de envío */}
            {state === "success" && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700 ring-1 ring-emerald-200">
                <CheckCircle2 className="h-5 w-5" />
                <p className="text-sm font-medium">¡Mensaje enviado! Te contactaremos pronto.</p>
              </div>
            )}
            {state === "error" && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-red-700 ring-1 ring-red-200">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Honeypot (oculto para bots) */}
            <input
              type="text"
              name="_trap"
              value={form._trap}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Nombre */}
            <div className="mb-5">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
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
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tucorreo@email.com"
                required
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition"
              />
              {!isValidEmail(form.email) && form.email.length > 0 && (
                <p className="mt-2 text-xs text-red-600">Ingresa un correo válido.</p>
              )}
            </div>

            {/* Mensaje */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Cuéntanos en qué podemos ayudarte..."
                minLength={10}
                required
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition"
              />
              {form.message.length > 0 && form.message.length < 10 && (
                <p className="mt-2 text-xs text-red-600">Escribe un poco más de detalle (mín. 10 caracteres).</p>
              )}
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={!canSubmit() || state === "loading"}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
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

              {/* Alternativas rápidas */}
              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-emerald-300 hover:text-slate-900 transition"
              >
                Enviar por correo
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition"
              >
                WhatsApp
              </a>
            </div>

            {/* Nota legal breve */}
            <p className="mt-4 text-xs text-slate-500">
              Al enviar, aceptas ser contactado para dar seguimiento a tu solicitud. Nunca compartimos tus datos.
            </p>
          </motion.form>

          {/* Contacto directo + puntos de confianza */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReduced ? 0 : 0.6, delay: prefersReduced ? 0 : 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_18px_50px_-24px_rgba(2,6,23,0.2)]">
              <h3 className="text-lg font-semibold text-slate-900">Contacto directo</h3>
              <p className="mt-1 text-sm text-slate-600">
                Respuesta rápida en horario laboral (GMT-4).
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href="mailto:info@automiq.dev"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-emerald-300 transition"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
                    info@automiq.dev
                  </span>
                </a>

                <a
                  href="tel:+18297071293"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-emerald-300 transition"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600 ring-1 ring-sky-200">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
                    +1 (829) 707-1293
                  </span>
                </a>

                <a
                  href="https://wa.me/18297071293"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-emerald-300 transition"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
                    WhatsApp directo
                  </span>
                </a>
              </div>

              {/* Puntos de confianza */}
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13.5px] text-slate-700">
                <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">Tiempo de respuesta &lt; 24h</li>
                <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">Propuestas claras y medibles</li>
                <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">Acuerdos de confidencialidad</li>
                <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">Experiencia en banca y RPA</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
