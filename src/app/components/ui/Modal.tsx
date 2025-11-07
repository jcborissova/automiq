/* eslint-disable react-hooks/set-state-in-effect */
/* components/ui/Modal.tsx */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Si quieres forzar fullscreen en móvil (opcional) */
  mobileFullscreen?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  mobileFullscreen = false, // ⬅️ por defecto NO fullscreen
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, onClose]);

  // Bloquear scroll del documento
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const prevOverscroll = html.style.overscrollBehavior;
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "contain";
    return () => {
      html.style.overflow = prevOverflow;
      html.style.overscrollBehavior = prevOverscroll;
    };
  }, [open]);

  if (!mounted) return null;

  const panelBase =
    "relative pointer-events-auto w-full max-w-xl mx-4 rounded-3xl " +
    "bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.15)] " +
    "border border-slate-200 dark:border-slate-700";

  // Variante altura:
  // - Por defecto: altura automática con límite máx. y scroll interno si hace falta
  // - Si alguien pasa mobileFullscreen=true, se usa el modo anterior
  const sizeClasses = mobileFullscreen
    ? "h-[92svh] max-h-[92svh] sm:h-auto sm:max-h-[85vh] overflow-y-auto"
    : "h-auto max-h-[85vh] overflow-y-auto"; // ⬅️ esta es la que querías

  const modalNode = (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title || "Diálogo"}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <button
            aria-hidden
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
            tabIndex={-1}
          />

          {/* Panel */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={`${panelBase} ${sizeClasses}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5 sm:mb-6">
              {title && (
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-white tracking-tight">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            {/* Body (solo scrollea si el contenido lo requiere) */}
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalNode, document.body);
}
