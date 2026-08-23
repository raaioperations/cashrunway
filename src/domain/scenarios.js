export function cloneScenario(scenario) {
  const id = crypto.randomUUID();
  return { ...structuredClone(scenario), id, name: `${scenario.name} Copy`, type: 'alternative', sourceScenarioId: scenario.id, events: scenario.events.map(event => ({ ...event, id: crypto.randomUUID(), scenarioId: id })) };
}
