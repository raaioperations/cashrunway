# Validation Plan

Evidence hierarchy:

Foundation validation → contract implementation → automated tests → local runtime proof → automated purposeful demonstration → release candidate → production validation → final lock.

The Foundation validator checks only artifacts that legitimately exist. It must evolve as implementation proceeds; existing required validation may not be silently removed or weakened.

HUMAN ACCEPTANCE:
WAIVED BY USER FOR CASHRUNWAY V1

Automated purposeful demonstration remains mandatory.
Runtime proof remains mandatory.

Local domain, static, and direct Playwright Edge offline runtime checks are passing. Production validation, GitHub Pages, and RAAI Operations validation remain open gates.

Direct offline runtime evidence: `npx playwright test tests/offline.runtime.spec.js --config=playwright.config.js` — PASS. The test verified service-worker control, `cashrunway-v1` cache presence, IndexedDB state, canonical forecast, offline reload, offline recalculation, visible save feedback, offline persistence, and return-online.
