import { create } from "zustand";
import type { ManagerId, SourceId, StageId } from "@/lib/bi/domain";

export type ViewId = "overview" | "drill" | "risks" | "decisions" | "model";

export type DecisionAction = "task" | "reassign" | "qualify" | "drop";

export type Decision = {
  id: string;
  at: string;
  action: DecisionAction;
  comment: string;
  target: string;
  ruleId: string;
};

type State = {
  view: ViewId;
  stage: StageId | null;
  source: SourceId | null;
  manager: ManagerId | null;
  query: string;
  riskyOnly: boolean;
  dealId: string | null;
  signal: "load" | "conv" | null;
  explainOpen: boolean;
  decisions: Decision[];
  hydrated: boolean;
  setView: (view: ViewId) => void;
  setStage: (stage: StageId | null) => void;
  setSource: (source: SourceId | null) => void;
  setManager: (manager: ManagerId | null) => void;
  setQuery: (query: string) => void;
  setRiskyOnly: (value: boolean) => void;
  clearFilters: () => void;
  openDeal: (id: string) => void;
  openSignal: (signal: "load" | "conv") => void;
  closeExplain: () => void;
  openStageDrill: (stage: StageId) => void;
  openSourceDrill: (source: SourceId) => void;
  openManagerDrill: (manager: ManagerId) => void;
  addDecision: (decision: Omit<Decision, "id" | "at">) => void;
  hydrate: () => void;
};

const KEY = "axioma-decisions-v1";

function isDecision(value: unknown): value is Decision {
  if (!value || typeof value !== "object") return false;
  const row = value as Partial<Decision>;
  return (
    typeof row.id === "string" &&
    typeof row.at === "string" &&
    typeof row.action === "string" &&
    typeof row.comment === "string" &&
    typeof row.target === "string" &&
    typeof row.ruleId === "string"
  );
}

export const useBi = create<State>((set, get) => ({
  view: "overview",
  stage: null,
  source: null,
  manager: null,
  query: "",
  riskyOnly: false,
  dealId: null,
  signal: null,
  explainOpen: false,
  decisions: [],
  hydrated: false,
  setView: (view) => set({ view }),
  setStage: (stage) => set({ stage }),
  setSource: (source) => set({ source }),
  setManager: (manager) => set({ manager }),
  setQuery: (query) => set({ query }),
  setRiskyOnly: (riskyOnly) => set({ riskyOnly }),
  clearFilters: () => set({ stage: null, source: null, manager: null, query: "", riskyOnly: false }),
  openDeal: (id) => set({ dealId: id, signal: null, explainOpen: true }),
  openSignal: (signal: "load" | "conv") => set({ signal, dealId: null, explainOpen: true }),
  closeExplain: () => set({ explainOpen: false }),
  openStageDrill: (stage) => set({ view: "drill", stage, source: null, manager: null }),
  openSourceDrill: (source) => set({ view: "drill", source }),
  openManagerDrill: (manager) => set({ view: "drill", manager }),
  addDecision: (decision) => {
    const next: Decision = {
      ...decision,
      id: `D-${Date.now()}`,
      at: new Date().toISOString(),
    };
    const decisions = [next, ...get().decisions];
    set({ decisions });
    try {
      localStorage.setItem(KEY, JSON.stringify(decisions));
    } catch {
      /* ignore quota / private mode */
    }
  },
  hydrate: () => {
    if (get().hydrated) return;
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) {
        set({ hydrated: true });
        return;
      }
      const parsed: unknown = JSON.parse(raw);
      const decisions = Array.isArray(parsed) ? parsed.filter(isDecision) : [];
      set({ decisions, hydrated: true });
    } catch {
      set({ hydrated: true });
    }
  },
}));
