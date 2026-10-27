import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatPp } from "@/lib/format";

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("rounded-2xl border border-line bg-elevated p-6", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted">{children}</p>;
}

export function Delta({ value, suffix }: { value: number | null; suffix?: string }) {
  if (value == null) return <span className="text-sm text-muted">—</span>;
  const up = value > 0.005;
  const down = value < -0.005;
  return (
    <span
      className={cn(
        "text-sm tabular-nums",
        up && "text-good",
        down && "text-bad",
        !up && !down && "text-muted",
      )}
    >
      {formatPp(value)}
      {suffix ? ` ${suffix}` : ""}
    </span>
  );
}

export function Chip({
  children,
  onRemove,
}: {
  children: ReactNode;
  onRemove?: () => void;
}) {
  return (
    <span className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-line bg-surface px-3 text-sm text-ink">
      {children}
      {onRemove ? (
        <button type="button" className="press text-muted" aria-label="Снять фильтр" onClick={onRemove}>
          <X className="size-4" />
        </button>
      ) : null}
    </span>
  );
}

export function Meter({ value }: { value: number }) {
  const width = Math.max(0, Math.min(100, value));
  return (
    <span className="block h-1.5 overflow-hidden rounded-sm bg-surface">
      <span className="block h-full bg-accent" style={{ width: `${width}%` }} />
    </span>
  );
}
