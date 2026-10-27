import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as NotebookPen, i as ShieldAlert, n as Waypoints, o as LayoutDashboard, s as BookOpen, t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Cell, i as Bar, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CuC5Q3C3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function plural(n, one, few, many) {
	const abs = Math.abs(n);
	const m10 = abs % 10;
	const m100 = abs % 100;
	if (m10 === 1 && m100 !== 11) return one;
	if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
	return many;
}
function formatMoney(value) {
	if (Math.abs(value) >= 1e6) {
		const millions = value / 1e6;
		const digits = Math.abs(millions) >= 10 ? 1 : 2;
		return `${millions.toLocaleString("ru-RU", {
			minimumFractionDigits: 1,
			maximumFractionDigits: digits
		})} млн ₽`;
	}
	return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}
function formatInt(value) {
	return Math.round(value).toLocaleString("ru-RU");
}
function formatPct(ratio) {
	return `${Math.round(ratio * 100)}%`;
}
function formatPp(delta) {
	const pp = Math.round(delta * 100);
	return `${pp > 0 ? "+" : ""}${pp} п.п.`;
}
var MONTHS = [
	"янв",
	"фев",
	"мар",
	"апр",
	"мая",
	"июн",
	"июл",
	"авг",
	"сен",
	"окт",
	"ноя",
	"дек"
];
function formatDay(iso) {
	const [, month, day] = iso.split("-");
	const m = MONTHS[Number(month) - 1] ?? month;
	return `${Number(day)} ${m}`;
}
function Panel({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("rounded-2xl border border-line bg-elevated p-6", className),
		children
	});
}
function Eyebrow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children
	});
}
function Delta({ value, suffix }) {
	if (value == null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-sm text-muted",
		children: "—"
	});
	const up = value > .005;
	const down = value < -.005;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("text-sm tabular-nums", up && "text-good", down && "text-bad", !up && !down && "text-muted"),
		children: [formatPp(value), suffix ? ` ${suffix}` : ""]
	});
}
function Chip({ children, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex min-h-11 items-center gap-2 rounded-sm border border-line bg-surface px-3 text-sm text-ink",
		children: [children, onRemove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "press text-muted",
			"aria-label": "Снять фильтр",
			onClick: onRemove,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		}) : null]
	});
}
function Meter({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "block h-1.5 overflow-hidden rounded-sm bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block h-full bg-accent",
			style: { width: `${Math.max(0, Math.min(100, value))}%` }
		})
	});
}
function Button({ variant = "primary", className, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn("press inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40", variant === "primary" && "bg-accent text-accent-fg hover:opacity-90", variant === "quiet" && "border border-line bg-elevated text-ink hover:bg-bg", variant === "ghost" && "bg-transparent text-ink hover:bg-surface", className),
		...props
	});
}
var STAGE_ORDER = [
	"new",
	"qual",
	"need",
	"proposal",
	"nego",
	"contract",
	"won"
];
var STAGES = [
	{
		id: "new",
		label: "Новый лид",
		short: "Лид"
	},
	{
		id: "qual",
		label: "Квалификация",
		short: "Квалификация"
	},
	{
		id: "need",
		label: "Потребность",
		short: "Потребность"
	},
	{
		id: "proposal",
		label: "Коммерческое предложение",
		short: "КП"
	},
	{
		id: "nego",
		label: "Переговоры",
		short: "Переговоры"
	},
	{
		id: "contract",
		label: "Договор",
		short: "Договор"
	},
	{
		id: "won",
		label: "Успешно реализовано",
		short: "Успешно"
	}
];
var SOURCES = [
	{
		id: "direct",
		label: "Яндекс Директ"
	},
	{
		id: "site",
		label: "Сайт"
	},
	{
		id: "referral",
		label: "Рекомендации"
	},
	{
		id: "expo",
		label: "Металл-Экспо"
	},
	{
		id: "partner",
		label: "Партнёры"
	}
];
var MANAGERS = [
	{
		id: "sokolova",
		name: "Соколова А. В.",
		role: "Менеджер"
	},
	{
		id: "lebedev",
		name: "Лебедев И. П.",
		role: "Менеджер"
	},
	{
		id: "orlov",
		name: "Орлов П. С.",
		role: "Старший менеджер"
	},
	{
		id: "kim",
		name: "Ким Е. А.",
		role: "Менеджер"
	}
];
/** Step conversion in September, aligned to STAGE_ORDER transitions. */
var PRIOR_STEP = [
	.79,
	.71,
	.74,
	.62,
	.64,
	.66
];
var PRIOR_WON_REVENUE = 412e5;
var RULES = {
	"R-ACT-14": {
		name: "Застой сделки",
		axiom: "StalledDeal ≡ OpenDeal ⊓ activityAgeDays ≥ 14 ⊓ closeDateSlips ≥ 2",
		plain: "Сделка отмечена как рискованная: давно не было активности, а плановая дата закрытия неоднократно переносилась.",
		action: "Назначить контакт в течение 48 часов или снять сделку с активного прогноза."
	},
	"R-FIELD": {
		name: "Пустые обязательные поля",
		axiom: "IncompleteDeal ≡ OpenDeal ⊓ ∃ requiredField.Empty",
		plain: "Карточка не проходит контроль качества: не заполнено обязательное поле, без которого сделка не должна менять этап.",
		action: "Вернуть карточку ответственному и не двигать этап, пока поле не заполнено."
	},
	"R-LOAD": {
		name: "Перегруз менеджера",
		axiom: "OverloadedManager ≡ Manager ⊓ openDeals ≥ 25 ⊓ winRate < 0.04",
		plain: "Нагрузка менеджера выше порога отдела, а конверсия в успешную сделку заметно ниже остальных.",
		action: "Передать часть сделок на этапе КП менеджерам с запасом по нагрузке."
	},
	"R-CONV": {
		name: "Провал конверсии этапа",
		axiom: "StageDrop ≡ stepConversion + 0.15 < priorPeriod.stepConversion",
		plain: "Конверсия этапа просела больше чем на 15 пунктов к прошлому месяцу. Это не шум выборки, а сигнал на разбор.",
		action: "Разобрать срез по источникам и менеджерам, начиная с этапа, где оборвалась воронка."
	}
};
var BATCHES = [
	{
		stage: "proposal",
		source: "direct",
		manager: "sokolova",
		count: 16,
		kind: "stale"
	},
	{
		stage: "proposal",
		source: "direct",
		manager: "lebedev",
		count: 8,
		kind: "stale"
	},
	{
		stage: "proposal",
		source: "direct",
		manager: "orlov",
		count: 4,
		kind: "healthy"
	},
	{
		stage: "nego",
		source: "direct",
		manager: "kim",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "won",
		source: "direct",
		manager: "kim",
		count: 1,
		kind: "won"
	},
	{
		stage: "need",
		source: "direct",
		manager: "sokolova",
		count: 5,
		kind: "healthy"
	},
	{
		stage: "need",
		source: "direct",
		manager: "lebedev",
		count: 4,
		kind: "healthy"
	},
	{
		stage: "need",
		source: "direct",
		manager: "orlov",
		count: 3,
		kind: "gap"
	},
	{
		stage: "qual",
		source: "direct",
		manager: "sokolova",
		count: 6,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "direct",
		manager: "lebedev",
		count: 4,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "direct",
		manager: "kim",
		count: 4,
		kind: "lost"
	},
	{
		stage: "new",
		source: "direct",
		manager: "orlov",
		count: 4,
		kind: "lost"
	},
	{
		stage: "new",
		source: "direct",
		manager: "kim",
		count: 4,
		kind: "lost"
	},
	{
		stage: "proposal",
		source: "site",
		manager: "sokolova",
		count: 4,
		kind: "stale"
	},
	{
		stage: "proposal",
		source: "site",
		manager: "kim",
		count: 2,
		kind: "gap"
	},
	{
		stage: "won",
		source: "site",
		manager: "lebedev",
		count: 2,
		kind: "won"
	},
	{
		stage: "won",
		source: "site",
		manager: "kim",
		count: 1,
		kind: "won"
	},
	{
		stage: "contract",
		source: "site",
		manager: "lebedev",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "contract",
		source: "site",
		manager: "orlov",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "nego",
		source: "site",
		manager: "sokolova",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "nego",
		source: "site",
		manager: "lebedev",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "nego",
		source: "site",
		manager: "kim",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "need",
		source: "site",
		manager: "lebedev",
		count: 2,
		kind: "healthy"
	},
	{
		stage: "need",
		source: "site",
		manager: "orlov",
		count: 2,
		kind: "gap"
	},
	{
		stage: "need",
		source: "site",
		manager: "kim",
		count: 2,
		kind: "healthy"
	},
	{
		stage: "qual",
		source: "site",
		manager: "sokolova",
		count: 3,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "site",
		manager: "lebedev",
		count: 3,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "site",
		manager: "orlov",
		count: 2,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "site",
		manager: "kim",
		count: 2,
		kind: "lost"
	},
	{
		stage: "new",
		source: "site",
		manager: "sokolova",
		count: 3,
		kind: "lost"
	},
	{
		stage: "new",
		source: "site",
		manager: "lebedev",
		count: 3,
		kind: "lost"
	},
	{
		stage: "new",
		source: "site",
		manager: "orlov",
		count: 3,
		kind: "lost"
	},
	{
		stage: "new",
		source: "site",
		manager: "kim",
		count: 2,
		kind: "lost"
	},
	{
		stage: "proposal",
		source: "referral",
		manager: "kim",
		count: 2,
		kind: "gap"
	},
	{
		stage: "won",
		source: "referral",
		manager: "kim",
		count: 2,
		kind: "won"
	},
	{
		stage: "won",
		source: "referral",
		manager: "orlov",
		count: 2,
		kind: "won"
	},
	{
		stage: "contract",
		source: "referral",
		manager: "kim",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "contract",
		source: "referral",
		manager: "orlov",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "nego",
		source: "referral",
		manager: "kim",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "nego",
		source: "referral",
		manager: "orlov",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "nego",
		source: "referral",
		manager: "lebedev",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "need",
		source: "referral",
		manager: "orlov",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "need",
		source: "referral",
		manager: "lebedev",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "qual",
		source: "referral",
		manager: "sokolova",
		count: 2,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "referral",
		manager: "lebedev",
		count: 2,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "referral",
		manager: "orlov",
		count: 1,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "referral",
		manager: "kim",
		count: 1,
		kind: "lost"
	},
	{
		stage: "new",
		source: "referral",
		manager: "sokolova",
		count: 2,
		kind: "lost"
	},
	{
		stage: "new",
		source: "referral",
		manager: "lebedev",
		count: 2,
		kind: "lost"
	},
	{
		stage: "new",
		source: "referral",
		manager: "orlov",
		count: 3,
		kind: "lost"
	},
	{
		stage: "new",
		source: "referral",
		manager: "kim",
		count: 2,
		kind: "lost"
	},
	{
		stage: "proposal",
		source: "expo",
		manager: "lebedev",
		count: 2,
		kind: "stale"
	},
	{
		stage: "won",
		source: "expo",
		manager: "lebedev",
		count: 1,
		kind: "won"
	},
	{
		stage: "contract",
		source: "expo",
		manager: "orlov",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "nego",
		source: "expo",
		manager: "lebedev",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "nego",
		source: "expo",
		manager: "sokolova",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "need",
		source: "expo",
		manager: "sokolova",
		count: 1,
		kind: "gap"
	},
	{
		stage: "need",
		source: "expo",
		manager: "lebedev",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "need",
		source: "expo",
		manager: "orlov",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "qual",
		source: "expo",
		manager: "lebedev",
		count: 2,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "expo",
		manager: "sokolova",
		count: 2,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "expo",
		manager: "kim",
		count: 2,
		kind: "lost"
	},
	{
		stage: "new",
		source: "expo",
		manager: "kim",
		count: 3,
		kind: "lost"
	},
	{
		stage: "new",
		source: "expo",
		manager: "orlov",
		count: 2,
		kind: "lost"
	},
	{
		stage: "new",
		source: "expo",
		manager: "sokolova",
		count: 2,
		kind: "lost"
	},
	{
		stage: "proposal",
		source: "partner",
		manager: "orlov",
		count: 2,
		kind: "healthy"
	},
	{
		stage: "proposal",
		source: "partner",
		manager: "lebedev",
		count: 2,
		kind: "stale"
	},
	{
		stage: "won",
		source: "partner",
		manager: "sokolova",
		count: 1,
		kind: "won"
	},
	{
		stage: "won",
		source: "partner",
		manager: "orlov",
		count: 1,
		kind: "won"
	},
	{
		stage: "contract",
		source: "partner",
		manager: "sokolova",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "contract",
		source: "partner",
		manager: "lebedev",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "nego",
		source: "partner",
		manager: "orlov",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "nego",
		source: "partner",
		manager: "kim",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "need",
		source: "partner",
		manager: "sokolova",
		count: 2,
		kind: "gap"
	},
	{
		stage: "need",
		source: "partner",
		manager: "lebedev",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "need",
		source: "partner",
		manager: "kim",
		count: 1,
		kind: "healthy"
	},
	{
		stage: "qual",
		source: "partner",
		manager: "sokolova",
		count: 3,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "partner",
		manager: "lebedev",
		count: 2,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "partner",
		manager: "orlov",
		count: 2,
		kind: "lost"
	},
	{
		stage: "qual",
		source: "partner",
		manager: "kim",
		count: 1,
		kind: "lost"
	},
	{
		stage: "new",
		source: "partner",
		manager: "sokolova",
		count: 3,
		kind: "lost"
	},
	{
		stage: "new",
		source: "partner",
		manager: "lebedev",
		count: 2,
		kind: "lost"
	},
	{
		stage: "new",
		source: "partner",
		manager: "orlov",
		count: 2,
		kind: "lost"
	},
	{
		stage: "new",
		source: "partner",
		manager: "kim",
		count: 2,
		kind: "lost"
	}
];
var ROOTS = [
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
	"Томь Арматура"
];
var TAILS = [
	"Север",
	"Групп",
	"Плюс",
	"Регион",
	"Сервис"
];
var TITLES$1 = [
	"Поставка насосного оборудования",
	"Сервисный контракт на компрессоры",
	"Модернизация линии розлива",
	"Комплект запорной арматуры",
	"Шеф-монтаж котельной",
	"ЗИП на сезон",
	"Проектирование узла учёта",
	"Поставка кабельной продукции"
];
var AMOUNT_BASE = {
	new: 62e4,
	qual: 84e4,
	need: 135e4,
	proposal: 215e4,
	nego: 325e4,
	contract: 46e5,
	won: 375e4
};
function companyName(index) {
	const root = ROOTS[index % ROOTS.length] ?? "Нордлайн";
	const cycle = Math.floor(index / ROOTS.length);
	const form = index % 5 === 0 ? "АО" : "ООО";
	if (cycle === 0) return `${form} «${root}»`;
	return `${form} «${root} ${TAILS[cycle - 1] ?? String(cycle + 1)}»`;
}
function isoDay(day) {
	return `2026-10-${String(day).padStart(2, "0")}`;
}
function activityDate(days) {
	const day = 27 - days;
	if (day >= 1) return isoDay(day);
	return `2026-09-${String(30 + day).padStart(2, "0")}`;
}
function slipPath(slips) {
	const path = [
		"16 окт",
		"28 окт",
		"6 ноя",
		"20 ноя"
	];
	if (slips <= 0) return ["18 ноя"];
	return path.slice(0, Math.min(slips + 1, path.length));
}
function buildDeals() {
	const deals = [];
	let n = 0;
	for (const batch of BATCHES) for (let i = 0; i < batch.count; i += 1) {
		const activityDays = batch.kind === "stale" ? 16 + i % 9 : batch.kind === "gap" ? 2 + i % 4 : 1 + (n + i) % 5;
		const closeSlips = batch.kind === "stale" ? 2 + i % 3 : batch.kind === "healthy" && i % 5 === 0 ? 1 : 0;
		const missing = batch.kind === "stale" && i % 2 === 0 ? ["Дата следующего контакта"] : batch.kind === "gap" ? [i % 2 === 0 ? "ИНН контрагента" : "Дата следующего контакта"] : [];
		const outcome = batch.kind === "won" || batch.stage === "won" ? "won" : batch.kind === "lost" ? "lost" : "open";
		deals.push({
			id: `NL-${2401 + n}`,
			title: TITLES$1[n % TITLES$1.length] ?? "Поставка",
			company: companyName(n),
			amount: AMOUNT_BASE[batch.stage] + n * 17 % 23 * 7e4,
			stage: batch.stage,
			source: batch.source,
			manager: batch.manager,
			outcome,
			created: isoDay(1 + n % 20),
			closePlan: closeSlips > 0 ? "2026-11-20" : "2026-11-18",
			closeSlips,
			slipPath: slipPath(closeSlips),
			lastActivity: activityDate(activityDays),
			activityDays,
			missing
		});
		n += 1;
	}
	return deals;
}
var DEALS = buildDeals();
function stageMeta(id) {
	return STAGES.find((stage) => stage.id === id) ?? STAGES[0];
}
function sourceMeta(id) {
	return SOURCES.find((source) => source.id === id) ?? SOURCES[0];
}
function managerMeta(id) {
	return MANAGERS.find((manager) => manager.id === id) ?? MANAGERS[0];
}
function stageIndex(id) {
	return STAGE_ORDER.indexOf(id);
}
function dealRisks(deal) {
	if (deal.outcome !== "open") return [];
	const risks = [];
	if (deal.activityDays >= 14 && deal.closeSlips >= 2) risks.push({
		ruleId: "R-ACT-14",
		severity: "high"
	});
	if (deal.missing.length > 0) risks.push({
		ruleId: "R-FIELD",
		severity: deal.missing.length > 1 ? "high" : "medium"
	});
	return risks;
}
function riskWeight(deal) {
	return dealRisks(deal).reduce((sum, risk) => sum + (risk.severity === "high" ? 2 : 1), 0);
}
function matchDeal(deal, filters) {
	if (filters.stage && deal.stage !== filters.stage) return false;
	if (filters.source && deal.source !== filters.source) return false;
	if (filters.manager && deal.manager !== filters.manager) return false;
	if (filters.riskyOnly && dealRisks(deal).length === 0) return false;
	const q = filters.query.trim().toLowerCase();
	if (!q) return true;
	return deal.company.toLowerCase().includes(q) || deal.title.toLowerCase().includes(q) || deal.id.toLowerCase().includes(q);
}
function applyFilters(deals, filters) {
	return deals.filter((deal) => matchDeal(deal, filters));
}
function reachedCount(deals, stage) {
	const index = stageIndex(stage);
	return deals.filter((deal) => stageIndex(deal.stage) >= index).length;
}
function stoppedCount(deals, stage) {
	return deals.filter((deal) => deal.stage === stage).length;
}
function stepConversion(deals, from) {
	const index = stageIndex(from);
	if (index < 0 || index >= STAGE_ORDER.length - 1) return null;
	const base = reachedCount(deals, from);
	if (base === 0) return null;
	return reachedCount(deals, STAGE_ORDER[index + 1]) / base;
}
function funnelRows(deals) {
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
			delta: conversion != null && prior != null ? conversion - prior : null
		};
	});
}
function worstStep(deals) {
	const rows = funnelRows(deals).filter((row) => row.delta != null);
	if (rows.length === 0) return null;
	return rows.reduce((worst, row) => (row.delta ?? 0) < (worst.delta ?? 0) ? row : worst);
}
function sourceRows(deals) {
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
			stalled: open.filter((deal) => dealRisks(deal).some((risk) => risk.ruleId === "R-ACT-14")).length
		};
	}).sort((a, b) => b.leads - a.leads);
}
function managerRows(deals) {
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
			overloaded: open.length >= 25 && winRate < .04
		};
	}).sort((a, b) => b.open - a.open);
}
function snapshot(deals) {
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
		stalled: open.filter((deal) => dealRisks(deal).some((risk) => risk.ruleId === "R-ACT-14")).length
	};
}
function explainDeal(deal) {
	const risks = dealRisks(deal);
	if (risks.some((risk) => risk.ruleId === "R-ACT-14")) return `Сделка отмечена как рискованная: давно не было активности (${deal.activityDays} ${plural(deal.activityDays, "день", "дня", "дней")}), а плановая дата закрытия переносилась ${deal.closeSlips} ${plural(deal.closeSlips, "раз", "раза", "раз")}.`;
	if (risks.some((risk) => risk.ruleId === "R-FIELD")) return `Карточка не проходит контроль качества: не заполнено — ${deal.missing.join(", ")}.`;
	if (deal.outcome === "won") return "Сделка закрыта успешно. Правило риска на неё не срабатывает.";
	if (deal.outcome === "lost") return "Лид выбыл на раннем этапе и не входит в активный прогноз.";
	return "Открытая сделка в пределах правил: активность свежая, обязательные поля заполнены.";
}
function slipSentence(deal) {
	if (deal.closeSlips <= 0) return `План закрытия ${formatDay(deal.closePlan)}, без переносов.`;
	return `Перенос × ${deal.closeSlips}: ${deal.slipPath.join(" → ")}.`;
}
function dealFacts(deal) {
	return [
		{
			label: "Последняя активность",
			value: `${formatDay(deal.lastActivity)} · ${deal.activityDays} ${plural(deal.activityDays, "день", "дня", "дней")} назад`
		},
		{
			label: "План закрытия",
			value: slipSentence(deal)
		},
		{
			label: "Обязательные поля",
			value: deal.missing.length ? `Пусто: ${deal.missing.join(", ")}` : "Заполнены"
		},
		{
			label: "Источник",
			value: sourceMeta(deal.source).label
		},
		{
			label: "Ответственный",
			value: managerMeta(deal.manager).name
		},
		{
			label: "Этап",
			value: stageMeta(deal.stage).label
		}
	];
}
var PORTAL = {
	company: "ООО «Нордлайн»",
	host: "nordline.bitrix24.ru",
	syncedAt: "27 октября 2026, 08:14",
	rawFiles: 1248,
	triples: 18430,
	inferred: 216,
	contradictions: 0
};
var LAYERS = [
	{
		id: "RAW",
		title: "Сырой слой",
		stack: "Битрикс24 REST → файлы JSON",
		happens: "Лиды, сделки и активности забираются как есть, без переписывания структуры источника.",
		result: "Изолированные файлы без бизнес-смысла."
	},
	{
		id: "MAP",
		title: "Слой отображения",
		stack: "Движок CCCR v2.4",
		happens: "Дерево карточки разбирается на свойства, контекст и вычисляемые факты.",
		result: "Базовые RDF-триплеты: кто, что и с чем связан."
	},
	{
		id: "OWL",
		title: "Онтология",
		stack: "OWL 2 / словарь отдела продаж",
		happens: "На факты накладываются этапы воронки, обязательные поля и пороги риска.",
		result: "Схема, на которой держится объяснение."
	},
	{
		id: "INF",
		title: "Вывод",
		stack: "Reasoner",
		happens: "Машина вывода классифицирует сделки и проверяет, что факты не противоречат правилам.",
		result: "Граф знаний с рисками и причиной каждого вывода."
	}
];
function outcomeLabel(outcome) {
	if (outcome === "won") return "Успешно";
	if (outcome === "lost") return "Выбыл";
	return "Открыта";
}
var KEY = "axioma-decisions-v1";
function isDecision(value) {
	if (!value || typeof value !== "object") return false;
	const row = value;
	return typeof row.id === "string" && typeof row.at === "string" && typeof row.action === "string" && typeof row.comment === "string" && typeof row.target === "string" && typeof row.ruleId === "string";
}
var useBi = create((set, get) => ({
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
	clearFilters: () => set({
		stage: null,
		source: null,
		manager: null,
		query: "",
		riskyOnly: false
	}),
	openDeal: (id) => set({
		dealId: id,
		signal: null,
		explainOpen: true
	}),
	openSignal: (signal) => set({
		signal,
		dealId: null,
		explainOpen: true
	}),
	closeExplain: () => set({ explainOpen: false }),
	openStageDrill: (stage) => set({
		view: "drill",
		stage,
		source: null,
		manager: null
	}),
	openSourceDrill: (source) => set({
		view: "drill",
		source
	}),
	openManagerDrill: (manager) => set({
		view: "drill",
		manager
	}),
	addDecision: (decision) => {
		const decisions = [{
			...decision,
			id: `D-${Date.now()}`,
			at: (/* @__PURE__ */ new Date()).toISOString()
		}, ...get().decisions];
		set({ decisions });
		try {
			localStorage.setItem(KEY, JSON.stringify(decisions));
		} catch {}
	},
	hydrate: () => {
		if (get().hydrated) return;
		try {
			const raw = localStorage.getItem(KEY);
			if (!raw) {
				set({ hydrated: true });
				return;
			}
			const parsed = JSON.parse(raw);
			set({
				decisions: Array.isArray(parsed) ? parsed.filter(isDecision) : [],
				hydrated: true
			});
		} catch {
			set({ hydrated: true });
		}
	}
}));
var ACTIONS$1 = {
	task: "Поставить задачу",
	reassign: "Передать сделку",
	qualify: "Вернуть в квалификацию",
	drop: "Снять с воронки"
};
function Decisions() {
	const decisions = useBi((state) => state.decisions);
	const setView = useBi((state) => state.setView);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Что руководитель уже решил по сигналам"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl",
				children: "Журнал решений"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-muted",
				children: "Записи остаются в этом браузере. Это контур принятия решения, не задача в Битрикс24."
			})
		] }), decisions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: "Пока пусто"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Откройте риск и зафиксируйте действие: задача менеджеру, передача сделки или снятие с воронки."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				onClick: () => setView("risks"),
				children: "К рискам"
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3",
			children: decisions.map((row) => {
				const rule = RULES[row.ruleId];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: ACTIONS$1[row.action]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: row.target
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm tabular-nums text-subtle",
							children: formatStamp(row.at)
						})]
					}),
					rule ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: rule.name
					}) : null,
					row.comment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: row.comment
					}) : null
				] }) }, row.id);
			})
		})]
	});
}
function formatStamp(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return date.toLocaleString("ru-RU", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
}
var PAGE = 8;
function Drill() {
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
	const [page, setPage] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setPage(0);
	}, [
		stage,
		source,
		manager,
		query,
		riskyOnly
	]);
	const rows = (0, import_react.useMemo)(() => {
		return applyFilters(DEALS, {
			stage,
			source,
			manager,
			query,
			riskyOnly
		}).slice().sort((a, b) => riskWeight(b) - riskWeight(a) || b.amount - a.amount);
	}, [
		stage,
		source,
		manager,
		query,
		riskyOnly
	]);
	const pages = Math.max(1, Math.ceil(rows.length / PAGE));
	const safePage = Math.min(page, pages - 1);
	const slice = rows.slice(safePage * PAGE, safePage * PAGE + PAGE);
	const filtered = Boolean(stage || source || manager || query || riskyOnly);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "От общей цифры к сделке"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl",
					children: rows.length === 0 ? "В срезе пусто" : `${rows.length} ${plural(rows.length, "сделка", "сделки", "сделок")} в срезе`
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: riskyOnly ? "primary" : "quiet",
						onClick: () => setRiskyOnly(!riskyOnly),
						children: "Только с риском"
					}), filtered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: clearFilters,
						children: "Сбросить"
					}) : null]
				})]
			}), filtered ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					stage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						onRemove: () => setStage(null),
						children: stageMeta(stage).label
					}) : null,
					source ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						onRemove: () => setSource(null),
						children: sourceMeta(source).label
					}) : null,
					manager ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						onRemove: () => setManager(null),
						children: managerMeta(manager).name
					}) : null,
					query ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: ["Поиск: ", query] }) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Фильтр не выбран — показаны все лиды и сделки октября. На обзоре можно сузить воронку, источник или менеджера."
			})] }),
			slice.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "В этом срезе нет сделок. Снимите один из фильтров."
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden overflow-hidden rounded-2xl border border-line bg-elevated md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Сделка"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Этап"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Источник"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Менеджер"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Активность"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right font-medium",
									children: "Сумма"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slice.map((deal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "press text-left",
									onClick: () => openDeal(deal.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-medium",
										children: deal.company
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: [
											deal.id,
											" · ",
											deal.title
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageButton, { deal })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "press min-h-11",
									onClick: () => setSource(deal.source),
									children: sourceMeta(deal.source).label
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "press min-h-11",
									onClick: () => setManager(deal.manager),
									children: managerMeta(deal.manager).name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { deal })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right tabular-nums",
								children: formatMoney(deal.amount)
							})
						]
					}, deal.id)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 md:hidden",
				children: slice.map((deal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "press w-full rounded-2xl border border-line bg-elevated p-4 text-left",
					onClick: () => openDeal(deal.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: deal.company
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-sm text-muted",
							children: [
								deal.id,
								" · ",
								stageMeta(deal.stage).short,
								" · ",
								sourceMeta(deal.source).label
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-3 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { deal }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: formatMoney(deal.amount)
							})]
						})
					]
				}) }, deal.id))
			})] }),
			rows.length > PAGE ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						safePage + 1,
						" из ",
						pages
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "quiet",
						disabled: safePage === 0,
						onClick: () => setPage(safePage - 1),
						children: "Назад"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "quiet",
						disabled: safePage >= pages - 1,
						onClick: () => setPage(safePage + 1),
						children: "Дальше"
					})]
				})]
			}) : null
		]
	});
}
function StageButton({ deal }) {
	const setStage = useBi((state) => state.setStage);
	const risks = dealRisks(deal);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "press min-h-11 text-left",
		onClick: () => setStage(deal.stage),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block",
			children: stageMeta(deal.stage).short
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: risks.length ? "text-bad" : "text-muted",
			children: risks.length ? "Есть риск" : outcomeLabel(deal.outcome)
		})]
	});
}
function Activity({ deal }) {
	const stale = deal.outcome === "open" && deal.activityDays >= 14;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: stale ? "text-sm text-bad" : "text-sm text-muted",
		children: [formatDay(deal.lastActivity), deal.outcome === "open" ? ` · ${deal.activityDays} дн.` : ""]
	});
}
var ACTIONS = [
	{
		id: "task",
		label: "Поставить задачу"
	},
	{
		id: "reassign",
		label: "Передать сделку"
	},
	{
		id: "qualify",
		label: "Вернуть в квалификацию"
	},
	{
		id: "drop",
		label: "Снять с воронки"
	}
];
function ExplainDialog() {
	const open = useBi((state) => state.explainOpen);
	const dealId = useBi((state) => state.dealId);
	const signal = useBi((state) => state.signal);
	const closeExplain = useBi((state) => state.closeExplain);
	const addDecision = useBi((state) => state.addDecision);
	const setView = useBi((state) => state.setView);
	const deal = DEALS.find((row) => row.id === dealId) ?? null;
	const [action, setAction] = (0, import_react.useState)("task");
	const [comment, setComment] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setAction("task");
		setComment("");
		setSaved(false);
	}, [
		dealId,
		signal,
		open
	]);
	const dealRule = deal ? dealRisks(deal)[0]?.ruleId ?? null : null;
	const ruleId = deal ? dealRule ?? "NOTE" : signal === "load" ? "R-LOAD" : signal === "conv" ? "R-CONV" : null;
	const rule = ruleId && ruleId !== "NOTE" ? RULES[ruleId] : null;
	const drop = worstStep(DEALS);
	const loaded = managerRows(DEALS).find((row) => row.overloaded);
	const target = deal != null ? `${deal.id} · ${deal.company}` : signal === "load" ? loaded?.name ?? "Нагрузка менеджера" : drop ? `Этап «${drop.short}»` : "Воронка";
	function save() {
		if (!ruleId) return;
		addDecision({
			action,
			comment: comment.trim(),
			target,
			ruleId
		});
		setSaved(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && closeExplain(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "overlay-in fixed inset-0 z-40 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "dialog-in fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-2xl border border-line bg-elevated p-6 text-ink focus:outline-none md:inset-y-4 md:right-4 md:left-auto md:w-[32rem] md:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-2xl",
						children: deal ? deal.company : signal === "load" ? "Перегруз менеджера" : "Провал конверсии"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "mt-1 text-sm text-muted",
						children: deal ? `${deal.id} · ${formatMoney(deal.amount)}` : "Правило на уровне отдела, не одной карточки"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						className: "press inline-flex size-11 items-center justify-center rounded-sm text-muted hover:bg-surface",
						"aria-label": "Закрыть",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				rule ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "mt-5 border-l-2 border-accent pl-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "font-mono text-sm text-subtle",
						children: [
							rule.name,
							" · ",
							ruleId
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
						className: "mt-2 text-lg",
						children: deal ? explainDeal(deal) : rule.plain
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-muted",
					children: deal ? explainDeal(deal) : "Нет активного правила."
				}),
				deal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 flex flex-wrap items-center gap-2 text-sm",
					children: [
						sourceMeta(deal.source).label,
						deal.id,
						stageMeta(deal.stage).short,
						ruleId ?? "Без правила"
					].map((item, index, list) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-sm border border-line bg-bg px-2 py-1",
							children: item
						}), index < list.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-subtle",
							children: "→"
						}) : null]
					}, `${item}-${index}`))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-5 grid gap-3",
					children: dealFacts(deal).map((fact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 border-t border-line pt-3 sm:grid-cols-[11rem_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm text-muted",
							children: fact.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fact.value })]
					}, fact.label))
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 border-t border-line pt-4 text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm text-subtle",
						children: rule?.axiom
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3",
						children: rule?.action
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 grid gap-3",
					onSubmit: (event) => {
						event.preventDefault();
						save();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Решение"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: ACTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: action === item.id ? "press min-h-11 rounded-sm bg-accent px-3 text-sm text-accent-fg" : "press min-h-11 rounded-sm border border-line bg-bg px-3 text-sm",
								onClick: () => setAction(item.id),
								children: item.label
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2 text-sm",
							children: ["Комментарий", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: comment,
								onChange: (event) => setComment(event.target.value),
								rows: 3,
								className: "rounded-sm border border-line bg-bg px-3 py-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
								placeholder: "Что сделать на планёрке"
							})]
						}),
						rule ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: rule.action
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: !ruleId || saved,
								children: saved ? "Записано" : "Зафиксировать"
							}), saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "quiet",
								onClick: () => {
									closeExplain();
									setView("decisions");
								},
								children: "Открыть журнал"
							}) : null]
						})
					]
				})
			]
		})] })
	});
}
function ModelView() {
	const stats = snapshot(DEALS);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Подключение"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-1 font-display text-2xl",
					children: ["Битрикс24 · ", PORTAL.host]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-2xl text-muted",
					children: [
						"Портал ",
						PORTAL.company,
						" отдаёт лиды, сделки и активности через REST. Платформа не правит карточки: она забирает сырьё, связывает его в граф и накладывает правила отдела."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Синхронизация",
							value: PORTAL.syncedAt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Лиды октября",
							value: formatInt(stats.leads)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Сырые файлы",
							value: formatInt(PORTAL.rawFiles)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Противоречия",
							value: String(PORTAL.contradictions)
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-3",
				children: LAYERS.map((layer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-[8rem_1fr_1fr]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-sm text-subtle",
							children: [
								"0",
								index + 1,
								" · ",
								layer.id
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl",
								children: layer.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: layer.stack
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3",
								children: layer.happens
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted md:border-l md:border-line md:pl-6",
							children: layer.result
						})
					]
				}) }) }, layer.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Правила, которые видит руководитель"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted",
					children: "Вывод не прячется в модели. У каждого сигнала есть имя правила и формальная запись — её можно сверить с фактами сделки."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-4",
					children: Object.keys(RULES).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-line pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [
									RULES[id].name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-sm text-subtle",
										children: id
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted",
								children: RULES[id].plain
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-sm text-subtle",
								children: RULES[id].axiom
							})
						]
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 text-sm text-muted",
					children: [
						"Выведено фактов: ",
						formatInt(PORTAL.inferred),
						". Базовых триплетов: ",
						formatInt(PORTAL.triples),
						". Проверка согласованности пройдена."
					]
				})
			] })
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-sm text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 font-medium tabular-nums",
		children: value
	})] });
}
function tone(row) {
	if (row.stage === "won") return "var(--color-good)";
	if ((row.delta ?? 0) <= -.15) return "var(--color-bad)";
	return "var(--color-accent)";
}
function Tip({ active, payload }) {
	if (!active || !payload?.[0]) return null;
	const row = payload[0].payload;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sm border border-line bg-elevated px-3 py-2 text-sm text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: row.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tabular-nums text-muted",
				children: ["Дошли: ", formatInt(row.reached)]
			}),
			row.conversion != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tabular-nums text-muted",
				children: [
					"Дальше ",
					formatPct(row.conversion),
					row.prior != null ? ` · сентябрь ${formatPct(row.prior)}` : ""
				]
			}) : null
		]
	});
}
function readStage(entry) {
	if (!entry || typeof entry !== "object") return null;
	const row = entry;
	return row.payload?.stage ?? row.stage ?? null;
}
function FunnelChart({ onPick }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	const data = funnelRows(DEALS);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-2",
		children: data.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center justify-between text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.short }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-muted",
				children: formatInt(row.reached)
			})]
		}, row.stage))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-72 w-full min-w-0",
		role: "img",
		"aria-label": "Воронка продаж за октябрь",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				layout: "vertical",
				margin: {
					top: 4,
					right: 8,
					left: 0,
					bottom: 4
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						type: "number",
						hide: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						type: "category",
						dataKey: "short",
						width: 112,
						axisLine: false,
						tickLine: false,
						tick: {
							fill: "var(--color-muted)",
							fontSize: 12
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {}),
						cursor: { fill: "var(--color-surface)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "reached",
						radius: [
							0,
							4,
							4,
							0
						],
						cursor: "pointer",
						onClick: (entry) => {
							const stage = readStage(entry);
							if (stage) onPick(stage);
						},
						children: data.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: tone(row) }, row.stage))
					})
				]
			})
		})
	});
}
function Overview() {
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
	const winDelta = stats.winRate - .074;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Сигнал месяца" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl text-ink md:text-3xl",
							children: drop ? `Конверсия «${drop.short}» → следующий этап: ${formatPct(drop.conversion ?? 0)}` : "Воронка без резких провалов"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: drop ? `К сентябрю это ${formatPct(drop.prior ?? 0)} на том же переходе. Выручка при этом ${revenueDelta >= 0 ? "выше" : "ниже"}: закрываются крупные сделки, а середина воронки худеет.` : "Сравнение с сентябрём не показывает провала больше 15 пунктов."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => drop && openStageDrill(drop.stage),
						children: "Разобрать срез"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "quiet",
						onClick: () => setView("risks"),
						children: "Список рисков"
					})]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Выручка октября",
						value: formatMoney(stats.wonRevenue),
						hint: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: revenueDelta >= 0 ? "text-sm text-good" : "text-sm text-bad",
							children: formatRel(revenueDelta / PRIOR_WON_REVENUE)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Конверсия в сделку",
						value: formatPct(stats.winRate),
						hint: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delta, {
							value: winDelta,
							suffix: "к сентябрю"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Открытый пайплайн",
						value: formatMoney(stats.pipeline),
						hint: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted",
							children: [formatInt(stats.openCount), " открытых"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Сделки с риском",
						value: formatInt(stats.riskDeals),
						hint: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-bad",
							children: [
								formatInt(stats.stalled),
								" без движения · ",
								formatInt(stats.fieldGaps),
								" с пустыми полями"
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 xl:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "xl:col-span-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl",
								children: "Воронка"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "К сентябрю · нажмите этап"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelChart, { onPick: openStageDrill }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid gap-2 sm:grid-cols-2",
							children: funnel.filter((row) => row.conversion != null).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "press flex min-h-11 w-full items-center justify-between gap-3 rounded-sm px-2 text-left hover:bg-bg",
								onClick: () => openStageDrill(row.stage),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm",
									children: [row.short, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: " → дальше"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 tabular-nums",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: formatPct(row.conversion ?? 0)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delta, { value: row.delta })]
								})]
							}) }, row.stage))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "xl:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Источники"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Лиды октября и доля успешных"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid gap-3",
							children: sources.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "press w-full rounded-sm text-left hover:bg-bg",
								onClick: () => openSourceDrill(row.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-baseline justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: row.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm tabular-nums text-muted",
											children: [
												formatInt(row.leads),
												" · ",
												formatPct(row.winRate)
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 block",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: row.leads / maxLeads * 100 })
									}),
									row.stalled > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1 block text-sm text-bad",
										children: [formatInt(row.stalled), " зависли"]
									}) : null
								]
							}) }, row.id))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Нагрузка менеджеров"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Открытые сделки и конверсия от лида"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-line",
						children: managers.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "press min-h-11 text-left",
								onClick: () => openManagerDrill(row.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-medium",
									children: row.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted",
									children: [
										formatInt(row.open),
										" открытых · конверсия ",
										formatPct(row.winRate)
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex items-center gap-2",
								children: row.overloaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "press min-h-11 rounded-sm bg-bad-bg px-3 text-sm text-bad",
									onClick: () => openSignal("load"),
									children: "Перегруз"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm tabular-nums text-muted",
									children: formatMoney(row.pipeline)
								})
							})]
						}, row.id))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Как собраны цифры"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Не сводная таблица, а граф: сырые карточки Битрикс24 проходят четыре слоя."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => setView("model"),
							children: "Модель"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-4 grid gap-3",
						children: LAYERS.map((layer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[2rem_1fr] gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-sm text-subtle",
								children: ["0", index + 1]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: layer.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm text-muted",
								children: layer.result
							})] })]
						}, layer.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press mt-4 min-h-11 text-sm font-medium text-accent",
						onClick: () => openSignal("conv"),
						children: "Почему система считает провал правилом, а не мнением"
					})
				] })]
			})
		]
	});
}
function Kpi({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl tabular-nums tracking-tight",
			children: value
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children: hint
		})
	] });
}
function formatRel(ratio) {
	const pct = Math.round(ratio * 100);
	return `${pct > 0 ? "+" : ""}${pct}% к сентябрю`;
}
function Risks() {
	const openDeal = useBi((state) => state.openDeal);
	const openSignal = useBi((state) => state.openSignal);
	const openStageDrill = useBi((state) => state.openStageDrill);
	const openManagerDrill = useBi((state) => state.openManagerDrill);
	const stalled = DEALS.filter((deal) => deal.outcome === "open" && dealRisks(deal).some((risk) => risk.ruleId === "R-ACT-14")).sort((a, b) => b.activityDays - a.activityDays || b.closeSlips - a.closeSlips);
	const gaps = DEALS.filter((deal) => deal.outcome === "open" && deal.missing.length > 0);
	const overloaded = managerRows(DEALS).filter((row) => row.overloaded);
	const drop = funnelRows(DEALS).find((row) => (row.delta ?? 0) <= -.15);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Правила онтологии, а не ручная пометка"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl",
					children: "Где отдел теряет прогноз"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted",
					children: "Каждый сигнал можно открыть и прочитать: какое правило сработало и на каких фактах. Решение фиксируется в журнале."
				})
			] }),
			drop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-sm text-subtle",
					children: [RULES["R-CONV"].name, " · R-CONV"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mt-2 font-display text-xl",
					children: [
						drop.short,
						": ",
						formatPct(drop.conversion ?? 0),
						" вместо ",
						formatPct(drop.prior ?? 0)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: RULES["R-CONV"].plain
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => openSignal("conv"),
						children: "Почему так решено"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "quiet",
						onClick: () => openStageDrill(drop.stage),
						children: "Сделки этапа"
					})]
				})
			] }) : null,
			overloaded.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-sm text-subtle",
					children: [RULES["R-LOAD"].name, " · R-LOAD"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 font-display text-xl",
					children: row.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted",
					children: [
						formatInt(row.open),
						" открытых сделок, конверсия ",
						formatPct(row.winRate),
						". ",
						RULES["R-LOAD"].plain
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => openSignal("load"),
						children: "Почему так решено"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "quiet",
						onClick: () => openManagerDrill(row.id),
						children: "Сделки менеджера"
					})]
				})
			] }, row.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl",
						children: "Нет активности и срок переносили"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm tabular-nums text-muted",
						children: formatInt(stalled.length)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line",
					children: stalled.slice(0, 8).map((deal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: deal.company
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								deal.id,
								" · ",
								managerMeta(deal.manager).name,
								" · ",
								sourceMeta(deal.source).label,
								" ·",
								" ",
								deal.activityDays,
								" дн. без активности · перенос × ",
								deal.closeSlips
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-sm",
								children: formatMoney(deal.amount)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "quiet",
								onClick: () => openDeal(deal.id),
								children: "Почему"
							})]
						})]
					}, deal.id))
				}),
				stalled.length > 8 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "В списке первые 8. Остальные — в детализации, фильтр «Только с риском»."
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "Пустые обязательные поля"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm tabular-nums text-muted",
					children: formatInt(gaps.length)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-line",
				children: gaps.slice(0, 6).map((deal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: deal.company
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							stageMeta(deal.stage).short,
							" · не заполнено: ",
							deal.missing.join(", ")
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "quiet",
						onClick: () => openDeal(deal.id),
						children: "Почему"
					})]
				}, deal.id))
			})] })
		]
	});
}
var NAV = [
	{
		id: "overview",
		label: "Обзор",
		icon: LayoutDashboard
	},
	{
		id: "drill",
		label: "Детализация",
		icon: Waypoints
	},
	{
		id: "risks",
		label: "Риски",
		icon: ShieldAlert
	},
	{
		id: "decisions",
		label: "Решения",
		icon: NotebookPen
	},
	{
		id: "model",
		label: "Модель",
		icon: BookOpen
	}
];
var TITLES = {
	overview: "Обзор отдела продаж",
	drill: "Детализация",
	risks: "Риски и объяснения",
	decisions: "Журнал решений",
	model: "Семантическая модель"
};
function Shell() {
	const view = useBi((state) => state.view);
	const setView = useBi((state) => state.setView);
	const query = useBi((state) => state.query);
	const setQuery = useBi((state) => state.setQuery);
	const hydrate = useBi((state) => state.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-ink md:grid md:grid-cols-[15.5rem_minmax(0,1fr)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden border-r border-line bg-surface md:flex md:flex-col md:px-4 md:py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-8 grid gap-1",
						"aria-label": "Разделы",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
							item,
							active: view === item.id,
							onClick: () => setView(item.id)
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-auto pt-8 text-xs text-subtle",
						children: [
							"Демонстрационный контур ",
							PORTAL.company,
							". Выгрузка Битрикс24, октябрь 2026."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-line px-4 py-4 md:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 md:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Октябрь"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "mt-3 flex gap-2 overflow-x-auto md:hidden",
							"aria-label": "Разделы",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("press min-h-11 shrink-0 rounded-sm px-3 text-sm", view === item.id ? "bg-accent text-accent-fg" : "bg-surface text-ink"),
								onClick: () => setView(item.id),
								children: item.label
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-col gap-3 md:mt-0 md:flex-row md:items-end md:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "hidden text-sm text-muted md:block",
								children: [PORTAL.company, " · Битрикс24 · октябрь 2026"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl tracking-tight",
								children: TITLES[view]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm text-muted",
								children: ["Найти сделку", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: query,
									onChange: (event) => {
										setQuery(event.target.value);
										if (event.target.value && view !== "drill") setView("drill");
									},
									placeholder: "Компания или номер",
									className: "min-h-11 w-full rounded-sm border border-line bg-elevated px-3 text-ink md:w-64 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "px-4 py-5 md:px-8 md:py-6",
					children: [
						view === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {}) : null,
						view === "drill" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drill, {}) : null,
						view === "risks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Risks, {}) : null,
						view === "decisions" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Decisions, {}) : null,
						view === "model" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelView, {}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplainDialog, {})
		]
	});
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex size-10 items-center justify-center rounded-sm bg-accent font-display text-lg text-accent-fg",
			children: "А"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-display text-xl leading-none",
			children: "Аксиома"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-xs text-muted",
			children: "семантический слой"
		})] })]
	});
}
function NavButton({ item, active, onClick }) {
	const Icon = item.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: cn("press flex min-h-11 items-center gap-3 rounded-sm px-3 text-left text-sm", active ? "bg-elevated text-ink" : "text-muted hover:bg-elevated hover:text-ink"),
		onClick,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			"aria-hidden": "true"
		}), item.label]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {});
}
//#endregion
export { Home as component };
