import type { ReactNode } from "react";

type Tone = "light" | "dark";

type EyebrowProps = {
  children: ReactNode;
  icon?: ReactNode;
  tone?: Tone;
  className?: string;
};

const toneStyles: Record<Tone, string> = {
  light:
    "border-[var(--border)] bg-[var(--surface)] text-[var(--support)] shadow-[var(--shadow-xs)]",
  dark: "border-white/15 bg-white/10 text-cyan-200 backdrop-blur",
};

export default function Eyebrow({
  children,
  icon,
  tone = "light",
  className = "",
}: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] sm:px-3 sm:text-[11px] ${toneStyles[tone]} ${className}`}
    >
      {icon ? <span className="shrink-0 opacity-80">{icon}</span> : null}
      <span>{children}</span>
    </span>
  );
}
