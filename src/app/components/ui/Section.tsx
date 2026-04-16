import type { ReactNode } from "react";

type Tone = "default" | "muted" | "dark";

type SectionProps = {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

const tones: Record<Tone, string> = {
  default: "bg-[var(--surface)] text-[var(--ink-950)]",
  muted: "bg-[var(--background)] text-[var(--ink-950)]",
  dark: "bg-[var(--surface-inverse)] text-white",
};

export default function Section({
  id,
  tone = "default",
  className = "",
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={rest["aria-label"]}
      className={`relative scroll-mt-24 overflow-hidden py-14 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-[var(--ink-950)]";
  const descColor = tone === "dark" ? "text-slate-300" : "text-[var(--ink-500)]";
  const alignClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow}
      <h2
        className={`mt-3 text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] sm:mt-4 ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-[15px] leading-7 sm:mt-4 sm:text-base sm:leading-8 ${descColor}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
