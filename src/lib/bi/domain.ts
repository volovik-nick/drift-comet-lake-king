import { formatDay, formatPp, plural } from "@/lib/format";

export const STAGE_ORDER = [
  "new",
  "qual",
  "need",
  "proposal",
  "nego",
  "contract",
  "won",
] as const;

export type StageId = (typeof STAGE_ORDER)[number];
export type SourceId = "direct" | "site" | "referral" | "expo" | "partner";
export type ManagerId = "sokolova" | "lebedev" | "orlov" | "kim";
export type Outcome = "open" | "won" | "lost";
export type RuleId = "R-ACT-14" | "R-FIELD" | "R-LOAD" | "R-CONV";
export type Severity = "high" | "medium" | "low";

export type StageMeta = { id: StageId; label: string; short: string };
export type SourceMeta = { id: SourceId; label: string };
export type ManagerMeta = { id: ManagerId; name: string; role: string };

export const STAGES: StageMeta[] = [
  { id: "new", label: "Новый лид", short: "Лид" },
  { id: "qual", label: "Квалификация", short: "Квалификация" },
  { id: "need", label: "Потребность", short: "Потребность" },
  { id: "proposal", label: "Коммерческое предложение", short: "КП" },
  { id: "nego", label: "Переговоры", short: "Переговоры" },
  { id: "contract", label: "Договор", short: "Договор" },
  { id: "won", label: "Успешно реализовано", short: "Успешно" },
];

export const SOURCES: SourceMeta[] = [
  { id: "direct", label: "Яндекс Директ" },
  { id: "site", label: "Сайт" },
  { id: "referral", label: "Рекомендации" },
  { id: "expo", label: "Металл-Экспо" },
  { id: "partner", label: "Партнёры" },
];

export const MANAGERS: ManagerMeta[] = [
  { id: "sokolova", name: "Соколова А. В.", role: "Менеджер" },
  { id: "lebedev", name: "Лебедев И. П.", role: "Менеджер" },
  { id: "orlov", name: "Орлов П. С.", role: "Старший менеджер" },
  { id: "kim", name: "Ким Е. А.", role: "Менеджер" },
];

/** Step conversion in September, aligned to STAGE_ORDER transitions. */
export const PRIOR_STEP = [0.79, 0.71, 0.74, 0.62, 0.64, 0.66];

export const PRIOR_WON_REVENUE = 41_200_000;
export const PRIOR_WIN_RATE = 0.074;

export const RULES: Record<
  RuleId,
  { name: string; axiom: string; plain: string; action: string }
> = {
  "R-ACT-14": {
    name: "Застой сделки",
    axiom: "StalledDeal ≡ OpenDeal ⊓ activityAgeDays ≥ 14 ⊓ closeDateSlips ≥ 2",
    plain:
      "Сделка отмечена как рискованная: давно не было активности, а плановая дата закрытия неоднократно переносилась.",
    action: "Назначить контакт в течение 48 часов или снять сделку с активного прогноза.",
  },
  "R-FIELD": {
    name: "Пустые обязательные поля",
    axiom: "IncompleteDeal ≡ OpenDeal ⊓ ∃ requiredField.Empty",
    plain:
      "Карточка не проходит контроль качества: не заполнено обязательное поле, без которого сделка не должна менять этап.",
    action: "Вернуть карточку ответственному и не двигать этап, пока поле не заполнено.",
  },
  "R-LOAD": {
    name: "Перегруз менеджера",
    axiom: "OverloadedManager ≡ Manager ⊓ openDeals ≥ 25 ⊓ winRate < 0.04",
    plain:
      "Нагрузка менеджера выше порога отдела, а конверсия в успешную сделку заметно ниже остальных.",
    action: "Передать часть сделок на этапе КП менеджерам с запасом по нагрузке.",
  },
  "R-CONV": {
    name: "Провал конверсии этапа",
    axiom: "StageDrop ≡ stepConversion + 0.15 < priorPeriod.stepConversion",
    plain:
      "Конверсия этапа просела больше чем на 15 пунктов к прошлому месяцу. Это не шум выборки, а сигнал на разбор.",
    action: "Разобрать срез по источникам и менеджерам, начиная с этапа, где оборвалась воронка.",
  },
};

