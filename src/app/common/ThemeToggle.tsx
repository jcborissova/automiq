/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme(); // mejor que theme
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = resolvedTheme === "light";
  return (
    <button
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      aria-label="Cambiar tema"
    >
      {isLight ? (
        <Moon className="h-5 w-5 text-slate-700" />
      ) : (
        <Sun className="h-5 w-5 text-amber-400" />
      )}
    </button>
  );
}
