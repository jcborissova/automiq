import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

type ButtonOwnProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  full?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 " +
  "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 " +
  "active:translate-y-[1px] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-white shadow-[var(--shadow-accent)] hover:bg-[var(--accent-hover)] hover:shadow-[0_24px_48px_-18px_rgba(249,115,22,0.55)]",
  secondary:
    "bg-[var(--ink-950,#020617)] text-white hover:bg-[var(--ink-900,#0f172a)] shadow-[var(--shadow-md)]",
  ghost:
    "border border-[var(--border)] bg-[var(--surface)] text-[var(--ink-950)] hover:bg-[var(--surface-raised)] hover:border-[var(--border-strong)]",
  inverse:
    "border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/18 hover:border-white/30",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

export default function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  full = false,
  children,
  className = "",
  ...rest
}: ButtonProps<T>) {
  const Component = (as ?? "button") as ElementType;
  const classes = [
    base,
    variants[variant],
    sizes[size],
    full ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...rest}>
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </Component>
  );
}
