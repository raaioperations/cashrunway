import { dateRange, parseDate, compareDates, daysBetween } from './dates.js';
import { occursOn } from './recurrence.js';

export function validateEvent(event) {
  if (!event.name?.trim()) throw new Error('Event name is required.');
  if (!['in', 'out'].includes(event.direction)) throw new Error('Choose money in or money out.');
  if (!Number.isSafeInteger(event.amountCents) || event.amountCents <= 0) throw new Error('Amount must be a positive safe integer number of cents.');
  if (event.kind === 'oneTime') { parseDate(event.date); return true; }
  if (!['weekly', 'biweekly', 'monthly'].includes(event.frequency)) throw new Error('Choose a supported recurrence.');
  parseDate(event.startDate); if (event.endDate) { parseDate(event.endDate); if (compareDates(event.endDate, event.startDate) < 0) throw new Error('End date must be on or after start date.'); }
  return true;
}

export function forecast({ startingCashCents, forecastStartDate, forecastEndDate, safetyThresholdCents = null, events = [] }) {
  parseDate(forecastStartDate); parseDate(forecastEndDate); if (compareDates(forecastEndDate, forecastStartDate) < 0) throw new Error('Forecast end must be on or after forecast start.');
  events.forEach(validateEvent);
  let balance = startingCashCents; const days = [];
  for (const date of dateRange(forecastStartDate, forecastEndDate)) {
    const moneyIn = events.filter(e => e.direction === 'in' && occursOn(e, date)).reduce((sum, e) => sum + e.amountCents, 0);
    const moneyOut = events.filter(e => e.direction === 'out' && occursOn(e, date)).reduce((sum, e) => sum + e.amountCents, 0);
    const opening = balance; balance += moneyIn - moneyOut; days.push({ date, openingBalanceCents: opening, moneyInCents: moneyIn, moneyOutCents: moneyOut, closingBalanceCents: balance });
  }
  const zero = startingCashCents <= 0 ? 0 : days.find(d => d.closingBalanceCents <= 0);
  const safety = startingCashCents <= (safetyThresholdCents ?? Number.MIN_SAFE_INTEGER) ? 0 : safetyThresholdCents == null ? null : days.find(d => d.closingBalanceCents <= safetyThresholdCents);
  return { days, totalMoneyInCents: days.reduce((s, d) => s + d.moneyInCents, 0), totalMoneyOutCents: days.reduce((s, d) => s + d.moneyOutCents, 0), endingCashCents: balance, lowestCashCents: Math.min(...days.map(d => d.closingBalanceCents), startingCashCents), zeroCrossingDate: zero === 0 ? forecastStartDate : zero?.date ?? null, projectedRunwayDays: zero === 0 ? 0 : zero ? daysBetween(forecastStartDate, zero.date) : null, safetyCrossingDate: safety === 0 ? forecastStartDate : safety?.date ?? null, safetyRunwayDays: safety === 0 ? 0 : safety ? daysBetween(forecastStartDate, safety.date) : null };
}
