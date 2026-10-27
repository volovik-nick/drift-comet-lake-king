import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "quiet" | "ghost";

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type={type}
      className={cn(
        "press inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40",
        variant === "primary" && "bg-accent text-accent-fg hover:opacity-90",
        variant === "quiet" && "border border-line bg-elevated text-ink hover:bg-bg",
        variant === "ghost" && "bg-transparent text-ink hover:bg-surface",
        className,
      )}
      {...props}
    />
  );
}
