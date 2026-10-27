import { useEffect } from "react";
import {
  BookOpen,
  LayoutDashboard,
  NotebookPen,
  ShieldAlert,
  Waypoints,
} from "lucide-react";
import { Decisions } from "@/components/bi/decisions";
import { Drill } from "@/components/bi/drill";
import { ExplainDialog } from "@/components/bi/explain-dialog";
import { ModelView } from "@/components/bi/model-view";
import { Overview } from "@/components/bi/overview";
import { Risks } from "@/components/bi/risks";
import { cn } from "@/lib/cn";
import { PORTAL } from "@/lib/bi/domain";
import { useBi, type ViewId } from "@/lib/bi/store";

const NAV: Array<{ id: ViewId; label: string; icon: typeof LayoutDashboard }> = [
  { id: "overview", label: "Обзор", icon: LayoutDashboard },
  { id: "drill", label: "Детализация", icon: Waypoints },
  { id: "risks", label: "Риски", icon: ShieldAlert },
  { id: "decisions", label: "Решения", icon: NotebookPen },
  { id: "model", label: "Модель", icon: BookOpen },
];

const TITLES: Record<ViewId, string> = {
  overview: "Обзор отдела продаж",
  drill: "Детализация",
  risks: "Риски и объяснения",
  decisions: "Журнал решений",
  model: "Семантическая модель",
};

export function Shell() {
  const view = useBi((state) => state.view);
  const setView = useBi((state) => state.setView);
  const query = useBi((state) => state.query);
  const setQuery = useBi((state) => state.setQuery);
  const hydrate = useBi((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="min-h-screen bg-bg text-ink md:grid md:grid-cols-[15.5rem_minmax(0,1fr)]">
      <aside className="hidden border-r border-line bg-surface md:flex md:flex-col md:px-4 md:py-6">
        <Brand />
        <nav className="mt-8 grid gap-1" aria-label="Разделы">
          {NAV.map((item) => (
            <NavButton key={item.id} item={item} active={view === item.id} onClick={() => setView(item.id)} />
          ))}
        </nav>
        <p className="mt-auto pt-8 text-xs text-subtle">
          Демонстрационный контур {PORTAL.company}. Выгрузка Битрикс24, октябрь 2026.
        </p>
      </aside>

      <div className="min-w-0">
        <header className="border-b border-line px-4 py-4 md:px-8">
          <div className="flex items-center justify-between gap-3 md:hidden">
            <Brand />
            <p className="text-sm text-muted">Октябрь</p>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto md:hidden" aria-label="Разделы">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "press min-h-11 shrink-0 rounded-sm px-3 text-sm",
                  view === item.id ? "bg-accent text-accent-fg" : "bg-surface text-ink",
                )}
                onClick={() => setView(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3 md:mt-0 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="hidden text-sm text-muted md:block">
                {PORTAL.company} · Битрикс24 · октябрь 2026
              </p>
              <h1 className="font-display text-3xl tracking-tight">{TITLES[view]}</h1>
            </div>
            <label className="grid gap-1 text-sm text-muted">
              Найти сделку
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  if (event.target.value && view !== "drill") setView("drill");
                }}
                placeholder="Компания или номер"
                className="min-h-11 w-full rounded-sm border border-line bg-elevated px-3 text-ink md:w-64 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />
            </label>
          </div>
        </header>
        <main className="px-4 py-5 md:px-8 md:py-6">
          {view === "overview" ? <Overview /> : null}
          {view === "drill" ? <Drill /> : null}
          {view === "risks" ? <Risks /> : null}
          {view === "decisions" ? <Decisions /> : null}
          {view === "model" ? <ModelView /> : null}
        </main>
      </div>
      <ExplainDialog />
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex size-10 items-center justify-center rounded-sm bg-accent font-display text-lg text-accent-fg">
        А
      </span>
      <span>
        <span className="block font-display text-xl leading-none">Аксиома</span>
        <span className="mt-1 block text-xs text-muted">семантический слой</span>
      </span>
    </div>
  );
}

function NavButton({
  item,
  active,
  onClick,
}: {
  item: (typeof NAV)[number];
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      className={cn(
        "press flex min-h-11 items-center gap-3 rounded-sm px-3 text-left text-sm",
        active ? "bg-elevated text-ink" : "text-muted hover:bg-elevated hover:text-ink",
      )}
      onClick={onClick}
    >
      <Icon className="size-4" aria-hidden="true" />
      {item.label}
    </button>
  );
}
