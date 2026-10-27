import { Panel } from "@/components/bi/bits";
import { Button } from "@/components/ui/button";
import {
  DEALS,
  RULES,
  dealRisks,
  funnelRows,
  managerMeta,
  managerRows,
  sourceMeta,
  stageMeta,
} from "@/lib/bi/domain";
import { formatInt, formatMoney, formatPct } from "@/lib/format";
import { useBi } from "@/lib/bi/store";

export function Risks() {
  const openDeal = useBi((state) => state.openDeal);
  const openSignal = useBi((state) => state.openSignal);
  const openStageDrill = useBi((state) => state.openStageDrill);
  const openManagerDrill = useBi((state) => state.openManagerDrill);

  const stalled = DEALS.filter(
    (deal) => deal.outcome === "open" && dealRisks(deal).some((risk) => risk.ruleId === "R-ACT-14"),
  ).sort((a, b) => b.activityDays - a.activityDays || b.closeSlips - a.closeSlips);
  const gaps = DEALS.filter((deal) => deal.outcome === "open" && deal.missing.length > 0);
  const overloaded = managerRows(DEALS).filter((row) => row.overloaded);
  const drop = funnelRows(DEALS).find((row) => (row.delta ?? 0) <= -0.15);

  return (
    <div className="grid gap-4">
      <Panel>
        <p className="text-sm text-muted">Правила онтологии, а не ручная пометка</p>
        <h2 className="mt-1 font-display text-2xl">Где отдел теряет прогноз</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Каждый сигнал можно открыть и прочитать: какое правило сработало и на каких фактах. Решение фиксируется в журнале.
        </p>
      </Panel>

      {drop ? (
        <Panel>
          <p className="font-mono text-sm text-subtle">{RULES["R-CONV"].name} · R-CONV</p>
          <h3 className="mt-2 font-display text-xl">
            {drop.short}: {formatPct(drop.conversion ?? 0)} вместо {formatPct(drop.prior ?? 0)}
          </h3>
          <p className="mt-2 text-muted">{RULES["R-CONV"].plain}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => openSignal("conv")}>Почему так решено</Button>
            <Button variant="quiet" onClick={() => openStageDrill(drop.stage)}>
              Сделки этапа
            </Button>
          </div>
        </Panel>
      ) : null}

      {overloaded.map((row) => (
        <Panel key={row.id}>
          <p className="font-mono text-sm text-subtle">{RULES["R-LOAD"].name} · R-LOAD</p>
          <h3 className="mt-2 font-display text-xl">{row.name}</h3>
          <p className="mt-2 text-muted">
            {formatInt(row.open)} открытых сделок, конверсия {formatPct(row.winRate)}. {RULES["R-LOAD"].plain}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => openSignal("load")}>Почему так решено</Button>
            <Button variant="quiet" onClick={() => openManagerDrill(row.id)}>
              Сделки менеджера
            </Button>
          </div>
        </Panel>
      ))}

      <Panel>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl">Нет активности и срок переносили</h3>
          <span className="text-sm tabular-nums text-muted">{formatInt(stalled.length)}</span>
        </div>
        <ul className="mt-3 divide-y divide-line">
          {stalled.slice(0, 8).map((deal) => (
            <li key={deal.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{deal.company}</p>
                <p className="text-sm text-muted">
                  {deal.id} · {managerMeta(deal.manager).name} · {sourceMeta(deal.source).label} ·{" "}
                  {deal.activityDays} дн. без активности · перенос × {deal.closeSlips}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="tabular-nums text-sm">{formatMoney(deal.amount)}</span>
                <Button variant="quiet" onClick={() => openDeal(deal.id)}>
                  Почему
                </Button>
              </div>
            </li>
          ))}
        </ul>
        {stalled.length > 8 ? (
          <p className="mt-2 text-sm text-muted">В списке первые 8. Остальные — в детализации, фильтр «Только с риском».</p>
        ) : null}
      </Panel>

      <Panel>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl">Пустые обязательные поля</h3>
          <span className="text-sm tabular-nums text-muted">{formatInt(gaps.length)}</span>
        </div>
        <ul className="mt-3 divide-y divide-line">
          {gaps.slice(0, 6).map((deal) => (
            <li key={deal.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{deal.company}</p>
                <p className="text-sm text-muted">
                  {stageMeta(deal.stage).short} · не заполнено: {deal.missing.join(", ")}
                </p>
              </div>
              <Button variant="quiet" onClick={() => openDeal(deal.id)}>
                Почему
              </Button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
