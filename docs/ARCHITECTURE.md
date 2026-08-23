# CashRunway V1 Architecture

## Locked stack

HTML5; CSS3; vanilla JavaScript; ES modules; IndexedDB; Chart.js 4.x; Web App Manifest; Service Worker; Cache API; Node built-in test runner; static HTTPS hosting.

## Boundaries

- `src/domain/` — deterministic business rules; no DOM, storage, or network authority.
- `src/storage/` — persistence adapters; no presentation logic.
- `src/ui/` — rendering and user interaction; presentation is not domain authority.
- `src/export/` — import/export boundaries; all external data is untrusted.
- `tests/` — executable proof.

These directories are architectural boundaries, not evidence that product behavior exists yet.

## Invariants

- A1 — Local First
- A2 — Deterministic Domain
- A3 — Integer Money
- A4 — Calendar Dates
- A5 — Domain Separation
- A6 — Presentation Is Not Authority
- A7 — Local Privacy
- A8 — Offline Core

## Prohibited expansion

No React, Vue, Angular, Next.js, application backend, cloud database, server-side rendering, framework state system, authentication, or AI.
