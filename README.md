# CashRunway

CashRunway is a local-first personal cash runway planner intended to help people understand how long available cash may last under explicit, deterministic V1 rules.

## Lifecycle

This repository is at the **V1 implementation / local validation** stage on `codex/cashrunway-v1`. The deterministic forecast engine, local planner shell, persistence boundary, scenario snapshots, portability flows, and offline assets are implemented. Publication and production validation are not complete.

Run the canonical checks with:

```sh
npm test
npm run validate
```

The locked architecture is HTML5, CSS3, vanilla JavaScript with ES modules, IndexedDB, Chart.js 4.x when product work is authorized, Web App Manifest, Service Worker, Cache API, Node's built-in test runner, and static HTTPS hosting. CashRunway is local-first and privacy-oriented: financial data must remain local.

The authoritative specification is [docs/MASTER_SPECIFICATION.md](docs/MASTER_SPECIFICATION.md). Architecture and contracts are recorded in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/CONTRACTS.md](docs/CONTRACTS.md).

The future production URL is `https://raaioperations.github.io/cashrunway/`; the future repository is `raaioperations/cashrunway`. Neither is active in this foundation stage.

The protected Foundation baseline is `b3441cf`. Do not expand scope into accounting, banking, authentication, cloud sync, AI, payment processing, subscriptions, or financial advice.
