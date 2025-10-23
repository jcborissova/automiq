/* eslint-disable react-hooks/purity */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import Modal from "../components/ui/Modal";
import DemoForm from "../components/DemoForm";
import RobotAnimation from "../components/ui/RobotAnimation";

export default function Hero() {
  const scrollTo = useSmoothScroll();
  const [openDemo, setOpenDemo] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950">
      {/* 🎥 Fondo cinematográfico */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=2000&q=80"
          alt="Fondo tecnológico"
          className="absolute inset-0 w-full h-full object-cover opacity-25 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/85 to-emerald-900/60" />
      </div>

      {/* 🌌 Halo energético suave (sin flicker) */}
      <motion.div
        className="absolute top-1/3 w-[550px] h-[550px] md:w-[700px] md:h-[700px] rounded-full blur-3xl bg-gradient-to-tr from-sky-500/25 to-emerald-500/25"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* 🤖 Robot central */}
      <motion.div
        className="relative z-[5] mb-10 scale-125 md:scale-[1.6]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="drop-shadow-[0_0_45px_rgba(45,255,196,0.25)]">
          <RobotAnimation />
        </div>
      </motion.div>

      {/* 🧠 Texto principal */}
      <motion.h1
        className="relative z-10 text-4xl md:text-6xl font-extrabold text-center text-white leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <span className="block">Automatiza. Escala.</span>
        <motion.span
          className="block text-transparent bg-clip-text bg-gradient-to-tr from-sky-400 via-emerald-400 to-sky-300"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        >
          Crece con Inteligencia
        </motion.span>
      </motion.h1>

      {/* 💬 Descripción */}
      <motion.p
        className="relative z-10 mt-6 text-lg md:text-xl text-slate-300 leading-relaxed text-center max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        En <span className="font-semibold text-white">AutomIQ</span> combinamos{" "}
        <span className="text-emerald-400">RPA</span>,{" "}
        <span className="text-sky-400">IA</span> y{" "}
        desarrollo web moderno para transformar procesos y reducir costos.
      </motion.p>

      {/* 🔘 Botones */}
      <motion.div
        className="relative z-10 mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
      >
        <button
          onClick={() => setOpenDemo(true)}
          className="inline-flex rounded-full px-10 py-3 text-base font-semibold text-white 
                     bg-gradient-to-tr from-emerald-500 to-sky-500 shadow-lg 
                     hover:shadow-emerald-400/30 hover:opacity-95 transition-all duration-300"
        >
          Solicitar demo gratuita
        </button>
        <button
          onClick={() => scrollTo("#servicios")}
          className="inline-flex rounded-full px-10 py-3 text-base font-semibold 
                     border border-slate-300/40 text-slate-200 
                     hover:bg-slate-800/40 transition-all duration-300"
        >
          Ver servicios
        </button>
      </motion.div>

      {/* 🧩 Modal */}
      <Modal
        open={openDemo}
        onClose={() => setOpenDemo(false)}
        title="Solicitar demo gratuita"
      >
        <DemoForm />
      </Modal>
    </section>
  );
}
