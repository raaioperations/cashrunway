import { forecast, validateEvent } from './domain/forecast.js';
import { formatMoney, parseMoneyToCents } from './domain/money.js';
import { addMonths } from './domain/dates.js';
import { cloneScenario } from './domain/scenarios.js';
import { readState, replaceState } from './storage/db.js';
import { entriesCsv, forecastCsv, parseEntriesCsv } from './export/csv.js';

const $ = selector => document.querySelector(selector);
const uid = () => crypto.randomUUID();
let state;
let currentResult;
let saveTimer;
let saveQueue = Promise.resolve();

const emptyState = () => {
  const planId = uid();
  const scenarioId = uid();
  const today = new Date().toISOString().slice(0, 10);
  return {
    plans: [{ id: planId, name: 'My CashRunway Plan', startingCashCents: 0, forecastStartDate: today, forecastEndDate: addMonths(today, 6), safetyThresholdCents: null, baseScenarioId: scenarioId }],
    scenarios: [{ id: scenarioId, planId, name: 'Base', type: 'base', sourceScenarioId: null }],
    cashFlowEvents: [],
    settings: [{ id: 'settings', currencyCode: 'USD', defaultForecastMonths: 6, activeScenarioId: scenarioId }]
  };
};

const plan = () => state.plans[0];
const scenarios = () => state.scenarios;
const activeScenario = () => scenarios().find(s => s.id === $('#scenarioSelect').value) ?? scenarios()[0];
const events = () => state.cashFlowEvents.filter(e => e.scenarioId === activeScenario().id);
const escapeHtml = value => { const div = document.createElement('div'); div.textContent = value; return div.innerHTML; };

