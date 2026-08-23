const DATE = /^\d{4}-\d{2}-\d{2}$/;
export function parseDate(value) {
  if (!DATE.test(value)) throw new Error('Use a valid calendar date (YYYY-MM-DD).');
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) throw new Error('Use a valid calendar date.');
  return date;
}
export function dateKey(date) { return date.toISOString().slice(0, 10); }
export function compareDates(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
export function addDays(value, days) { const date = parseDate(value); date.setUTCDate(date.getUTCDate() + days); return dateKey(date); }
export function daysBetween(start, end) { return Math.round((parseDate(end) - parseDate(start)) / 86400000); }
export function daysInMonth(year, month) { return new Date(Date.UTC(year, month, 0)).getUTCDate(); }
export function addMonths(value, months) { const date = parseDate(value); const anchor = date.getUTCDate(); const target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1)); target.setUTCDate(Math.min(anchor, daysInMonth(target.getUTCFullYear(), target.getUTCMonth() + 1))); return dateKey(target); }
export function dateRange(start, end) { const result = []; for (let date = start; compareDates(date, end) <= 0; date = addDays(date, 1)) result.push(date); return result; }