export type Deal = {
  id: string;
  title: string;
  company: string;
  amount: number;
  stage: StageId;
  source: SourceId;
  manager: ManagerId;
  outcome: Outcome;
  created: string;
  closePlan: string;
  closeSlips: number;
  slipPath: string[];
  lastActivity: string;
  activityDays: number;
  missing: string[];
};

export type DealRisk = {
  ruleId: "R-ACT-14" | "R-FIELD";
  severity: Severity;
};

type Kind = "stale" | "gap" | "healthy" | "won" | "lost";

type Batch = {
  stage: StageId;
  source: SourceId;
  manager: ManagerId;
  count: number;
  kind: Kind;
};

const BATCHES: Batch[] = [
  { stage: "proposal", source: "direct", manager: "sokolova", count: 16, kind: "stale" },
  { stage: "proposal", source: "direct", manager: "lebedev", count: 8, kind: "stale" },
  { stage: "proposal", source: "direct", manager: "orlov", count: 4, kind: "healthy" },
  { stage: "nego", source: "direct", manager: "kim", count: 1, kind: "healthy" },
  { stage: "won", source: "direct", manager: "kim", count: 1, kind: "won" },
  { stage: "need", source: "direct", manager: "sokolova", count: 5, kind: "healthy" },
  { stage: "need", source: "direct", manager: "lebedev", count: 4, kind: "healthy" },
  { stage: "need", source: "direct", manager: "orlov", count: 3, kind: "gap" },
  { stage: "qual", source: "direct", manager: "sokolova", count: 6, kind: "lost" },
  { stage: "qual", source: "direct", manager: "lebedev", count: 4, kind: "lost" },
  { stage: "qual", source: "direct", manager: "kim", count: 4, kind: "lost" },
  { stage: "new", source: "direct", manager: "orlov", count: 4, kind: "lost" },
  { stage: "new", source: "direct", manager: "kim", count: 4, kind: "lost" },

  { stage: "proposal", source: "site", manager: "sokolova", count: 4, kind: "stale" },
  { stage: "proposal", source: "site", manager: "kim", count: 2, kind: "gap" },
  { stage: "won", source: "site", manager: "lebedev", count: 2, kind: "won" },
  { stage: "won", source: "site", manager: "kim", count: 1, kind: "won" },
  { stage: "contract", source: "site", manager: "lebedev", count: 1, kind: "healthy" },
  { stage: "contract", source: "site", manager: "orlov", count: 1, kind: "healthy" },
  { stage: "nego", source: "site", manager: "sokolova", count: 1, kind: "healthy" },
  { stage: "nego", source: "site", manager: "lebedev", count: 1, kind: "healthy" },
  { stage: "nego", source: "site", manager: "kim", count: 1, kind: "healthy" },
  { stage: "need", source: "site", manager: "lebedev", count: 2, kind: "healthy" },
  { stage: "need", source: "site", manager: "orlov", count: 2, kind: "gap" },
  { stage: "need", source: "site", manager: "kim", count: 2, kind: "healthy" },
  { stage: "qual", source: "site", manager: "sokolova", count: 3, kind: "lost" },
  { stage: "qual", source: "site", manager: "lebedev", count: 3, kind: "lost" },
  { stage: "qual", source: "site", manager: "orlov", count: 2, kind: "lost" },
  { stage: "qual", source: "site", manager: "kim", count: 2, kind: "lost" },
  { stage: "new", source: "site", manager: "sokolova", count: 3, kind: "lost" },
  { stage: "new", source: "site", manager: "lebedev", count: 3, kind: "lost" },
  { stage: "new", source: "site", manager: "orlov", count: 3, kind: "lost" },
  { stage: "new", source: "site", manager: "kim", count: 2, kind: "lost" },

  { stage: "proposal", source: "referral", manager: "kim", count: 2, kind: "gap" },
  { stage: "won", source: "referral", manager: "kim", count: 2, kind: "won" },
  { stage: "won", source: "referral", manager: "orlov", count: 2, kind: "won" },
  { stage: "contract", source: "referral", manager: "kim", count: 1, kind: "healthy" },
  { stage: "contract", source: "referral", manager: "orlov", count: 1, kind: "healthy" },
  { stage: "nego", source: "referral", manager: "kim", count: 1, kind: "healthy" },
  { stage: "nego", source: "referral", manager: "orlov", count: 1, kind: "healthy" },
  { stage: "nego", source: "referral", manager: "lebedev", count: 1, kind: "healthy" },
  { stage: "need", source: "referral", manager: "orlov", count: 1, kind: "healthy" },
  { stage: "need", source: "referral", manager: "lebedev", count: 1, kind: "healthy" },
  { stage: "qual", source: "referral", manager: "sokolova", count: 2, kind: "lost" },
  { stage: "qual", source: "referral", manager: "lebedev", count: 2, kind: "lost" },
  { stage: "qual", source: "referral", manager: "orlov", count: 1, kind: "lost" },
  { stage: "qual", source: "referral", manager: "kim", count: 1, kind: "lost" },
  { stage: "new", source: "referral", manager: "sokolova", count: 2, kind: "lost" },
  { stage: "new", source: "referral", manager: "lebedev", count: 2, kind: "lost" },
  { stage: "new", source: "referral", manager: "orlov", count: 3, kind: "lost" },
  { stage: "new", source: "referral", manager: "kim", count: 2, kind: "lost" },

  { stage: "proposal", source: "expo", manager: "lebedev", count: 2, kind: "stale" },
  { stage: "won", source: "expo", manager: "lebedev", count: 1, kind: "won" },
  { stage: "contract", source: "expo", manager: "orlov", count: 1, kind: "healthy" },
  { stage: "nego", source: "expo", manager: "lebedev", count: 1, kind: "healthy" },
  { stage: "nego", source: "expo", manager: "sokolova", count: 1, kind: "healthy" },
  { stage: "need", source: "expo", manager: "sokolova", count: 1, kind: "gap" },
  { stage: "need", source: "expo", manager: "lebedev", count: 1, kind: "healthy" },
  { stage: "need", source: "expo", manager: "orlov", count: 1, kind: "healthy" },
  { stage: "qual", source: "expo", manager: "lebedev", count: 2, kind: "lost" },
  { stage: "qual", source: "expo", manager: "sokolova", count: 2, kind: "lost" },
  { stage: "qual", source: "expo", manager: "kim", count: 2, kind: "lost" },
  { stage: "new", source: "expo", manager: "kim", count: 3, kind: "lost" },
  { stage: "new", source: "expo", manager: "orlov", count: 2, kind: "lost" },
  { stage: "new", source: "expo", manager: "sokolova", count: 2, kind: "lost" },

  { stage: "proposal", source: "partner", manager: "orlov", count: 2, kind: "healthy" },
  { stage: "proposal", source: "partner", manager: "lebedev", count: 2, kind: "stale" },
  { stage: "won", source: "partner", manager: "sokolova", count: 1, kind: "won" },
  { stage: "won", source: "partner", manager: "orlov", count: 1, kind: "won" },
  { stage: "contract", source: "partner", manager: "sokolova", count: 1, kind: "healthy" },
  { stage: "contract", source: "partner", manager: "lebedev", count: 1, kind: "healthy" },
  { stage: "nego", source: "partner", manager: "orlov", count: 1, kind: "healthy" },
  { stage: "nego", source: "partner", manager: "kim", count: 1, kind: "healthy" },
  { stage: "need", source: "partner", manager: "sokolova", count: 2, kind: "gap" },
  { stage: "need", source: "partner", manager: "lebedev", count: 1, kind: "healthy" },
  { stage: "need", source: "partner", manager: "kim", count: 1, kind: "healthy" },
  { stage: "qual", source: "partner", manager: "sokolova", count: 3, kind: "lost" },
  { stage: "qual", source: "partner", manager: "lebedev", count: 2, kind: "lost" },
  { stage: "qual", source: "partner", manager: "orlov", count: 2, kind: "lost" },
  { stage: "qual", source: "partner", manager: "kim", count: 1, kind: "lost" },
  { stage: "new", source: "partner", manager: "sokolova", count: 3, kind: "lost" },
  { stage: "new", source: "partner", manager: "lebedev", count: 2, kind: "lost" },
  { stage: "new", source: "partner", manager: "orlov", count: 2, kind: "lost" },
  { stage: "new", source: "partner", manager: "kim", count: 2, kind: "lost" },
];

