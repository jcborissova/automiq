/* eslint-disable @next/next/no-img-element */
import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-slate-200 bg-gradient-to-b from-white via-white to-slate-50">
      {/* Cinta superior: mini CTA */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-[15px] font-semibold text-slate-900">
              ¿Listo para automatizar y escalar?
            </h3>
            <p className="text-[13.5px] text-slate-600">
              Conversemos y planifiquemos tu siguiente iteración con impacto real.
            </p>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:opacity-95 transition"
          >
            Agendar una reunión
          </a>
        </div>
      </div>

      {/* Separador sutil */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Columna 1: Marca */}
          <div className="md:col-span-4">
            <div className="inline-flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">
                AutomIQ
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Automation & Web Engineering — soluciones modernas que convierten ideas en resultados
              medibles, con foco en eficiencia y escalabilidad.
            </p>

            {/* Redes */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 transition"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/18297071293"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 transition"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <nav className="md:col-span-4">
            <h4 className="text-sm font-semibold text-slate-900">Navegación</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#servicios" className="text-slate-600 hover:text-slate-900 transition">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#casos" className="text-slate-600 hover:text-slate-900 transition">
                  Casos de Éxito
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-slate-600 hover:text-slate-900 transition">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-slate-900 transition">
                  Volver arriba
                </a>
              </li>
            </ul>
          </nav>

          {/* Columna 3: Contacto */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold text-slate-900">Contacto</h4>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                  <Mail className="h-4 w-4" />
                </span>
                <a href="mailto:info@automiq.dev" className="text-slate-700 hover:text-slate-900 transition">
                  info@automiq.dev
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-200">
                  <Phone className="h-4 w-4" />
                </span>
                <a href="tel:+18297071293" className="text-slate-700 hover:text-slate-900 transition">
                  +1 (829) 707-1293
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-slate-700">Santo Domingo, República Dominicana</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Legal */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {year} AutomIQ. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-500">
            Hecho con <span aria-hidden>💚</span> en RD —{" "}
            <a href="#contacto" className="underline decoration-emerald-300/70 hover:text-slate-700">
              conversemos
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
