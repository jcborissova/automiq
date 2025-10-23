"use client";
import { useState } from "react";
import { Send } from "lucide-react";

export default function DemoForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  if (sent)
    return (
      <div className="text-center py-10">
        <div className="text-emerald-500 font-semibold text-lg mb-2">
          ✅ Solicitud enviada con éxito
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Gracias por tu interés. Nos pondremos en contacto contigo pronto.
        </p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
            Nombre completo
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Empresa (opcional)
        </label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Describe brevemente tu necesidad
        </label>
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 px-4 py-2.5 text-white font-semibold shadow-md hover:opacity-90 transition"
      >
        <Send className="w-4 h-4 inline-block mr-1" />
        Enviar solicitud
      </button>
    </form>
  );
}