const ROOTS = [
  "БалтСталь",
  "Каматех",
  "СеверПром",
  "УралКран",
  "Нева Логистик",
  "СибЭнерго",
  "Точка Сварки",
  "Арктик Фуд",
  "Мостпроект",
  "ВолгаПак",
  "ДонАгро",
  "ЛенСпецМонтаж",
  "Тайга Лес",
  "КубаньАгро",
  "Ока Металл",
  "Енисей Транс",
  "Амур Строй",
  "ПолярСервис",
  "РязаньМаш",
  "Вятка Насос",
  "Алтай Кабель",
  "Обь Судо",
  "Печора Газ",
  "Иртыш Сервис",
  "Ладога Пак",
  "Онега Лес",
  "Терек Агро",
  "Ангар Нефть",
  "Селенга Тур",
  "Байкал Холод",
  "Саяны Руд",
  "Кола Порт",
  "Мурман Снаб",
  "Нерпа Флот",
  "Зея Мост",
  "Бурея Энерго",
  "Вилюй Строй",
  "Лена Дор",
  "Яна Транс",
  "Томь Арматура",
];

const TAILS = ["Север", "Групп", "Плюс", "Регион", "Сервис"];

const TITLES = [
  "Поставка насосного оборудования",
  "Сервисный контракт на компрессоры",
  "Модернизация линии розлива",
  "Комплект запорной арматуры",
  "Шеф-монтаж котельной",
  "ЗИП на сезон",
  "Проектирование узла учёта",
  "Поставка кабельной продукции",
];

