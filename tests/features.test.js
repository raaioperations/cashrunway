import test from 'node:test';
import assert from 'node:assert/strict';
import { entriesCsv, parseEntriesCsv } from '../src/export/csv.js';
import { cloneScenario } from '../src/domain/scenarios.js';

test('CR-IMPORT-001 round-trips escaped entry values atomically', () => {
  const source = [{ name: 'Client, Inc. "A"', direction: 'in', kind: 'oneTime', amountCents: 12345, date: '2026-09-01', frequency: null, startDate: null, endDate: null }];
  const result = parseEntriesCsv(entriesCsv(source));
  assert.deepEqual(result, source);
  assert.throws(() => parseEntriesCsv('name,direction,kind,amount,date,frequency,start_date,end_date\nBad,out,oneTime,not-money,2026-01-01,,,,'));
});

test('CR-SCENARIO-001 clones independent scenario and event identities', () => {
  const source = { id: 'base', name: 'Base', type: 'base', events: [{ id: 'event-1', scenarioId: 'base', name: 'Rent' }] };
  const copy = cloneScenario(source);
  assert.notEqual(copy.id, source.id); assert.notEqual(copy.events[0].id, source.events[0].id); assert.equal(copy.events[0].scenarioId, copy.id); assert.equal(source.events[0].scenarioId, 'base');
});
