import { Panel } from "@/components/bi/bits";
import { Button } from "@/components/ui/button";
import { RULES, type RuleId } from "@/lib/bi/domain";
import { useBi, type DecisionAction } from "@/lib/bi/store";

const ACTIONS: Record<DecisionAction, string> = {
  task: "Поставить задачу",
  reassign: "Передать сделку",
  qualify: "Вернуть в квалификацию",
  drop: "Снять с воронки",
};

export function Decisions() {
  const decisions = useBi((state) => state.decisions);
  const setView = useBi((state) => state.setView);

  return (
    <div className="grid gap-4">
      <Panel>
        <p className="text-sm text-muted">Что руководитель уже решил по сигналам</p>
        <h2 className="mt-1 font-display text-2xl">Журнал решений</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Записи остаются в этом браузере. Это контур принятия решения, не задача в Битрикс24.
        </p>
      </Panel>

      {decisions.length === 0 ? (
        <Panel>
          <p className="font-medium">Пока пусто</p>
          <p className="mt-2 text-muted">
            Откройте риск и зафиксируйте действие: задача менеджеру, передача сделки или снятие с воронки.
          </p>
          <Button className="mt-4" onClick={() => setView("risks")}>
            К рискам
          </Button>
        </Panel>
      ) : (
        <ul className="grid gap-3">
          {decisions.map((row) => {
            const rule = RULES[row.ruleId as RuleId];
            return (
              <li key={row.id}>
                <Panel>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium">{ACTIONS[row.action]}</p>
                      <p className="text-sm text-muted">{row.target}</p>
                    </div>
                    <p className="text-sm tabular-nums text-subtle">{formatStamp(row.at)}</p>
                  </div>
                  {rule ? <p className="mt-3 text-sm text-muted">{rule.name}</p> : null}
                  {row.comment ? <p className="mt-2">{row.comment}</p> : null}
                </Panel>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function formatStamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