const AMOUNT_BASE: Record<StageId, number> = {
  new: 620_000,
  qual: 840_000,
  need: 1_350_000,
  proposal: 2_150_000,
  nego: 3_250_000,
  contract: 4_600_000,
  won: 3_750_000,
};

function companyName(index: number): string {
  const root = ROOTS[index % ROOTS.length] ?? "Нордлайн";
  const cycle = Math.floor(index / ROOTS.length);
  const form = index % 5 === 0 ? "АО" : "ООО";
  if (cycle === 0) return `${form} «${root}»`;
  const tail = TAILS[cycle - 1] ?? String(cycle + 1);
  return `${form} «${root} ${tail}»`;
}

function isoDay(day: number): string {
  return `2026-10-${String(day).padStart(2, "0")}`;
}

function activityDate(days: number): string {
  const day = 27 - days;
  if (day >= 1) return isoDay(day);
  return `2026-09-${String(30 + day).padStart(2, "0")}`;
}

function slipPath(slips: number): string[] {
  const path = ["16 окт", "28 окт", "6 ноя", "20 ноя"];
  if (slips <= 0) return ["18 ноя"];
  return path.slice(0, Math.min(slips + 1, path.length));
}

function buildDeals(): Deal[] {
  const deals: Deal[] = [];
  let n = 0;
  for (const batch of BATCHES) {
    for (let i = 0; i < batch.count; i += 1) {
      const activityDays =
        batch.kind === "stale"
          ? 16 + (i % 9)
          : batch.kind === "gap"
            ? 2 + (i % 4)
            : 1 + ((n + i) % 5);
      const closeSlips =
        batch.kind === "stale" ? 2 + (i % 3) : batch.kind === "healthy" && i % 5 === 0 ? 1 : 0;
      const missing =
        batch.kind === "stale" && i % 2 === 0
          ? ["Дата следующего контакта"]
          : batch.kind === "gap"
            ? [i % 2 === 0 ? "ИНН контрагента" : "Дата следующего контакта"]
            : [];
      const outcome: Outcome =
        batch.kind === "won" || batch.stage === "won"
          ? "won"
          : batch.kind === "lost"
            ? "lost"
            : "open";
      deals.push({
        id: `NL-${2401 + n}`,
        title: TITLES[n % TITLES.length] ?? "Поставка",
        company: companyName(n),
        amount: AMOUNT_BASE[batch.stage] + ((n * 17) % 23) * 70_000,
        stage: batch.stage,
        source: batch.source,
        manager: batch.manager,
        outcome,
        created: isoDay(1 + (n % 20)),
        closePlan: closeSlips > 0 ? "2026-11-20" : "2026-11-18",
        closeSlips,
        slipPath: slipPath(closeSlips),
        lastActivity: activityDate(activityDays),
        activityDays,
        missing,
      });
      n += 1;
    }
  }
  return deals;
}

