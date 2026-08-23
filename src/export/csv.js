import { compareDates, parseDate } from '../domain/dates.js';

const ENTRY_COLUMNS = ['name', 'direction', 'kind', 'amount', 'date', 'frequency', 'start_date', 'end_date'];
const FORECAST_COLUMNS = ['date', 'money_in', 'money_out', 'closing_balance'];

export function escapeCsv(value) { const text = String(value ?? ''); return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text; }
export function toCsv(rows, columns) { return [columns.join(','), ...rows.map(row => columns.map(column => escapeCsv(row[column])).join(','))].join('\n') + '\n'; }
export function entriesCsv(events) { return toCsv(events.map(e => ({ name: e.name, direction: e.direction, kind: e.kind, amount: (e.amountCents / 100).toFixed(2), date: e.date ?? '', frequency: e.frequency ?? '', start_date: e.startDate ?? '', end_date: e.endDate ?? '' })), ENTRY_COLUMNS); }
export function forecastCsv(days) { return toCsv(days.map(d => ({ date: d.date, money_in: (d.moneyInCents / 100).toFixed(2), money_out: (d.moneyOutCents / 100).toFixed(2), closing_balance: (d.closingBalanceCents / 100).toFixed(2) })), FORECAST_COLUMNS); }

function parseLines(text) {
  const lines = []; let row = []; let cell = ''; let quoted = false;
  for (let i = 0; i < text.length; i++) { const c = text[i]; if (c === '"' && quoted && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') quoted = !quoted; else if (c === ',' && !quoted) { row.push(cell); cell = ''; } else if (c === '\n' && !quoted) { row.push(cell); lines.push(row); row = []; cell = ''; } else if (c !== '\r') cell += c; }
  if (cell || row.length) { row.push(cell); lines.push(row); }
  if (quoted) throw new Error('CSV contains an unterminated quoted field.');
  return lines;
}

export function parseEntriesCsv(text) {
  const rows = parseLines(text);
  if (!rows.length || rows[0].join(',') !== ENTRY_COLUMNS.join(',')) throw new Error('CSV must use the exact Entries schema.');
  const result = rows.slice(1).filter(r => r.some(Boolean)).map(r => {
    if (r.length !== ENTRY_COLUMNS.length) throw new Error('CSV row has the wrong number of columns.');
    const [name, direction, kind, amount, date, frequency, startDate, endDate] = r;
    const dollars = /^\d+(?:\.\d{1,2})?$/.test(amount) ? amount.split('.') : null;
    if (!dollars) throw new Error(`Invalid amount for ${name || 'entry'}.`);
    const amountCents = Number(dollars[0]) * 100 + Number((dollars[1] ?? '').padEnd(2, '0'));
    if (!name || !['in', 'out'].includes(direction) || !['oneTime', 'recurring'].includes(kind) || !Number.isSafeInteger(amountCents) || amountCents <= 0) throw new Error('Invalid entry fields.');
    if (kind === 'oneTime' && (!date || frequency || startDate || endDate)) throw new Error('One-time entry fields are invalid.');
    if (kind === 'recurring' && (date || !['weekly', 'biweekly', 'monthly'].includes(frequency) || !startDate)) throw new Error('Recurring entry fields are invalid.');
    if (kind === 'oneTime') parseDate(date);
    if (kind === 'recurring') { parseDate(startDate); if (endDate) { parseDate(endDate); if (compareDates(endDate, startDate) < 0) throw new Error('Recurring end date is before start date.'); } }
    return { name, direction, kind, amountCents, date: date || null, frequency: frequency || null, startDate: startDate || null, endDate: endDate || null };
  });
  const identities = new Set();
  for (const entry of result) { const identity = JSON.stringify(entry); if (identities.has(identity)) throw new Error(`Duplicate entry: ${entry.name}.`); identities.add(identity); }
  return result;
}
