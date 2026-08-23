# CashRunway

CashRunway is a local-first personal cash runway planner intended to help people understand how long available cash may last under explicit, deterministic V1 rules.

## Lifecycle

This repository is at the **FOUNDATION** stage. Product implementation has not begun. The static entry point is an inert shell only; it is not a functional planner and is not shipped.

Run the canonical checks with:

```sh
npm test
npm run validate
```

The locked architecture is HTML5, CSS3, vanilla JavaScript with ES modules, IndexedDB, Chart.js 4.x when product work is authorized, Web App Manifest, Service Worker, Cache API, Node's built-in test runner, and static HTTPS hosting. CashRunway is local-first and privacy-oriented: financial data must remain local.

The authoritative specification is [docs/MASTER_SPECIFICATION.md](docs/MASTER_SPECIFICATION.md). Architecture and contracts are recorded in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/CONTRACTS.md](docs/CONTRACTS.md).

The future production URL is `https://raaioperations.github.io/cashrunway/`; the future repository is `raaioperations/cashrunway`. Neither is active in this foundation stage.

Do not begin Forecast Engine work, planner behavior, scenarios, charts, application persistence, CSV, backup/restore, PWA behavior, deployment, or publication until the protected Foundation baseline is accepted.
