import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEALS,
  RULES,
  dealFacts,
  dealRisks,
  explainDeal,
  managerRows,
  sourceMeta,
  stageMeta,
  worstStep,
  type RuleId,
} from "@/lib/bi/domain";
import { formatMoney } from "@/lib/format";
import { useBi, type DecisionAction } from "@/lib/bi/store";

const ACTIONS: Array<{ id: DecisionAction; label: string }> = [
  { id: "task", label: "Поставить задачу" },
  { id: "reassign", label: "Передать сделку" },
  { id: "qualify", label: "Вернуть в квалификацию" },
  { id: "drop", label: "Снять с воронки" },
];

export function ExplainDialog() {
  const open = useBi((state) => state.explainOpen);
  const dealId = useBi((state) => state.dealId);
  const signal = useBi((state) => state.signal);
  const closeExplain = useBi((state) => state.closeExplain);
  const addDecision = useBi((state) => state.addDecision);
  const setView = useBi((state) => state.setView);

  const deal = DEALS.find((row) => row.id === dealId) ?? null;
  const [action, setAction] = useState<DecisionAction>("task");
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setAction("task");
    setComment("");
    setSaved(false);
  }, [dealId, signal, open]);

  const dealRule = deal ? (dealRisks(deal)[0]?.ruleId ?? null) : null;
  const ruleId: RuleId | "NOTE" | null = deal
    ? (dealRule ?? "NOTE")
    : signal === "load"
      ? "R-LOAD"
      : signal === "conv"
        ? "R-CONV"
        : null;
  const rule = ruleId && ruleId !== "NOTE" ? RULES[ruleId] : null;
  const drop = worstStep(DEALS);
  const loaded = managerRows(DEALS).find((row) => row.overloaded);

  const target =
    deal != null
      ? `${deal.id} · ${deal.company}`
      : signal === "load"
        ? (loaded?.name ?? "Нагрузка менеджера")
        : drop
          ? `Этап «${drop.short}»`
          : "Воронка";

  function save() {
    if (!ruleId) return;
    addDecision({
      action,
      comment: comment.trim(),
      target,
      ruleId,
    });
    setSaved(true);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && closeExplain()}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay-in fixed inset-0 z-40 bg-ink/40" />
        <Dialog.Content className="dialog-in fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-2xl border border-line bg-elevated p-6 text-ink focus:outline-none md:inset-y-4 md:right-4 md:left-auto md:w-[32rem] md:rounded-2xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="font-display text-2xl">
                {deal ? deal.company : signal === "load" ? "Перегруз менеджера" : "Провал конверсии"}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                {deal ? `${deal.id} · ${formatMoney(deal.amount)}` : "Правило на уровне отдела, не одной карточки"}
              </Dialog.Description>
            </div>
            <Dialog.Close className="press inline-flex size-11 items-center justify-center rounded-sm text-muted hover:bg-surface" aria-label="Закрыть">
              <X className="size-5" />
            </Dialog.Close>
          </div>

          {rule ? (
            <figure className="mt-5 border-l-2 border-accent pl-4">
              <figcaption className="font-mono text-sm text-subtle">
                {rule.name} · {ruleId}
              </figcaption>
              <blockquote className="mt-2 text-lg">{deal ? explainDeal(deal) : rule.plain}</blockquote>
            </figure>
          ) : (
            <p className="mt-5 text-muted">{deal ? explainDeal(deal) : "Нет активного правила."}</p>
          )}

          {deal ? (
            <>
              <ol className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                {[sourceMeta(deal.source).label, deal.id, stageMeta(deal.stage).short, ruleId ?? "Без правила"].map(
                  (item, index, list) => (
                    <li key={`${item}-${index}`} className="flex items-center gap-2">
                      <span className="rounded-sm border border-line bg-bg px-2 py-1">{item}</span>
                      {index < list.length - 1 ? <span className="text-subtle">→</span> : null}
                    </li>
                  ),
                )}
              </ol>
              <dl className="mt-5 grid gap-3">
                {dealFacts(deal).map((fact) => (
                  <div key={fact.label} className="grid gap-1 border-t border-line pt-3 sm:grid-cols-[11rem_1fr]">
                    <dt className="text-sm text-muted">{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </>
          ) : (
            <div className="mt-5 border-t border-line pt-4 text-muted">
              <p className="font-mono text-sm text-subtle">{rule?.axiom}</p>
              <p className="mt-3">{rule?.action}</p>
            </div>
          )}

          <form
            className="mt-6 grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              save();
            }}
          >
            <p className="text-sm font-medium">Решение</p>
            <div className="flex flex-wrap gap-2">
              {ACTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={
                    action === item.id
                      ? "press min-h-11 rounded-sm bg-accent px-3 text-sm text-accent-fg"
                      : "press min-h-11 rounded-sm border border-line bg-bg px-3 text-sm"
                  }
                  onClick={() => setAction(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="grid gap-2 text-sm">
              Комментарий
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={3}
                className="rounded-sm border border-line bg-bg px-3 py-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                placeholder="Что сделать на планёрке"
              />
            </label>
            {rule ? <p className="text-sm text-muted">{rule.action}</p> : null}
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={!ruleId || saved}>
                {saved ? "Записано" : "Зафиксировать"}
              </Button>
              {saved ? (
                <Button
                  variant="quiet"
                  onClick={() => {
                    closeExplain();
                    setView("decisions");
                  }}
                >
                  Открыть журнал
                </Button>
              ) : null}
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