export const DEALS: Deal[] = buildDeals();

export function stageMeta(id: StageId): StageMeta {
  return STAGES.find((stage) => stage.id === id) ?? STAGES[0];
}

export function sourceMeta(id: SourceId): SourceMeta {
  return SOURCES.find((source) => source.id === id) ?? SOURCES[0];
}

export function managerMeta(id: ManagerId): ManagerMeta {
  return MANAGERS.find((manager) => manager.id === id) ?? MANAGERS[0];
}

export function stageIndex(id: StageId): number {
  return STAGE_ORDER.indexOf(id);
}

export function dealRisks(deal: Deal): DealRisk[] {
  if (deal.outcome !== "open") return [];
  const risks: DealRisk[] = [];
  if (deal.activityDays >= 14 && deal.closeSlips >= 2) {
    risks.push({ ruleId: "R-ACT-14", severity: "high" });
  }
  if (deal.missing.length > 0) {
    risks.push({ ruleId: "R-FIELD", severity: deal.missing.length > 1 ? "high" : "medium" });
  }
  return risks;
}

export function riskWeight(deal: Deal): number {
  return dealRisks(deal).reduce((sum, risk) => sum + (risk.severity === "high" ? 2 : 1), 0);
}

export type Filters = {
  stage: StageId | null;
  source: SourceId | null;
  manager: ManagerId | null;
  query: string;
  riskyOnly: boolean;
};

export function matchDeal(deal: Deal, filters: Filters): boolean {
  if (filters.stage && deal.stage !== filters.stage) return false;
  if (filters.source && deal.source !== filters.source) return false;
  if (filters.manager && deal.manager !== filters.manager) return false;
  if (filters.riskyOnly && dealRisks(deal).length === 0) return false;
  const q = filters.query.trim().toLowerCase();
  if (!q) return true;
  return (
    deal.company.toLowerCase().includes(q) ||
    deal.title.toLowerCase().includes(q) ||
    deal.id.toLowerCase().includes(q)
  );
}

export function applyFilters(deals: Deal[], filters: Filters): Deal[] {
  return deals.filter((deal) => matchDeal(deal, filters));
}

export function reachedCount(deals: Deal[], stage: StageId): number {
  const index = stageIndex(stage);
  return deals.filter((deal) => stageIndex(deal.stage) >= index).length;
}

export function stoppedCount(deals: Deal[], stage: StageId): number {
  return deals.filter((deal) => deal.stage === stage).length;
}

