import test from 'node:test';
import assert from 'node:assert/strict';
import { parseMoneyToCents } from '../src/domain/money.js';
import { addMonths, daysBetween } from '../src/domain/dates.js';
import { forecast } from '../src/domain/forecast.js';

const canonical = { startingCashCents: 1000000, forecastStartDate: '2026-09-01', forecastEndDate: '2027-02-28', safetyThresholdCents: 250000, events: [
  { name: 'Client Revenue', direction: 'in', kind: 'recurring', amountCents: 400000, frequency: 'monthly', startDate: '2026-09-01' },
  { name: 'Operating Expenses', direction: 'out', kind: 'recurring', amountCents: 550000, frequency: 'monthly', startDate: '2026-09-01' },
  { name: 'Equipment Purchase', direction: 'out', kind: 'oneTime', amountCents: 200000, date: '2026-11-15' }
] };

test('CR-MONEY-001 parses integer cents', () => { assert.equal(parseMoneyToCents('10.05'), 1005); assert.throws(() => parseMoneyToCents('1.001')); });
test('CR-DATE-001 preserves monthly anchors', () => { assert.equal(addMonths('2027-01-31', 1), '2027-02-28'); assert.equal(addMonths('2027-01-31', 2), '2027-03-31'); });
test('CR-FORECAST canonical fixture and runway', () => { const result = forecast(canonical); assert.equal(result.totalMoneyInCents, 2400000); assert.equal(result.totalMoneyOutCents, 3500000); assert.equal(result.endingCashCents, -100000); assert.equal(result.lowestCashCents, -100000); assert.equal(result.safetyCrossingDate, '2026-12-01'); assert.equal(result.safetyRunwayDays, 91); assert.equal(result.zeroCrossingDate, '2027-02-01'); assert.equal(result.projectedRunwayDays, 153); });
test('same-day events aggregate with inclusive boundaries', () => { const r = forecast({ startingCashCents: 1000, forecastStartDate: '2026-01-01', forecastEndDate: '2026-01-02', events: [{ name: 'in', direction: 'in', kind: 'oneTime', amountCents: 500, date: '2026-01-01' }, { name: 'out', direction: 'out', kind: 'oneTime', amountCents: 100, date: '2026-01-01' }] }); assert.equal(r.days[0].closingBalanceCents, 1400); assert.equal(r.days.length, 2); });
