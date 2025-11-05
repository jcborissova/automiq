/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // resolvedTheme es la verdad cuando theme === "system"
  const current = theme === "system" ? (resolvedTheme ?? systemTheme) : theme;
  const isLight = current !== "dark";

  const handleClick = () => {
    const next = isLight ? "dark" : "light";
    setTheme(next);
    // DEBUG: mira la clase en <html> inmediatamente
    setTimeout(() => {
      // Debe mostrar 'dark' o '' según el cambio
      // eslint-disable-next-line no-console
      console.log("html.className =>", document.documentElement.className);
    }, 0);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Cambiar tema"
      aria-pressed={!isLight}
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
    >
      {isLight ? (
        <Moon className="h-5 w-5 text-slate-700" />
      ) : (
        <Sun className="h-5 w-5 text-amber-400" />
      )}
    </button>
  );
}
