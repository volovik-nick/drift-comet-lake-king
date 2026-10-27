import { Panel } from "@/components/bi/bits";
import { LAYERS, PORTAL, RULES, snapshot, DEALS } from "@/lib/bi/domain";
import { formatInt } from "@/lib/format";

export function ModelView() {
  const stats = snapshot(DEALS);
  return (
    <div className="grid gap-4">
      <Panel>
        <p className="text-sm text-muted">Подключение</p>
        <h2 className="mt-1 font-display text-2xl">Битрикс24 · {PORTAL.host}</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Портал {PORTAL.company} отдаёт лиды, сделки и активности через REST. Платформа не правит карточки: она
          забирает сырьё, связывает его в граф и накладывает правила отдела.
        </p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Синхронизация" value={PORTAL.syncedAt} />
          <Stat label="Лиды октября" value={formatInt(stats.leads)} />
          <Stat label="Сырые файлы" value={formatInt(PORTAL.rawFiles)} />
          <Stat label="Противоречия" value={String(PORTAL.contradictions)} />
        </dl>
      </Panel>

      <ol className="grid gap-3">
        {LAYERS.map((layer, index) => (
          <li key={layer.id}>
            <Panel>
              <div className="grid gap-3 md:grid-cols-[8rem_1fr_1fr]">
                <p className="font-mono text-sm text-subtle">
                  0{index + 1} · {layer.id}
                </p>
                <div>
                  <h3 className="font-display text-xl">{layer.title}</h3>
                  <p className="mt-1 text-sm text-muted">{layer.stack}</p>
                  <p className="mt-3">{layer.happens}</p>
                </div>
                <p className="text-muted md:border-l md:border-line md:pl-6">{layer.result}</p>
              </div>
            </Panel>
          </li>
        ))}
      </ol>

      <Panel>
        <h2 className="font-display text-xl">Правила, которые видит руководитель</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Вывод не прячется в модели. У каждого сигнала есть имя правила и формальная запись — её можно сверить с
          фактами сделки.
        </p>
        <ul className="mt-4 grid gap-4">
          {(Object.keys(RULES) as Array<keyof typeof RULES>).map((id) => (
            <li key={id} className="border-t border-line pt-4">
              <p className="font-medium">
                {RULES[id].name} <span className="font-mono text-sm text-subtle">{id}</span>
              </p>
              <p className="mt-1 text-muted">{RULES[id].plain}</p>
              <p className="mt-2 font-mono text-sm text-subtle">{RULES[id].axiom}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">
          Выведено фактов: {formatInt(PORTAL.inferred)}. Базовых триплетов: {formatInt(PORTAL.triples)}. Проверка
          согласованности пройдена.
        </p>
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 font-medium tabular-nums">{value}</dd>
    </div>
  );
}
