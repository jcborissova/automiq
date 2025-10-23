/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function ProjectModal({ project, onClose }: any) {
  // Bloquear scroll del fondo mientras el modal esté abierto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white"
            >
              <X size={20} />
            </button>

            {/* Video */}
            <div className="aspect-video bg-black">
              <iframe
                src={project.video}
                title={project.title}
                className="w-full h-full rounded-t-2xl"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Contenido */}
            <div className="p-8 text-left">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                {project.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                {project.category}
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                {project.description}
              </p>

              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
                Tecnologías utilizadas:
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
