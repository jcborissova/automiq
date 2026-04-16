/* eslint-disable react-hooks/set-state-in-effect */
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
  mobileFullscreen?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  mobileFullscreen = false,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, onClose]);

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
    "relative pointer-events-auto w-full max-w-xl mx-4 rounded-xl " +
    "bg-[var(--surface)] p-5 sm:p-7 shadow-[var(--shadow-xl)] " +
    "border border-[var(--border)]";

  const sizeClasses = mobileFullscreen
    ? "h-[92svh] max-h-[92svh] sm:h-auto sm:max-h-[85vh] overflow-y-auto"
    : "h-auto max-h-[88vh] overflow-y-auto";

  const modalNode = (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title || "Dialog"}
          className="fixed inset-0 z-[9999] flex items-center justify-center px-2 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-hidden
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            tabIndex={-1}
          />

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className={`${panelBase} ${sizeClasses}`}
          >
            <div className="mb-4 flex items-start justify-between gap-4 sm:mb-5">
              {title && (
                <h2 className="text-lg font-semibold tracking-tight text-[var(--ink-950)] sm:text-xl">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--ink-500)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)] hover:text-[var(--ink-950)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalNode, document.body);
}
