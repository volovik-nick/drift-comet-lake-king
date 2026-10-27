import { useEffect, useMemo, useState } from "react";
import { Chip, Panel } from "@/components/bi/bits";
import { Button } from "@/components/ui/button";
import {
  DEALS,
  applyFilters,
  dealRisks,
  managerMeta,
  outcomeLabel,
  riskWeight,
  sourceMeta,
  stageMeta,
  type Deal,
} from "@/lib/bi/domain";
import { formatDay, formatMoney, plural } from "@/lib/format";
import { useBi } from "@/lib/bi/store";

const PAGE = 8;

export function Drill() {
  const stage = useBi((state) => state.stage);
  const source = useBi((state) => state.source);
  const manager = useBi((state) => state.manager);
  const query = useBi((state) => state.query);
  const riskyOnly = useBi((state) => state.riskyOnly);
  const setStage = useBi((state) => state.setStage);
  const setSource = useBi((state) => state.setSource);
  const setManager = useBi((state) => state.setManager);
  const setRiskyOnly = useBi((state) => state.setRiskyOnly);
  const clearFilters = useBi((state) => state.clearFilters);
  const openDeal = useBi((state) => state.openDeal);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [stage, source, manager, query, riskyOnly]);

  const rows = useMemo(() => {
    return applyFilters(DEALS, { stage, source, manager, query, riskyOnly })
      .slice()
      .sort((a, b) => riskWeight(b) - riskWeight(a) || b.amount - a.amount);
  }, [stage, source, manager, query, riskyOnly]);

  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const safePage = Math.min(page, pages - 1);
  const slice = rows.slice(safePage * PAGE, safePage * PAGE + PAGE);
  const filtered = Boolean(stage || source || manager || query || riskyOnly);

  return (
    <div className="grid gap-4">
      <Panel>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-muted">От общей цифры к сделке</p>
            <h2 className="mt-1 font-display text-2xl">
              {rows.length === 0
                ? "В срезе пусто"
                : `${rows.length} ${plural(rows.length, "сделка", "сделки", "сделок")} в срезе`}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={riskyOnly ? "primary" : "quiet"}
              onClick={() => setRiskyOnly(!riskyOnly)}
            >
              Только с риском
            </Button>
            {filtered ? (
              <Button variant="ghost" onClick={clearFilters}>
                Сбросить
              </Button>
            ) : null}
          </div>
        </div>
        {filtered ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {stage ? <Chip onRemove={() => setStage(null)}>{stageMeta(stage).label}</Chip> : null}
            {source ? <Chip onRemove={() => setSource(null)}>{sourceMeta(source).label}</Chip> : null}
            {manager ? <Chip onRemove={() => setManager(null)}>{managerMeta(manager).name}</Chip> : null}
            {query ? <Chip>Поиск: {query}</Chip> : null}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Фильтр не выбран — показаны все лиды и сделки октября. На обзоре можно сузить воронку, источник или менеджера.
          </p>
        )}
      </Panel>

      {slice.length === 0 ? (
        <Panel>
          <p className="text-muted">В этом срезе нет сделок. Снимите один из фильтров.</p>
        </Panel>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-line bg-elevated md:block">
            <table className="w-full text-left text-sm">
              <thead className="text-muted">
                <tr className="border-b border-line">
                  <th className="px-4 py-3 font-medium">Сделка</th>
                  <th className="px-4 py-3 font-medium">Этап</th>
                  <th className="px-4 py-3 font-medium">Источник</th>
                  <th className="px-4 py-3 font-medium">Менеджер</th>
                  <th className="px-4 py-3 font-medium">Активность</th>
                  <th className="px-4 py-3 text-right font-medium">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((deal) => (
                  <tr key={deal.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3">
                      <button type="button" className="press text-left" onClick={() => openDeal(deal.id)}>
                        <span className="block font-medium">{deal.company}</span>
                        <span className="text-muted">
                          {deal.id} · {deal.title}
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <StageButton deal={deal} />
                    </td>
                    <td className="px-4 py-3">
                      <button type="button" className="press min-h-11" onClick={() => setSource(deal.source)}>
                        {sourceMeta(deal.source).label}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button type="button" className="press min-h-11" onClick={() => setManager(deal.manager)}>
                        {managerMeta(deal.manager).name}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <Activity deal={deal} />
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatMoney(deal.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="grid gap-3 md:hidden">
            {slice.map((deal) => (
              <li key={deal.id}>
                <button
                  type="button"
                  className="press w-full rounded-2xl border border-line bg-elevated p-4 text-left"
                  onClick={() => openDeal(deal.id)}
                >
                  <span className="block font-medium">{deal.company}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {deal.id} · {stageMeta(deal.stage).short} · {sourceMeta(deal.source).label}
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-3">
                    <Activity deal={deal} />
                    <span className="tabular-nums">{formatMoney(deal.amount)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {rows.length > PAGE ? (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {safePage + 1} из {pages}
          </p>
          <div className="flex gap-2">
            <Button variant="quiet" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>
              Назад
            </Button>
            <Button
              variant="quiet"
              disabled={safePage >= pages - 1}
              onClick={() => setPage(safePage + 1)}
            >
              Дальше
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StageButton({ deal }: { deal: Deal }) {
  const setStage = useBi((state) => state.setStage);
  const risks = dealRisks(deal);
  return (
    <button type="button" className="press min-h-11 text-left" onClick={() => setStage(deal.stage)}>
      <span className="block">{stageMeta(deal.stage).short}</span>
      <span className={risks.length ? "text-bad" : "text-muted"}>
        {risks.length ? "Есть риск" : outcomeLabel(deal.outcome)}
      </span>
    </button>
  );
}

function Activity({ deal }: { deal: Deal }) {
  const stale = deal.outcome === "open" && deal.activityDays >= 14;
  return (
    <span className={stale ? "text-sm text-bad" : "text-sm text-muted"}>
      {formatDay(deal.lastActivity)}
      {deal.outcome === "open" ? ` · ${deal.activityDays} дн.` : ""}
    </span>
  );
}