function setStatus(message, error = false) { const el = $('#status'); el.textContent = message; el.className = error ? 'status error' : 'status'; }
function save() {
  clearTimeout(saveTimer);
  setStatus('Saving locally…');
  saveTimer = setTimeout(() => {
    plan().updatedAt = new Date().toISOString();
    const snapshot = structuredClone(state);
    saveQueue = saveQueue.then(() => replaceState(snapshot)).then(() => setStatus('Saved locally')).catch(error => setStatus(`Save failed: ${error.message}`, true));
  }, 150);
}
function renderScenarioOptions() {
  $('#scenarioSelect').innerHTML = scenarios().map(s => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join('');
  $('#scenarioSelect').value = state.settings[0].activeScenarioId;
}
function renderEventList() {
  $('#eventList').innerHTML = events().map(e => `<li><span><strong>${escapeHtml(e.name)}</strong> · ${e.direction === 'in' ? 'Money in' : 'Money out'} · ${formatMoney(e.amountCents)} · ${e.kind === 'oneTime' ? e.date : `${e.frequency} from ${e.startDate}`}</span><button class="delete" data-id="${e.id}" aria-label="Delete ${escapeHtml(e.name)}">Delete</button></li>`).join('') || '<li class="muted">No entries yet.</li>';
}
function parseCash(value) { const text = String(value ?? '').trim(); return text === '' || Number(text) === 0 ? 0 : parseMoneyToCents(text); }
function applyInputs() {
  const p = plan();
  p.startingCashCents = parseCash($('#startingCash').value);
  p.forecastStartDate = $('#forecastStart').value;
  p.forecastEndDate = $('#forecastEnd').value;
  const threshold = $('#safetyThreshold').value.trim();
  p.safetyThresholdCents = threshold === '' ? null : parseCash(threshold);
}
function renderMetrics() {
  const r = currentResult;
  const metrics = [['Projected runway', r.projectedRunwayDays == null ? 'Beyond forecast period' : `${r.projectedRunwayDays} days`], ['Safety runway', r.safetyRunwayDays == null ? 'Not configured' : `${r.safetyRunwayDays} days`], ['Ending cash', formatMoney(r.endingCashCents)], ['Lowest cash', formatMoney(r.lowestCashCents)], ['Money in', formatMoney(r.totalMoneyInCents)], ['Money out', formatMoney(r.totalMoneyOutCents)]];
  $('#metrics').innerHTML = metrics.map(([label, value]) => `<div class="metric"><dt>${label}</dt><dd>${value}</dd></div>`).join('');
  $('#forecastTable tbody').innerHTML = r.days.filter(d => d.moneyInCents || d.moneyOutCents || d.date === r.days[0].date || d.date === r.days.at(-1).date).map(d => `<tr><td>${d.date}</td><td>${formatMoney(d.moneyInCents)}</td><td>${formatMoney(d.moneyOutCents)}</td><td>${formatMoney(d.closingBalanceCents)}</td></tr>`).join('');
  drawChart(r.days);
}
function drawChart(days) {
  const width = 760, height = 220, max = Math.max(...days.map(d => d.closingBalanceCents), 1), min = Math.min(...days.map(d => d.closingBalanceCents), 0), range = max - min || 1;
  const points = days.map((d, i) => `${(i / Math.max(days.length - 1, 1)) * width},${height - ((d.closingBalanceCents - min) / range) * height}`).join(' ');
  const zeroY = height - ((0 - min) / range) * height;
  $('#chart').innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="chartTitle chartDesc"><title id="chartTitle">Projected cash balance over time</title><desc id="chartDesc">A line showing projected closing cash from ${days[0].date} to ${days.at(-1).date}.</desc><line x1="0" y1="${zeroY}" x2="${width}" y2="${zeroY}" class="zero"/><polyline points="${points}" class="line"/></svg>`;
}
function recalculate() {
  try { applyInputs(); currentResult = forecast({ ...plan(), events: events() }); renderMetrics(); renderEventList(); save(); }
  catch (error) { setStatus(error.message, true); }
}
function addEvent(event) {
  try { validateEvent(event); state.cashFlowEvents.push({ ...event, id: uid(), scenarioId: activeScenario().id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }); $('#eventForm').reset(); $('#eventDate').value = plan().forecastStartDate; $('#eventStartDate').value = plan().forecastStartDate; recalculate(); }
  catch (error) { setStatus(error.message, true); }
}
function download(name, text, type = 'text/plain') { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click(); URL.revokeObjectURL(a.href); }
function render() { const p = plan(); $('#startingCash').value = (p.startingCashCents / 100).toFixed(2); $('#forecastStart').value = p.forecastStartDate; $('#forecastEnd').value = p.forecastEndDate; $('#safetyThreshold').value = p.safetyThresholdCents == null ? '' : (p.safetyThresholdCents / 100).toFixed(2); renderScenarioOptions(); recalculate(); }

function bind() {
  $('#scenarioSelect').onchange = () => { state.settings[0].activeScenarioId = $('#scenarioSelect').value; render(); };
  ['startingCash', 'forecastStart', 'forecastEnd', 'safetyThreshold'].forEach(id => $('#' + id).onchange = recalculate);
  $('#periods').onclick = e => { if (e.target.dataset.months) { $('#forecastEnd').value = addMonths($('#forecastStart').value, Number(e.target.dataset.months)); recalculate(); } };
  $('#eventKind').onchange = () => { const recurring = $('#eventKind').value === 'recurring'; $('#oneTimeFields').hidden = recurring; $('#recurringFields').hidden = !recurring; };
  $('#eventForm').onsubmit = e => { e.preventDefault(); const recurring = $('#eventKind').value === 'recurring'; addEvent({ name: $('#eventName').value.trim(), direction: $('#eventDirection').value, kind: $('#eventKind').value, amountCents: parseMoneyToCents($('#eventAmount').value), date: recurring ? null : $('#eventDate').value, frequency: recurring ? $('#frequency').value : null, startDate: recurring ? $('#eventStartDate').value : null, endDate: recurring ? ($('#eventEndDate').value || null) : null }); };
  $('#eventList').onclick = e => { if (e.target.dataset.id) { state.cashFlowEvents = state.cashFlowEvents.filter(item => item.id !== e.target.dataset.id); recalculate(); setStatus('Entry deleted · Saved locally'); } };
  $('#duplicateScenario').onclick = () => { if (scenarios().length >= 3) return setStatus('Maximum of three scenarios reached.', true); const copy = cloneScenario({ ...activeScenario(), events: events() }); state.scenarios.push({ ...copy, id: copy.id, planId: plan().id }); state.cashFlowEvents.push(...copy.events); state.settings[0].activeScenarioId = copy.id; render(); setStatus('Scenario created · Saved locally'); };
  $('#deleteScenario').onclick = () => { const current = activeScenario(); if (current.type === 'base') return setStatus('Base cannot be deleted.', true); state.scenarios = scenarios().filter(s => s.id !== current.id); state.cashFlowEvents = state.cashFlowEvents.filter(e => e.scenarioId !== current.id); state.settings[0].activeScenarioId = plan().baseScenarioId; render(); };
  $('#exportEntries').onclick = () => download('cashrunway-entries.csv', entriesCsv(events()), 'text/csv');
  $('#exportForecast').onclick = () => download('cashrunway-forecast.csv', forecastCsv(currentResult.days), 'text/csv');
  $('#backup').onclick = () => download('cashrunway-backup.json', JSON.stringify({ application: 'CashRunway', schemaVersion: 1, ...state }, null, 2), 'application/json');
  $('#importFile').onchange = async e => { try { const text = await e.target.files[0].text(); const incoming = parseEntriesCsv(text); if (!confirm(`Import ${incoming.length} entries?`)) return; state.cashFlowEvents.push(...incoming.map(item => ({ ...item, id: uid(), scenarioId: activeScenario().id }))); render(); setStatus(`Imported ${incoming.length} entries · Saved locally`); } catch (error) { setStatus(`Import rejected: ${error.message}`, true); } e.target.value = ''; };
  $('#restoreFile').onchange = async e => { try { const incoming = JSON.parse(await e.target.files[0].text()); if (incoming.application !== 'CashRunway' || incoming.schemaVersion !== 1 || !Array.isArray(incoming.plans) || !Array.isArray(incoming.scenarios) || !Array.isArray(incoming.cashFlowEvents)) throw new Error('Invalid CashRunway backup.'); if (!confirm('Replace current data with this backup?')) return; state = incoming; await replaceState(state); render(); setStatus('Backup restored · Saved locally'); } catch (error) { setStatus(`Restore rejected: ${error.message}`, true); } e.target.value = ''; };
}

async function init() {
  try { state = await readState(); if (!state.plans?.length) { state = emptyState(); await replaceState(state); } bind(); render(); }
  catch (error) { setStatus('Local storage is unavailable. Use a browser with IndexedDB enabled.', true); }
}
init();
