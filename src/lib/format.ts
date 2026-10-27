export function plural(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n);
  const m10 = abs % 10;
  const m100 = abs % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

export function formatMoney(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    const millions = value / 1_000_000;
    const digits = Math.abs(millions) >= 10 ? 1 : 2;
    return `${millions.toLocaleString("ru-RU", {
      minimumFractionDigits: 1,
      maximumFractionDigits: digits,
    })} млн ₽`;
  }
  return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}

export function formatInt(value: number): string {
  return Math.round(value).toLocaleString("ru-RU");
}

export function formatPct(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}

export function formatPp(delta: number): string {
  const pp = Math.round(delta * 100);
  const sign = pp > 0 ? "+" : "";
  return `${sign}${pp} п.п.`;
}

const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

export function formatDay(iso: string): string {
  const [, month, day] = iso.split("-");
  const m = MONTHS[Number(month) - 1] ?? month;
  return `${Number(day)} ${m}`;
}
