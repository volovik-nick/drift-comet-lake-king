import type { ReactNode } from "react";
import { FunnelChart } from "@/components/bi/funnel-chart";
import { Delta, Eyebrow, Meter, Panel } from "@/components/bi/bits";
import { Button } from "@/components/ui/button";
import {
  DEALS,
  LAYERS,
  PRIOR_WON_REVENUE,
  funnelRows,
  managerRows,
  snapshot,
  sourceRows,
  worstStep,
} from "@/lib/bi/domain";
import { formatInt, formatMoney, formatPct } from "@/lib/format";
import { useBi } from "@/lib/bi/store";

export function Overview() {
  const openStageDrill = useBi((state) => state.openStageDrill);
  const openSourceDrill = useBi((state) => state.openSourceDrill);
  const openManagerDrill = useBi((state) => state.openManagerDrill);
  const openSignal = useBi((state) => state.openSignal);
  const setView = useBi((state) => state.setView);

  const stats = snapshot(DEALS);
  const drop = worstStep(DEALS);
  const funnel = funnelRows(DEALS);
  const sources = sourceRows(DEALS);
  const managers = managerRows(DEALS);
  const maxLeads = Math.max(...sources.map((row) => row.leads), 1);
  const revenueDelta = stats.wonRevenue - PRIOR_WON_REVENUE;
  const winDelta = stats.winRate - 0.074;

  return (
    <div className="grid gap-4">
      <Panel>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Сигнал месяца</Eyebrow>
            <h2 className="mt-1 font-display text-2xl text-ink md:text-3xl">
              {drop
                ? `Конверсия «${drop.short}» → следующий этап: ${formatPct(drop.conversion ?? 0)}`
                : "Воронка без резких провалов"}
            </h2>
            <p className="mt-2 text-muted">
              {drop
                ? `К сентябрю это ${formatPct(drop.prior ?? 0)} на том же переходе. Выручка при этом ${revenueDelta >= 0 ? "выше" : "ниже"}: закрываются крупные сделки, а середина воронки худеет.`
                : "Сравнение с сентябрём не показывает провала больше 15 пунктов."}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={() => drop && openStageDrill(drop.stage)}>Разобрать срез</Button>
            <Button variant="quiet" onClick={() => setView("risks")}>
              Список рисков
            </Button>
          </div>
        </div>
      </Panel>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          label="Выручка октября"
          value={formatMoney(stats.wonRevenue)}
          hint={<span className={revenueDelta >= 0 ? "text-sm text-good" : "text-sm text-bad"}>{formatRel(revenueDelta / PRIOR_WON_REVENUE)}</span>}
        />
        <Kpi
          label="Конверсия в сделку"
          value={formatPct(stats.winRate)}
          hint={<Delta value={winDelta} suffix="к сентябрю" />}
        />
        <Kpi
          label="Открытый пайплайн"
          value={formatMoney(stats.pipeline)}
          hint={<span className="text-sm text-muted">{formatInt(stats.openCount)} открытых</span>}
        />
        <Kpi
          label="Сделки с риском"
          value={formatInt(stats.riskDeals)}
          hint={
            <span className="text-sm text-bad">
              {formatInt(stats.stalled)} без движения · {formatInt(stats.fieldGaps)} с пустыми полями
            </span>
          }
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <Panel className="xl:col-span-3">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 className="font-display text-xl">Воронка</h2>
            <p className="text-sm text-muted">К сентябрю · нажмите этап</p>
          </div>
          <FunnelChart onPick={openStageDrill} />
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {funnel
              .filter((row) => row.conversion != null)
              .map((row) => (
                <li key={row.stage}>
                  <button
                    type="button"
                    className="press flex min-h-11 w-full items-center justify-between gap-3 rounded-sm px-2 text-left hover:bg-bg"
                    onClick={() => openStageDrill(row.stage)}
                  >
                    <span className="text-sm">
                      {row.short}
                      <span className="text-muted"> → дальше</span>
                    </span>
                    <span className="flex items-center gap-2 tabular-nums">
                      <span className="text-sm font-medium">{formatPct(row.conversion ?? 0)}</span>
                      <Delta value={row.delta} />
                    </span>
                  </button>
                </li>
              ))}
          </ul>
        </Panel>

        <Panel className="xl:col-span-2">
          <h2 className="font-display text-xl">Источники</h2>
          <p className="mt-1 text-sm text-muted">Лиды октября и доля успешных</p>
          <ul className="mt-4 grid gap-3">
            {sources.map((row) => (
              <li key={row.id}>
                <button
                  type="button"
                  className="press w-full rounded-sm text-left hover:bg-bg"
                  onClick={() => openSourceDrill(row.id)}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">{row.label}</span>
                    <span className="text-sm tabular-nums text-muted">
                      {formatInt(row.leads)} · {formatPct(row.winRate)}
                    </span>
                  </span>
                  <span className="mt-2 block">
                    <Meter value={(row.leads / maxLeads) * 100} />
                  </span>
                  {row.stalled > 0 ? (
                    <span className="mt-1 block text-sm text-bad">{formatInt(row.stalled)} зависли</span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display text-xl">Нагрузка менеджеров</h2>
          <p className="mt-1 text-sm text-muted">Открытые сделки и конверсия от лида</p>
          <ul className="mt-4 divide-y divide-line">
            {managers.map((row) => (
              <li key={row.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="press min-h-11 text-left"
                  onClick={() => openManagerDrill(row.id)}
                >
                  <span className="block font-medium">{row.name}</span>
                  <span className="text-sm text-muted">
                    {formatInt(row.open)} открытых · конверсия {formatPct(row.winRate)}
                  </span>
                </button>
                <span className="flex items-center gap-2">
                  {row.overloaded ? (
                    <button
                      type="button"
                      className="press min-h-11 rounded-sm bg-bad-bg px-3 text-sm text-bad"
                      onClick={() => openSignal("load")}
                    >
                      Перегруз
                    </button>
                  ) : (
                    <span className="text-sm tabular-nums text-muted">{formatMoney(row.pipeline)}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl">Как собраны цифры</h2>
              <p className="mt-1 text-sm text-muted">
                Не сводная таблица, а граф: сырые карточки Битрикс24 проходят четыре слоя.
              </p>
            </div>
            <Button variant="ghost" onClick={() => setView("model")}>
              Модель
            </Button>
          </div>
          <ol className="mt-4 grid gap-3">
            {LAYERS.map((layer, index) => (
              <li key={layer.id} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="font-mono text-sm text-subtle">0{index + 1}</span>
                <span>
                  <span className="block text-sm font-medium">{layer.title}</span>
                  <span className="block text-sm text-muted">{layer.result}</span>
                </span>
              </li>
            ))}
          </ol>
          <button
            type="button"
            className="press mt-4 min-h-11 text-sm font-medium text-accent"
            onClick={() => openSignal("conv")}
          >
            Почему система считает провал правилом, а не мнением
          </button>
        </Panel>
      </div>
    </div>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: ReactNode }) {
  return (
    <Panel>
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums tracking-tight">{value}</p>
      <div className="mt-2">{hint}</div>
    </Panel>
  );
}

function formatRel(ratio: number): string {
  const pct = Math.round(ratio * 100);
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct}% к сентябрю`;
}