export function stepConversion(deals: Deal[], from: StageId): number | null {
  const index = stageIndex(from);
  if (index < 0 || index >= STAGE_ORDER.length - 1) return null;
  const base = reachedCount(deals, from);
  if (base === 0) return null;
  return reachedCount(deals, STAGE_ORDER[index + 1]) / base;
}

export type FunnelRow = {
  stage: StageId;
  label: string;
  short: string;
  reached: number;
  stopped: number;
  conversion: number | null;
  prior: number | null;
  delta: number | null;
};

export function funnelRows(deals: Deal[]): FunnelRow[] {
  return STAGES.map((stage, index) => {
    const conversion = stepConversion(deals, stage.id);
    const prior = index < PRIOR_STEP.length ? PRIOR_STEP[index] : null;
    return {
      stage: stage.id,
      label: stage.label,
      short: stage.short,
      reached: reachedCount(deals, stage.id),
      stopped: stoppedCount(deals, stage.id),
      conversion,
      prior,
      delta: conversion != null && prior != null ? conversion - prior : null,
    };
  });
}

export function worstStep(deals: Deal[]): FunnelRow | null {
  const rows = funnelRows(deals).filter((row) => row.delta != null);
  if (rows.length === 0) return null;
  return rows.reduce((worst, row) => ((row.delta ?? 0) < (worst.delta ?? 0) ? row : worst));
}

export type SourceRow = {
  id: SourceId;
  label: string;
  leads: number;
  won: number;
  winRate: number;
  pipeline: number;
  stalled: number;
};

export function sourceRows(deals: Deal[]): SourceRow[] {
  return SOURCES.map((source) => {
    const rows = deals.filter((deal) => deal.source === source.id);
    const won = rows.filter((deal) => deal.outcome === "won");
    const open = rows.filter((deal) => deal.outcome === "open");
    return {
      id: source.id,
      label: source.label,
      leads: rows.length,
      won: won.length,
      winRate: rows.length ? won.length / rows.length : 0,
      pipeline: open.reduce((sum, deal) => sum + deal.amount, 0),
      stalled: open.filter((deal) => dealRisks(deal).some((risk) => risk.ruleId === "R-ACT-14")).length,
    };
  }).sort((a, b) => b.leads - a.leads);
}

export type ManagerRow = {
  id: ManagerId;
  name: string;
  role: string;
  leads: number;
  open: number;
  won: number;
  winRate: number;
  pipeline: number;
  stalled: number;
  overloaded: boolean;
};

export function managerRows(deals: Deal[]): ManagerRow[] {
  return MANAGERS.map((manager) => {
    const rows = deals.filter((deal) => deal.manager === manager.id);
    const open = rows.filter((deal) => deal.outcome === "open");
    const won = rows.filter((deal) => deal.outcome === "won");
    const winRate = rows.length ? won.length / rows.length : 0;
    return {
      id: manager.id,
      name: manager.name,
      role: manager.role,
      leads: rows.length,
      open: open.length,
      won: won.length,
      winRate,
      pipeline: open.reduce((sum, deal) => sum + deal.amount, 0),
      stalled: open.filter((deal) => dealRisks(deal).some((risk) => risk.ruleId === "R-ACT-14")).length,
      overloaded: open.length >= 25 && winRate < 0.04,
    };
  }).sort((a, b) => b.open - a.open);
}

export type Snapshot = {
  leads: number;
  wonCount: number;
  wonRevenue: number;
  winRate: number;
  pipeline: number;
  openCount: number;
  riskDeals: number;
  fieldGaps: number;
  stalled: number;
};

export function snapshot(deals: Deal[]): Snapshot {
  const won = deals.filter((deal) => deal.outcome === "won");
  const open = deals.filter((deal) => deal.outcome === "open");
  const riskDeals = open.filter((deal) => dealRisks(deal).length > 0);
  return {
    leads: deals.length,
    wonCount: won.length,
    wonRevenue: won.reduce((sum, deal) => sum + deal.amount, 0),
    winRate: deals.length ? won.length / deals.length : 0,
    pipeline: open.reduce((sum, deal) => sum + deal.amount, 0),
    openCount: open.length,
    riskDeals: riskDeals.length,
    fieldGaps: open.filter((deal) => deal.missing.length > 0).length,
    stalled: open.filter((deal) => dealRisks(deal).some((risk) => risk.ruleId === "R-ACT-14")).length,
  };
}

