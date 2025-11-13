/* eslint-disable @next/next/no-img-element */
"use client";

import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const LINKEDIN_URL = "https://www.linkedin.com/"; // TODO: reemplazar por tu perfil
  const INSTAGRAM_URL = "https://www.instagram.com/"; // TODO: reemplazar por tu cuenta

  return (
    <footer
      className="relative border-t border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-slate-100 
                 dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950"
    >
      {/* Fondo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-50"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_0%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(900px_500px_at_100%_0%,rgba(16,185,129,0.10),transparent_60%)]" />
      </div>

      {/* Cinta superior */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row sm:gap-6">
          <div className="text-center sm:text-left max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600/90 dark:text-emerald-400/90">
              Próximo paso
            </p>
            <h3 className="mt-1 text-[15px] md:text-[17px] font-semibold text-slate-900 dark:text-white">
              ¿Listo para llevar tu producto digital al siguiente nivel?
            </h3>
            <p className="mt-1 text-[13.5px] text-slate-600 dark:text-slate-300">
              Revisamos tu stack, procesos y oportunidades de automatización para diseñar un plan
              claro, medible y accionable.
            </p>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-white dark:text-slate-900 dark:ring-white/10 dark:hover:bg-white/90"
          >
            Agenda una llamada
          </a>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-slate-700" />

      {/* Contenido principal */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Marca */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="inline-flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                AutomIQ
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Automation &amp; Web Engineering. Diseñamos y construimos productos digitales y
              automatizaciones que conectan tus sistemas y escalan con tu negocio.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-400"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-400"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <nav
            className="md:col-span-3 lg:col-span-4"
            aria-label="Navegación secundaria"
          >
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Navegación
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="#servicios"
                  className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#casos"
                  className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Casos de éxito
                </a>
              </li>
              <li>
                <a
                  href="#clientes"
                  className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Clientes
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="#__main"
                  className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Volver arriba
                </a>
              </li>
            </ul>
          </nav>

          {/* Contacto */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Contacto directo
            </h4>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
                  <Mail className="h-4 w-4" />
                </span>
                <a
                  href="mailto:info@automiq.dev"
                  className="text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  info@automiq.dev
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30">
                  <Phone className="h-4 w-4" />
                </span>
                <a
                  href="tel:+18297071293"
                  aria-label="Llamar a AutomIQ"
                  className="text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  +1 (829) 707-1293
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  Santo Domingo, República Dominicana
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

        {/* Copyright / meta */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-xs text-slate-500 sm:flex-row">
          <p className="dark:text-slate-400">
            © {year} AutomIQ. Todos los derechos reservados.
          </p>
          <p className="dark:text-slate-400">
            Hecho con <span aria-hidden>💚</span> en RD —{" "}
            <a
              href="#contacto"
              className="underline decoration-emerald-300/70 underline-offset-2 hover:text-slate-700 dark:hover:text-slate-200"
            >
              conversemos
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
