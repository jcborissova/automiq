"use client";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gracias por tu mensaje, te contactaremos pronto 🚀");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contacto"
      className="relative py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950 text-white overflow-hidden"
    >
      {/* 🌌 Textura de fondo */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* 🧭 Título */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6 text-center"
        >
          Contáctanos
        </motion.h2>

        {/* 💬 Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-slate-300 text-center max-w-2xl mx-auto mb-16"
        >
          Cuéntanos sobre tu proyecto o idea. Nos encantará ayudarte a hacerlo
          realidad con soluciones inteligentes, eficientes y a tu medida.
        </motion.p>

        {/* 🧱 Contenido */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* ✍️ Formulario */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-lg"
          >
            <div className="mb-5">
              <label className="block text-sm font-medium mb-1 text-slate-200">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Tu nombre"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-1 text-slate-200">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="tucorreo@email.com"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-1 text-slate-200">
                Mensaje
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Cuéntanos en qué podemos ayudarte..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-500 py-3 font-semibold shadow-md hover:opacity-90 transition"
            >
              Enviar mensaje
            </button>
          </motion.form>

          {/* 📞 Contacto directo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center gap-8 text-slate-300"
          >
            <div className="flex items-center gap-4 text-lg">
              <Mail className="text-emerald-400 h-6 w-6" />
              <a
                href="mailto:info@automiq.dev"
                className="hover:text-white transition"
              >
                info@automiq.dev
              </a>
            </div>

            <div className="flex items-center gap-4 text-lg">
              <Phone className="text-sky-400 h-6 w-6" />
              <a
                href="tel:+18297071293"
                className="hover:text-white transition"
              >
                +1 (829) 707-1293
              </a>
            </div>

            <div className="flex items-center gap-4 text-lg">
              <MessageSquare className="text-emerald-400 h-6 w-6" />
              <a
                href="https://wa.me/18297071293"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                WhatsApp directo
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
