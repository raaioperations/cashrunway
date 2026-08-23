import test from 'node:test';
import assert from 'node:assert/strict';
import { parseMoneyToCents } from '../src/domain/money.js';
import { addDays, addMonths } from '../src/domain/dates.js';
import { forecast } from '../src/domain/forecast.js';
import { entriesCsv, parseEntriesCsv } from '../src/export/csv.js';

const oneTime = (direction, amountCents, date = '2026-01-01') => ({ name: `${direction}-${date}`, direction, kind: 'oneTime', amountCents, date });
const recurring = (direction, amountCents, frequency, startDate = '2026-01-01', endDate = null) => ({ name: `${direction}-${frequency}`, direction, kind: 'recurring', amountCents, frequency, startDate, endDate });
const plan = (events, overrides = {}) => ({ startingCashCents: 10000, forecastStartDate: '2026-01-01', forecastEndDate: '2026-01-10', events, ...overrides });

test('forecast matrix covers starting cash, one-time flows, net change, and growth', () => {
  assert.equal(forecast(plan([])).endingCashCents, 10000);
  assert.equal(forecast(plan([oneTime('in', 500)])).endingCashCents, 10500);
  assert.equal(forecast(plan([oneTime('out', 500)])).endingCashCents, 9500);
  assert.equal(forecast(plan([oneTime('in', 500), oneTime('out', 500)])).endingCashCents, 10000);
  assert.equal(forecast(plan([recurring('in', 1000, 'weekly')])).days[7].closingBalanceCents, 12000);
});

test('weekly, biweekly, monthly, mixed flows, and recurrence end are calendar deterministic', () => {
  const weekly = forecast(plan([recurring('in', 100, 'weekly')])).totalMoneyInCents;
  const biweekly = forecast(plan([recurring('in', 100, 'biweekly')])).totalMoneyInCents;
  const monthly = forecast(plan([recurring('in', 100, 'monthly')])).totalMoneyInCents;
  assert.equal(weekly, 200); assert.equal(biweekly, 100); assert.equal(monthly, 100);
  assert.equal(forecast(plan([recurring('in', 100, 'weekly', '2026-01-01', '2026-01-08')])).totalMoneyInCents, 200);
  assert.equal(forecast(plan([recurring('in', 100, 'weekly'), recurring('out', 25, 'biweekly')])).days[7].closingBalanceCents, 10175);
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(addMonths('2028-01-31', 1), '2028-02-29');
  assert.equal(addMonths('2027-01-31', 1), '2027-02-28');
  assert.equal(addMonths('2027-03-31', 1), '2027-04-30');
});

test('forecast crossings include zero, safety, negative starts, and no crossing', () => {
  const zero = forecast(plan([oneTime('out', 10000)]));
  assert.equal(zero.projectedRunwayDays, 0); assert.equal(zero.zeroCrossingDate, '2026-01-01');
  const threshold = forecast(plan([oneTime('out', 5000)], { safetyThresholdCents: 6000 }));
  assert.equal(threshold.safetyRunwayDays, 0); assert.equal(threshold.safetyCrossingDate, '2026-01-01');
  assert.equal(forecast(plan([], { startingCashCents: 0 })).projectedRunwayDays, 0);
  assert.equal(forecast(plan([], { startingCashCents: -1 })).projectedRunwayDays, 0);
  assert.equal(forecast(plan([], { startingCashCents: 0, safetyThresholdCents: 100 })).safetyRunwayDays, 0);
  assert.equal(forecast(plan([recurring('in', 1000, 'weekly')])).projectedRunwayDays, null);
});

test('invalid financial structures are rejected', () => {
  assert.throws(() => parseMoneyToCents('1.001')); assert.throws(() => parseMoneyToCents('abc')); assert.throws(() => parseMoneyToCents('90071992547409.92'));
  assert.throws(() => forecast(plan([oneTime('in', 0)])));
  assert.throws(() => forecast(plan([oneTime('in', 100, '2026-02-30')])));
  assert.throws(() => forecast(plan([], { forecastStartDate: '2026-02-02', forecastEndDate: '2026-02-01' })));
  assert.throws(() => forecast(plan([recurring('in', 100, 'daily')])));
  assert.throws(() => forecast(plan([recurring('in', 100, 'weekly', '2026-01-02', '2026-01-01')])));
});

test('CSV matrix covers recurring rows, exact schema, missing fields, unsupported frequency, and atomic errors', () => {
  const rows = [oneTime('in', 500), recurring('out', 250, 'monthly')];
  const parsed = parseEntriesCsv(entriesCsv(rows));
  assert.equal(parsed.length, 2); assert.equal(parsed[1].frequency, 'monthly');
  assert.throws(() => parseEntriesCsv('name,direction,kind,amount,date,frequency,start_date\nmissing,out,oneTime,1.00,2026-01-01,,,'));
  assert.throws(() => parseEntriesCsv('name,direction,kind,amount,date,frequency,start_date,end_date\na,in,recurring,1.00,,daily,2026-01-01,'));
  assert.throws(() => parseEntriesCsv('name,direction,kind,amount,date,frequency,start_date,end_date\na,in,oneTime,1.00,2026-02-30,,,\n'));
  assert.throws(() => parseEntriesCsv('name,direction,kind,amount,date,frequency,start_date,end_date\na,in,oneTime,1.00,2026-01-01,,,\na,in,oneTime,1.00,2026-01-01,,,\n'));
});
