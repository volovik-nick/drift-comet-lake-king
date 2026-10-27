import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DEALS, funnelRows, type FunnelRow, type StageId } from "@/lib/bi/domain";
import { formatInt, formatPct } from "@/lib/format";

function tone(row: FunnelRow): string {
  if (row.stage === "won") return "var(--color-good)";
  if ((row.delta ?? 0) <= -0.15) return "var(--color-bad)";
  return "var(--color-accent)";
}

function Tip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: FunnelRow }>;
}) {
  if (!active || !payload?.[0]) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-sm border border-line bg-elevated px-3 py-2 text-sm text-ink">
      <p className="font-medium">{row.label}</p>
      <p className="tabular-nums text-muted">Дошли: {formatInt(row.reached)}</p>
      {row.conversion != null ? (
        <p className="tabular-nums text-muted">
          Дальше {formatPct(row.conversion)}
          {row.prior != null ? ` · сентябрь ${formatPct(row.prior)}` : ""}
        </p>
      ) : null}
    </div>
  );
}

function readStage(entry: unknown): StageId | null {
  if (!entry || typeof entry !== "object") return null;
  const row = entry as { stage?: StageId; payload?: { stage?: StageId } };
  return row.payload?.stage ?? row.stage ?? null;
}

export function FunnelChart({ onPick }: { onPick: (stage: StageId) => void }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const data = funnelRows(DEALS);

  if (!ready) {
    return (
      <ul className="grid gap-2">
        {data.map((row) => (
          <li key={row.stage} className="flex items-center justify-between text-sm">
            <span>{row.short}</span>
            <span className="tabular-nums text-muted">{formatInt(row.reached)}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="h-72 w-full min-w-0" role="img" aria-label="Воронка продаж за октябрь">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="short"
            width={112}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-muted)", fontSize: 12 }}
          />
          <Tooltip content={<Tip />} cursor={{ fill: "var(--color-surface)" }} />
          <Bar
            dataKey="reached"
            radius={[0, 4, 4, 0]}
            cursor="pointer"
            onClick={(entry) => {
              const stage = readStage(entry);
              if (stage) onPick(stage);
            }}
          >
            {data.map((row) => (
              <Cell key={row.stage} fill={tone(row)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
