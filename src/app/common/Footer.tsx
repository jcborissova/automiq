export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:bg-slate-900/50 text-center py-8 mt-24">
      <p className="text-slate-700 dark:text-slate-200 font-semibold text-lg">
        AutomIQ
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Automation & Web Engineering
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
        © {new Date().getFullYear()} AutomIQ. Todos los derechos reservados.
      </p>
    </footer>
  );
}