export function explainDeal(deal: Deal): string {
  const risks = dealRisks(deal);
  if (risks.some((risk) => risk.ruleId === "R-ACT-14")) {
    return `Сделка отмечена как рискованная: давно не было активности (${deal.activityDays} ${plural(deal.activityDays, "день", "дня", "дней")}), а плановая дата закрытия переносилась ${deal.closeSlips} ${plural(deal.closeSlips, "раз", "раза", "раз")}.`;
  }
  if (risks.some((risk) => risk.ruleId === "R-FIELD")) {
    return `Карточка не проходит контроль качества: не заполнено — ${deal.missing.join(", ")}.`;
  }
  if (deal.outcome === "won") return "Сделка закрыта успешно. Правило риска на неё не срабатывает.";
  if (deal.outcome === "lost") return "Лид выбыл на раннем этапе и не входит в активный прогноз.";
  return "Открытая сделка в пределах правил: активность свежая, обязательные поля заполнены.";
}

export function slipSentence(deal: Deal): string {
  if (deal.closeSlips <= 0) return `План закрытия ${formatDay(deal.closePlan)}, без переносов.`;
  return `Перенос × ${deal.closeSlips}: ${deal.slipPath.join(" → ")}.`;
}

export type Fact = { label: string; value: string };

export function dealFacts(deal: Deal): Fact[] {
  return [
    { label: "Последняя активность", value: `${formatDay(deal.lastActivity)} · ${deal.activityDays} ${plural(deal.activityDays, "день", "дня", "дней")} назад` },
    { label: "План закрытия", value: slipSentence(deal) },
    { label: "Обязательные поля", value: deal.missing.length ? `Пусто: ${deal.missing.join(", ")}` : "Заполнены" },
    { label: "Источник", value: sourceMeta(deal.source).label },
    { label: "Ответственный", value: managerMeta(deal.manager).name },
    { label: "Этап", value: stageMeta(deal.stage).label },
  ];
}

export const PORTAL = {
  company: "ООО «Нордлайн»",
  host: "nordline.bitrix24.ru",
  syncedAt: "27 октября 2026, 08:14",
  rawFiles: 1248,
  triples: 18430,
  inferred: 216,
  contradictions: 0,
};

export const LAYERS = [
  {
    id: "RAW",
    title: "Сырой слой",
    stack: "Битрикс24 REST → файлы JSON",
    happens: "Лиды, сделки и активности забираются как есть, без переписывания структуры источника.",
    result: "Изолированные файлы без бизнес-смысла.",
  },
  {
    id: "MAP",
    title: "Слой отображения",
    stack: "Движок CCCR v2.4",
    happens: "Дерево карточки разбирается на свойства, контекст и вычисляемые факты.",
    result: "Базовые RDF-триплеты: кто, что и с чем связан.",
  },
  {
    id: "OWL",
    title: "Онтология",
    stack: "OWL 2 / словарь отдела продаж",
    happens: "На факты накладываются этапы воронки, обязательные поля и пороги риска.",
    result: "Схема, на которой держится объяснение.",
  },
  {
    id: "INF",
    title: "Вывод",
    stack: "Reasoner",
    happens: "Машина вывода классифицирует сделки и проверяет, что факты не противоречат правилам.",
    result: "Граф знаний с рисками и причиной каждого вывода.",
  },
] as const;

export function outcomeLabel(outcome: Outcome): string {
  if (outcome === "won") return "Успешно";
  if (outcome === "lost") return "Выбыл";
  return "Открыта";
}

export function formatDelta(delta: number | null): string {
  if (delta == null) return "—";
  return formatPp(delta);
}
