# CashRunway — Version 1 Master Specification v2.1

**Portfolio position:** App #4
**Product:** CashRunway
**Version target:** V1.0.0
**Stage:** Stage 1 — Static / Local Utilities
**Product type:** Local-first cash-runway and scenario-planning PWA
**Specification status:** AUTHORITATIVE
**Build model:** Foundation → One-Prompt Full V1 → Runtime Proof → Purposeful Demonstration → Release → Final Lock
**Recommended implementation model:** GPT-5.6 Luna
**Recommended reasoning:** Medium
**Ordinary milestone prompt sequencing:** BYPASSED CONDITIONALLY
**Quality gates:** NOT BYPASSED
**Human acceptance:** WAIVED BY USER FOR CASHRUNWAY V1 ONLY

**v2.1 governance update:** Adds the explicit CashRunway V1 human-acceptance waiver while preserving all automated validation, runtime-proof, publication, security/privacy, Git, and Final Lock gates.

---

# 1. Governing Objective

CashRunway answers one financially meaningful question:

> **Given the cash I have and the money I expect to come in and go out, how long does my cash last under this scenario?**

It converts explicit user-entered assumptions into a deterministic time-based cash forecast.

The product sequence is:

**Cash available**
**→ Money in**
**→ Money out**
**→ Forecast**
**→ Runway**
**→ Scenario change**
**→ Comparison**

CashRunway is:

- a planning tool;
- a forecasting utility;
- local-first;
- deterministic;
- offline-capable.

CashRunway is not:

- accounting;
- banking;
- bookkeeping;
- financial advice;
- tax software;
- investment software.

The application must never imply that its projections know what will actually happen.

---

# 2. Version 1 Customer

Primary V1 customer:

> **A freelancer, solo operator, or microbusiness owner with irregular client income and recurring operating costs who currently estimates financial runway using mental math, their bank balance, or a spreadsheet.**

The V1 customer typically:

- has no dedicated finance staff;
- understands their likely incoming and outgoing cash;
- wants a faster answer than maintaining a detailed spreadsheet;
- needs to test what-if assumptions;
- values privacy and simplicity.

CashRunway is specifically oriented toward **business operating cash**.

Do not broaden V1 into general household budgeting.

---

# 3. V1 Product Contract

## Included

CashRunway V1 must provide:

- one active cash-runway plan;
- starting cash;
- forecast start date;
- forecast end date;
- optional safety-cash threshold;
- recurring money-in events;
- recurring money-out events;
- one-time money-in events;
- one-time money-out events;
- weekly recurrence;
- biweekly recurrence;
- monthly recurrence;
- deterministic daily forecasting;
- projected runway;
- safety runway;
- ending cash;
- lowest projected balance;
- total projected money in;
- total projected money out;
- cash-flow timeline;
- projected cash-balance chart;
- one Base scenario;
- up to two Alternative scenarios;
- side-by-side scenario comparison;
- local IndexedDB persistence;
- Entries CSV import;
- Entries CSV export;
- Forecast CSV export;
- JSON backup;
- JSON restore;
- responsive mobile/desktop behavior;
- PWA installation;
- offline operation;
- baseline accessibility;
- explicit visible system feedback;
- concise financial disclaimer.

## Explicitly excluded

V1 does not include:

- bank connections;
- Plaid;
- transaction synchronization;
- credit-card synchronization;
- QuickBooks;
- Xero;
- accounting synchronization;
- bookkeeping;
- invoicing;
- payroll;
- receipt management;
- tax calculation;
- tax advice;
- financial recommendations;
- debt recommendations;
- investment recommendations;
- lending;
- credit scoring;
- household budgeting;
- user accounts;
- authentication;
- cloud storage;
- cloud synchronization;
- cross-device synchronization;
- teams;
- collaboration;
- application backend;
- backend database;
- subscription billing;
- payment processing;
- entitlement infrastructure;
- AI forecasting;
- machine learning;
- probabilistic forecasting;
- automated revenue prediction;
- enterprise reporting.

Any pressure toward these areas must be classified:

**FUTURE PORTFOLIO OPPORTUNITY**

and must not alter CashRunway V1.

---

# 4. Foundation Standard

No feature implementation may begin until the CashRunway development Foundation exists.

The one-prompt execution is authorized to establish this Foundation itself before beginning product behavior.

The required progression is:

**PROJECT**
**→ CANONICAL DIRECTORY**
**→ GIT REPOSITORY**
**→ FOUNDATION**
**→ PROTECTED BASELINE**
**→ VS CODE/CODEX WORKSPACE**
**→ WORKING BRANCH**
**→ AUTHORIZED IMPLEMENTATION**

## Canonical Workspace

Use:

```text
~/Projects/CashRunway

```

There must be exactly one canonical working repository.

Do not create duplicate project folders or unnecessary worktrees.

Branches are the default.

Worktrees are reserved for genuine simultaneous execution.

## Git

Primary branch:

```text
main

```

V1 implementation branch:

```text
codex/cashrunway-v1

```

Before changing existing work, inspect:

```bash
pwd
git status --short
git branch --show-current
git log -1 --oneline

```

If unexplained changes make the baseline ambiguous:

```text
STATUS: BLOCKED

```

Do not overwrite uncertain work.

## Required Foundation

Before product behavior begins, establish only the justified project structure.

Expected structure may resemble:

```text
CashRunway/
├── README.md
├── package.json
├── .gitignore
├── index.html
├── styles/
├── src/
│   ├── domain/
│   ├── storage/
│   ├── ui/
│   └── export/
├── tests/
├── scripts/
│   └── validate.sh
├── docs/
│   ├── MASTER_SPECIFICATION.md
│   ├── ARCHITECTURE.md
│   ├── CONTRACTS.md
│   ├── VALIDATION.md
│   └── RELEASE.md
└── .github/

```

Exact structure may differ only where materially simpler.

Foundation must establish:

1. product identity;
2. V1 scope;
3. architecture decisions;
4. architecture invariants;
5. contract register;
6. acceptance gates;
7. test strategy;
8. validation entry point;
9. repository rules for Codex;
10. browser/runtime validation strategy;
11. release requirements;
12. clean protected Git baseline.

## Validation Entry Point

The project must have one canonical command:

```bash
sh scripts/validate.sh

```

That command becomes the authoritative automated validation entry point.

It should eventually perform all relevant:

- unit tests;
- structural checks;
- syntax checks;
- regression checks;
- release/static checks;

available at the current implementation stage.

Tests may become stronger as V1 develops.

They must never silently become weaker.

---

# 5. Architecture

Use:

- HTML5;
- CSS3;
- vanilla JavaScript;
- ES modules;
- IndexedDB;
- Chart.js 4.x;
- Web App Manifest;
- Service Worker;
- Cache API;
- Node built-in test runner;
- static HTTPS hosting.

Do not introduce:

- React;
- Vue;
- Angular;
- Next.js;
- application backend;
- server-side rendering;
- production Node server;
- cloud database;
- framework-level state management;
- bundler unless a proven implementation requirement exists.

## Architectural Invariants

The following are locked for V1.

### A1 — Local First

Core CashRunway functionality must require no backend.

### A2 — Deterministic Domain

Forecast results must depend only on:

```text
input data + specification rules

```

Identical input must produce identical output.

### A3 — Integer Money

Authoritative financial arithmetic uses integer cents.

### A4 — Calendar Dates

Financial dates use timezone-independent calendar-date semantics.

### A5 — Domain Separation

Forecast calculations must not depend on:

- DOM;
- Chart.js;
- IndexedDB;
- browser rendering.

### A6 — Presentation Is Not Authority

Charts and summary cards consume domain output.

They do not calculate financial truth independently.

### A7 — Local Privacy

Private financial values must not be sent to third parties.

### A8 — Offline Core

After successful installation/load, all core product capabilities must remain available offline.

---

# 6. Contract System

CashRunway must use explicit behavioral contracts.

Contracts are implementation constraints and runtime-proof targets.

They are not merely documentation.

## Contract Precedence

When instructions conflict, resolve in this order:

**1. Accepted project-specific behavior**
**2. Existing Tier 1 reusable contract**
**3. Established proven portfolio pattern**
**4. New project-specific Tier 3 contract**
**5. Implementation preference**

Do not override accepted behavior for convenience.

Do not silently weaken an existing reusable contract.

Do not promote a new CashRunway contract to Tier 1 merely because it was implemented successfully once.

Promotion requires separate evidence and acceptance.

---

# 7. CashRunway V1 Contract Register

The following begin as **project-specific Tier 3 contracts** unless an already-established Tier 1 portfolio contract clearly governs the same behavior.

## CR-MONEY-001 — Deterministic Money

All authoritative values use integer cents.

No binary-floating dollar arithmetic may determine a financial result.

## CR-DATE-001 — Calendar-Date Stability

`YYYY-MM-DD` financial dates must produce identical results regardless of:

- local timezone;
- daylight-saving transition;
- browser session time.

## CR-RECURRENCE-001 — Recurrence

V1 supports exactly:

```text
weekly
biweekly
monthly

```

Weekly = 7 calendar days.

Biweekly = 14 calendar days.

Monthly preserves its original anchor day and clamps only individual invalid months.

## CR-FORECAST-001 — Daily Forecast

Forecast resolution is one calendar day.

Forecast start and end are inclusive.

For each date:

```text
opening cash
+ all money in
- all money out
= closing cash

```

## CR-RUNWAY-001 — Runway

Projected Runway is the number of calendar days from forecast start to the first date where:

```text
closingBalanceCents <= 0

```

Start date is Day 0.

No crossing within the configured horizon means:

```text
Beyond forecast period

```

not infinity.

## CR-SAFETY-001 — Safety Runway

Safety Runway uses the first closing balance:

```text
<= safetyThresholdCents

```

## CR-SCENARIO-001 — Scenario Isolation

Alternative scenarios are snapshots.

Editing an Alternative must not mutate Base.

Editing Base must not retroactively mutate an existing Alternative.

## CR-PERSIST-001 — Persistence

Accepted user data must survive:

```text
edit
→ autosave
→ reload
→ reopen

```

without changing calculated results.

## CR-IMPORT-001 — Atomic Import

Malformed CSV import must never partially modify persisted state.

## CR-BACKUP-001 — Safe Restore

A failed backup restore must leave existing persisted data intact.

## CR-OFFLINE-001 — Offline Core

The validated core workflow must remain functional after network disconnection.

## CR-A11Y-001 — Nonvisual Financial Truth

A chart may supplement financial output.

It may never be the sole representation of the forecast.

## CR-FEEDBACK-001 — Visible User Feedback

Important user actions must provide visible response.

Examples:

- data saved;
- import accepted/rejected;
- backup restored;
- scenario created;
- invalid input;
- offline state where useful.

Invisible success is not sufficient.

## CR-RELEASE-001 — Protected Release

V1 cannot be Final Locked until:

- automated validation passes;
- runtime proof passes;
- purposeful demonstration is accepted;
- production behavior is validated;
- repository is clean;
- release commit is established;
- GitHub publication works;
- RAAI Operations listing works.

---

# 8. Financial Data Model

## Plan

```text
Plan
id
schemaVersion
name
startingCashCents
forecastStartDate
forecastEndDate
safetyThresholdCents | null
baseScenarioId
createdAt
updatedAt

```

V1 supports one active Plan.

Plan-level assumptions shared between comparisons are:

- starting cash;
- forecast dates;
- safety threshold.

Multiple independent plans are deferred.

## Scenario

```text
Scenario
id
planId
name
type: base | alternative
sourceScenarioId | null
createdAt
updatedAt

```

Rules:

- exactly one Base;
- zero to two Alternatives;
- maximum three total;
- Alternatives deep-copy scenario events;
- copied events receive independent identities.

## CashFlowEvent

```text
CashFlowEvent
id
scenarioId
name
direction: in | out
kind: oneTime | recurring
amountCents
date | null
frequency | null
startDate | null
endDate | null
createdAt
updatedAt

```

### One-Time

Requires:

```text
name
direction
amountCents
date

```

### Recurring

Requires:

```text
name
direction
amountCents
frequency
startDate

```

Optional:

```text
endDate

```

## Settings

```text
Settings
currencyCode
defaultForecastMonths
activeScenarioId

```

V1 currency:

```text
USD

```

No currency conversion.

---

# 9. Forecast Rules

## Date Representation

Domain dates:

```text
YYYY-MM-DD

```

No intraday forecast semantics exist.

Use timezone-neutral calendar logic.

## Forecast Resolution

One calendar day.

Maximum forecast:

```text
24 months

```

Default:

```text
6 months

```

Quick choices:

```text
3 months
6 months
12 months

```

## Starting Cash

`startingCashCents` represents available cash at the beginning of the forecast start date.

Events on that date then apply.

Negative starting cash is valid.

Starting cash `<= 0` produces:

```text
Runway = 0 days

```

## Event Amounts

Amounts must:

- be positive safe integers;
- represent cents.

Direction determines effect.

Never encode direction through a negative amount.

## Weekly

Every 7 calendar days from the anchor.

## Biweekly

Every 14 calendar days from the anchor.

## Monthly

Preserve original anchor day.

Example:

```text
2027-01-31
→ 2027-02-28
→ 2027-03-31
→ 2027-04-30

```

February clamping must not cause permanent drift.

Leap years use the real month length.

## End Date

Recurring event `endDate` is inclusive.

Reject:

```text
endDate < startDate

```

## Same-Day Events

Authoritative same-day calculation:

```text
opening balance
+ total money in
- total money out
= closing balance

```

No invented intraday ordering.

## Negative Balance

Forecast continues after the first zero crossing.

The first crossing remains the runway event even if later income makes the balance positive again.

---

# 10. Canonical Runtime Scenario

This fixture is authoritative.

## Plan

```text
Forecast start:
2026-09-01

Forecast end:
2027-02-28

Starting cash:
$10,000.00

Safety threshold:
$2,500.00

```

## Money In

```text
Client Revenue
$4,000.00
monthly
starts 2026-09-01

```

## Money Out

```text
Operating Expenses
$5,500.00
monthly
starts 2026-09-01

```

## One-Time Money Out

```text
Equipment Purchase
$2,000.00
2026-11-15

```

## Required Results

| DateMoney InMoney OutClosing Cash |        |        |         |
| --------------------------------- | ------ | ------ | ------- |
| 2026-09-01                        | $4,000 | $5,500 | $8,500  |
| 2026-10-01                        | $4,000 | $5,500 | $7,000  |
| 2026-11-01                        | $4,000 | $5,500 | $5,500  |
| 2026-11-15                        | $0     | $2,000 | $3,500  |
| 2026-12-01                        | $4,000 | $5,500 | $2,000  |
| 2027-01-01                        | $4,000 | $5,500 | $500    |
| 2027-02-01                        | $4,000 | $5,500 | -$1,000 |

Required totals:

```text
Projected money in:
$24,000.00

Projected money out:
$35,000.00

Ending cash:
-$1,000.00

Lowest cash:
-$1,000.00

Safety crossing:
2026-12-01

Safety runway:
91 days

Zero crossing:
2027-02-01

Projected runway:
153 days

```

Any different result is a blocking defect unless this specification is formally revised.

---

# 11. Scenario System

Every plan contains:

```text
Base

```

The user may create at most:

```text
Alternative 1
Alternative 2

```

An Alternative is produced by:

```text
selected scenario
→ duplicate
→ deep-copy events
→ assign independent IDs
→ edit independently

```

Comparison displays:

- projected runway;
- safety runway/date;
- ending cash;
- lowest cash.

Secondary comparison may show:

- total money in;
- total money out.

CashRunway must not produce:

- scenario score;
- recommendation;
- investment advice;
- automatic preferred scenario.

---

# 12. Metrics and Visualization

Primary metrics:

1. Projected Runway
2. Ending Cash
3. Safety Runway, when configured
4. Lowest Cash

Secondary:

- Starting Cash
- Total Money In
- Total Money Out

Do not introduce average burn-rate metrics in V1.

## Chart

One authoritative visualization:

**Projected Cash Balance Over Time**

X-axis:

```text
Date

```

Y-axis:

```text
Projected Cash

```

Supports:

- Base;
- up to two Alternatives;
- zero reference;
- safety threshold.

Maximum financial scenario lines:

```text
3

```

No decorative financial charts.

Use locally vendored Chart.js.

---

# 13. Persistence

Use IndexedDB behind a narrow storage abstraction.

Database:

```text
cashrunway

```

Stores:

```text
plans
scenarios
cashFlowEvents
settings

```

Use only justified indexes.

Autosave accepted valid changes.

Visible persistence feedback should communicate:

```text
Saved locally

```

The persistence layer must not become a generic database framework.

---

# 14. CSV and Backup

## Entries CSV Export

Columns:

```text
name
direction
kind
amount
date
frequency
start_date
end_date

```

## Forecast CSV Export

Columns:

```text
date
money_in
money_out
closing_balance

```

## CSV Import

Strict CashRunway Entries schema only.

No general spreadsheet importer.

The importer must:

- validate headers;
- validate every row;
- reject malformed money;
- reject malformed dates;
- reject unsupported recurrence;
- reject duplicates;
- detect existing exact duplicates;
- show an import summary;
- require confirmation;
- commit atomically.

No partial import.

## JSON Backup

Complete application state includes:

```text
app
schemaVersion
exportedAt
plan
scenarios
cashFlowEvents
settings

```

## Restore

Restore must:

- verify application identity;
- verify schema;
- validate IDs;
- validate references;
- validate dates;
- validate integer money;
- preview result;
- require confirmation;
- replace state transactionally.

Failure must preserve existing state.

---

# 15. PWA / Offline

CashRunway is an installable PWA.

Locally cache:

- application HTML;
- CSS;
- JavaScript;
- manifest;
- icons;
- vendored Chart.js;
- required static assets.

Version application caches.

Delete obsolete cache versions on activation.

After one successful initial load, offline mode must permit:

- opening;
- loading saved data;
- editing;
- forecasting;
- scenario creation;
- scenario comparison;
- chart rendering;
- CSV export;
- CSV import;
- JSON backup;
- JSON restore.

No core financial capability may depend on network access.

---

# 16. Purposeful Demonstration Standard

Every meaningful user-facing capability must be demonstrable deliberately.

For each accepted capability, validation must establish:

```text
TRIGGER
→ SYSTEM RESPONSE
→ VISIBLE FEEDBACK
→ STATE CHANGE
→ PERSISTENCE
→ RECOVERY/REOPEN WHERE RELEVANT

```

Examples:

### Add Money In

```text
User enters recurring revenue
→ event accepted
→ visible row appears
→ forecast recalculates
→ Saved locally appears
→ reload
→ event and result remain

```

### Scenario

```text
User duplicates Base
→ Alternative appears
→ change Alternative revenue
→ chart/metrics change
→ Base remains unchanged
→ reload
→ both remain correct

```

### Import

```text
User chooses valid CSV
→ preview shown
→ confirms
→ records appear
→ forecast updates
→ reload
→ imported records persist

```

### Invalid Import

```text
User chooses malformed CSV
→ validation error shown
→ import rejected
→ existing plan remains unchanged

```

### Offline

```text
App loaded
→ network disabled
→ user modifies assumptions
→ forecast updates
→ local save succeeds
→ reload offline
→ accepted data returns

```

Invisible internal correctness is necessary but insufficient for user-facing acceptance.

---

# 17. Automated Runtime Proof

The project must produce machine-checkable runtime evidence.

Required final automated status:

```text
RUNTIME PROOF: PASS

```

The runtime proof must verify at minimum:

- canonical calculation;
- money contract;
- date contract;
- recurrence contract;
- scenario isolation;
- persistence;
- CSV atomicity;
- backup safety;
- chart rendering;
- responsive behavior;
- offline behavior;
- accessibility basics;
- no blocking console errors;
- production asset resolution.

The canonical validator must finish with an unambiguous result such as:

```text
VALIDATION: PASS
RUNTIME PROOF: PASS

```

A failed required contract prevents final acceptance.

---

# 18. Internal Build Checkpoints

The product may now be built from **one authoritative implementation prompt**.

The previous requirement to stop after every milestone and request a new prompt is removed for this project.

However, the implementation must still observe internal dependency checkpoints.

## Checkpoint F — Foundation

Establish:

- canonical repository;
- architecture;
- contracts;
- validation infrastructure;
- protected baseline.

No product behavior is accepted before Foundation passes.

## Checkpoint 1 — Forecast Engine

Implement:

- money;
- calendar dates;
- event validation;
- recurrence;
- forecast;
- runway;
- safety runway;
- metrics.

Required:

```text
CR-MONEY-001 PASS
CR-DATE-001 PASS
CR-RECURRENCE-001 PASS
CR-FORECAST-001 PASS
CR-RUNWAY-001 PASS
CR-SAFETY-001 PASS

```

## Checkpoint 2 — Planner + Persistence

Implement:

- forms;
- events;
- summary output;
- timeline;
- IndexedDB;
- autosave;
- visible feedback.

Required:

```text
CR-PERSIST-001 PASS
CR-FEEDBACK-001 PASS

```

## Checkpoint 3 — Scenario + Visualization

Implement:

- Base;
- Alternatives;
- comparison;
- Chart.js;
- accessible chart companion.

Required:

```text
CR-SCENARIO-001 PASS
CR-A11Y-001 PASS

```

## Checkpoint 4 — Portability + Offline + Hardening

Implement:

- CSV;
- backup;
- restore;
- service worker;
- manifest;
- offline;
- responsive;
- accessibility;
- error handling.

Required:

```text
CR-IMPORT-001 PASS
CR-BACKUP-001 PASS
CR-OFFLINE-001 PASS

```

## Checkpoint 5 — Release Candidate

Run:

- complete validation;
- browser QA;
- purposeful demonstrations;
- production readiness audit;
- scope audit;
- security/privacy audit;
- repository audit.

Only proven defects may be repaired.

Do not expand scope during repair.

---

# 19. One-Prompt / App Evolution Bypass

CashRunway V1 is explicitly authorized for:

# **APP EVOLUTION BYPASS**

The bypass means:

> Codex may proceed from Foundation through every V1 implementation checkpoint in one continuous authorized execution without requesting a new implementation prompt after each checkpoint.

The bypass does **not** mean:

- skip tests;
- skip contracts;
- skip checkpoints;
- skip browser validation;
- skip human acceptance where required, except where the human operator has explicitly issued a project-specific waiver;
- skip repository protection;
- skip production validation;
- ignore failures;
- weaken scope.

The bypass removes **prompt-generation pauses**.

It does not remove **evidence gates**.

## CashRunway V1 Human Acceptance Exception

The portfolio normally requires explicit human acceptance after purposeful demonstration.

For CashRunway V1, the human operator has explicitly authorized an exception:

```text
HUMAN ACCEPTANCE: WAIVED BY USER FOR CASHRUNWAY V1
```

Therefore CashRunway V1 does not require a human acceptance hold before continuing through release, GitHub publication, production validation, RAAI Operations website publication, and Final Lock.

This waiver applies only to CashRunway V1.

It does not change the portfolio-wide default requirement for human acceptance.

Automated purposeful demonstration and runtime proof remain mandatory.

Codex may not skip, weaken, fabricate, or self-assign evidence that was not actually produced.

The release record must distinguish:

```text
PURPOSEFUL DEMONSTRATION — AUTOMATED:
PASS

HUMAN ACCEPTANCE:
WAIVED BY USER FOR CASHRUNWAY V1
```

## Bypass Progression

```text
FOUNDATION PASS
↓
CHECKPOINT 1 PASS
↓
CHECKPOINT 2 PASS
↓
CHECKPOINT 3 PASS
↓
CHECKPOINT 4 PASS
↓
FULL AUTOMATED VALIDATION PASS
↓
RUNTIME PROOF PASS
↓
PURPOSEFUL DEMONSTRATION — AUTOMATED PASS
↓
HUMAN ACCEPTANCE — WAIVED BY USER FOR CASHRUNWAY V1
↓
RELEASE CANDIDATE PASS
↓
GIT PROTECTION PASS
↓
GITHUB PUBLICATION PASS
↓
PRODUCTION VALIDATION PASS
↓
RAAI WEBSITE LISTING PASS
↓
FINAL LOCK

```

If any required gate fails:

1. identify the proven defect;
2. repair only that defect;
3. rerun affected validation;
4. rerun regression validation;
5. continue only after PASS.

If a genuine blocker cannot be repaired safely:

```text
CASHRUNWAY V1 — BLOCKED

```

Do not pretend the bypass succeeded.

---

# 20. Git Commit Strategy

The one-prompt build should use meaningful checkpoint commits.

Recommended sequence:

```text
Foundation
→ chore: establish CashRunway V1 foundation

Checkpoint 1
→ feat: implement deterministic cash forecast engine

Checkpoint 2
→ feat: build CashRunway planner and local persistence

Checkpoint 3
→ feat: add scenario comparison and visualization

Checkpoint 4
→ feat: add portability offline support and hardening

Release repair if required
→ fix: resolve CashRunway V1 validation defects

Final accepted release
→ release: CashRunway v1.0.0

```

Do not create meaningless commits solely to increase commit count.

After each accepted checkpoint:

```text
git status --short

```

must show no unexplained changes.

---

# 21. GitHub Repository Contract

The release repository is intended to be:

```text
https://github.com/raaioperations/cashrunway

```

Repository name:

```text
cashrunway

```

Primary branch:

```text
main

```

V1 release tag:

```text
v1.0.0

```

The remote repository must contain:

- complete source;
- tests;
- validation scripts;
- documentation;
- license information for included dependencies;
- release-ready README.

Do not commit:

- secrets;
- credentials;
- local editor state;
- machine-specific junk;
- temporary validation artifacts not intended for the repository.

## GitHub Protection

Before Final Lock:

- `main` must represent the accepted stable release;
- working tree must be clean;
- V1 release commit must be identified;
- `v1.0.0` must identify the release;
- repository protection/rules must be applied according to the established portfolio GitHub pattern where available.

Required release status:

```text
GITHUB PROTECTED — PASS

```

---

# 22. GitHub Pages Publication

CashRunway must be published as a working public PWA.

Target production application URL:

```text
https://raaioperations.github.io/cashrunway/

```

Publication is not considered successful because deployment completed.

Production validation must verify:

- root page loads;
- CSS loads;
- JavaScript loads;
- Chart.js loads;
- manifest resolves;
- icons resolve;
- service worker resolves;
- app operates;
- IndexedDB operates;
- canonical forecast works;
- reload persistence works;
- scenario isolation works;
- CSV works;
- backup works;
- production console contains no blocking errors;
- offline mode works after installation/load;
- mobile layout works;
- desktop layout works.

Required status:

```text
GITHUB PAGES — PASS
PRODUCTION VALIDATED — PASS

```

---

# 23. RAAI Operations Website Listing

CashRunway must be listed on the existing RAAI Operations website.

Website repository:

```text
raaioperations/raaioperations.github.io

```

Production root:

```text
https://raaioperations.github.io/

```

CashRunway anchor:

```text
#CashRunway

```

Direct product section URL:

```text
https://raaioperations.github.io/#CashRunway

```

Use exact capitalization:

```text
CashRunway

```

Add CashRunway using the site's existing product presentation pattern.

Do not redesign the root website.

Do not break existing products, navigation, legal links, responsive behavior, or established page structure.

The listing should communicate approximately:

> **CashRunway helps freelancers and solo businesses project how long their available cash may last by modeling expected money in, money out, and alternative scenarios locally in the browser.**

The listing must link to:

```text
https://raaioperations.github.io/cashrunway/

```

Required status:

```text
RAAI OPERATIONS WEBSITE — PASS

```

---

# 24. Production Purposeful Demonstration

The final purposeful demonstration must be run against the actual published production application.

At minimum demonstrate:

## Demonstration A — Canonical Forecast

Enter the canonical scenario.

Verify:

```text
Ending cash:
-$1,000.00

Safety crossing:
2026-12-01

Safety runway:
91 days

Zero crossing:
2027-02-01

Projected runway:
153 days

```

## Demonstration B — Persistence

Change an accepted financial event.

Observe:

```text
visible calculation update
→ Saved locally
→ reload
→ identical data and result

```

## Demonstration C — Scenario Isolation

Duplicate Base.

Modify Alternative revenue.

Verify:

```text
Alternative changes
Base does not
reload preserves both

```

## Demonstration D — Portability

Perform:

```text
CSV export
JSON backup
restore validation

```

## Demonstration E — Offline

Load production.

Disconnect network.

Demonstrate:

```text
open
→ modify
→ recalculate
→ save
→ reload

```

## Demonstration F — Responsive

Validate production at representative:

- narrow iPhone;
- narrow Android;
- tablet;
- desktop.

The user-visible experience must intentionally demonstrate that the software works.

---

# 25. Testing Requirements

Automated test coverage must include at minimum:

### Forecast

- starting cash only;
- one-time inflow;
- one-time outflow;
- weekly inflow;
- weekly outflow;
- biweekly recurrence;
- monthly recurrence;
- mixed recurring flows;
- zero net change;
- positive growth;
- zero crossing;
- threshold crossing;
- already-zero starting cash;
- negative starting cash;
- already-under-threshold starting cash;
- no crossing;
- same-day inflow/outflow;
- inclusive boundaries;
- inclusive recurrence end;
- January 31;
- leap February;
- non-leap February;
- 30-day month;
- year rollover;
- cents;
- malformed values;
- invalid dates;
- unsafe integers;
- invalid forecast range;
- canonical fixture.

### Scenario

- Base creation;
- deep duplication;
- independent IDs;
- independent modification;
- Base preservation;
- Alternative deletion;
- independent metrics.

### Persistence

- database creation;
- save;
- reopen;
- edit;
- deletion;
- reload;
- schema upgrade handling;
- corrupted-data handling.

### CSV

- valid one-time import;
- valid recurring import;
- escaping;
- commas;
- quotes;
- newlines;
- invalid dates;
- invalid money;
- unsupported frequency;
- missing columns;
- duplicate import rows;
- existing duplicates;
- atomic rejection;
- export correctness.

### Backup

- valid export;
- valid restore;
- malformed JSON;
- incorrect app identifier;
- unsupported schema;
- broken references;
- invalid financial values;
- failure preserves old state.

### Runtime

Browser automation must verify:

- canonical golden path;
- visible feedback;
- persistence;
- scenario isolation;
- chart;
- imports/exports;
- backup;
- offline;
- accessibility basics;
- responsive behavior;
- console;
- production assets.

---

# 26. Security and Privacy

Financial data remains local.

Do not transmit private CashRunway data to:

- analytics;
- logging services;
- third-party APIs;
- AI systems.

Imported files are untrusted.

Never execute imported content.

Protect against:

- markup injection;
- script injection;
- unsafe filenames;
- malformed CSV;
- malformed JSON;
- integer overflow;
- corrupted database records.

Render user text safely.

## Local Data Notice

Display clearly:

> **Your CashRunway data is stored in this browser. Clearing browser/site data may remove it. Use Backup to preserve a copy.**

## Disclaimer

Display:

> **CashRunway creates projections from information you enter. Forecasts are estimates and actual results may differ. CashRunway does not provide accounting, tax, legal, investment, or financial advice.**

---

# 27. Monetization

Initial commercial hypothesis:

```text
$19 lifetime

```

Do not build payment infrastructure into V1.

Do not add:

- accounts;
- licensing;
- entitlement verification;
- subscriptions;
- feature tiers.

First prove:

```text
use
→ repeat use
→ willingness to pay

```

Commercial validation occurs after product shipment.

It does not block technical Final Lock of V1.

The commercial experiment may later authorize a new version or commercial milestone.

---

# 28. Commercial Validation After Shipment

Initial target:

```text
20 qualified freelancers / solo service operators

```

Seek:

- 8 substantive conversations;
- 5 real-assumption forecasts;
- 3 repeat users;
- at least 1 unrelated $19 buyer;
- 3 unrelated $19 buyers as stronger validation.

Evidence ranking:

```text
Payment
> repeated real use
> completed real forecast
> attempted use
> stated intent
> hypothetical interest

```

Commercial result may be:

```text
EXPAND
MAINTAIN
MODIFY
BUNDLE
PAUSE
ABANDON

```

This decision belongs to product evolution after V1 Final Lock.

---

# 29. Final Lock

CashRunway reaches:

# **FINAL LOCK**

only after all required V1 evidence is accepted.

The Final Lock record must identify:

```text
PROJECT:
CashRunway

VERSION:
v1.0.0

WORKSPACE:
~/Projects/CashRunway

REPOSITORY:
raaioperations/cashrunway

PRODUCTION URL:
https://raaioperations.github.io/cashrunway/

RAAI PRODUCT URL:
https://raaioperations.github.io/#CashRunway

FINAL COMMIT:
<exact SHA>

RELEASE TAG:
v1.0.0

AUTOMATED VALIDATION:
PASS

RUNTIME PROOF:
PASS

PURPOSEFUL DEMONSTRATION — AUTOMATED:
PASS

HUMAN ACCEPTANCE:
WAIVED BY USER FOR CASHRUNWAY V1

PWA/OFFLINE:
PASS

PRODUCTION VALIDATION:
PASS

GITHUB PROTECTED:
PASS

GITHUB PAGES:
PASS

RAAI OPERATIONS WEBSITE:
PASS

WORKING TREE:
CLEAN

KNOWN ACCEPTED LIMITATIONS:
<list>

FINAL STATUS:
CASHRUNWAY V1 — FINAL LOCK

```

After Final Lock, V1 must not receive silent feature changes.

Future work must begin explicitly as:

- V1.0.x hotfix;
- V1.1 maintenance/improvement;
- V2;
- new approved milestone;
- commercially justified evolution.

The locked V1 remains the protected reference baseline.

---

# 30. Full One-Prompt Execution Authorization

## Classification

**FULL V1 IMPLEMENTATION + VALIDATION + RELEASE EXECUTION PROMPT**

## Recommended Model

**GPT-5.6 Luna**

## Recommended Reasoning

**Medium**

Use Luna Low only for isolated deterministic repairs if the environment allows reasoning to be reduced without restarting the execution contract.

Do not escalate automatically.

Higher reasoning is justified only if a genuine architectural ambiguity or difficult blocker cannot be safely resolved under the locked specification.

---

## Exact Codex Execution Prompt

You are my senior implementation engineer, deterministic financial-systems programmer, PWA engineer, browser-QA engineer, Git release engineer, and scope-control authority for:

# CashRunway V1

You are authorized to execute the complete CashRunway V1 build from:

**Foundation → implementation → validation → runtime proof → release → GitHub publication → RAAI Operations website listing → Final Lock**

in this one prompt.

This project has explicit:

# APP EVOLUTION BYPASS AUTHORIZATION

This authorization allows you to proceed through all internal V1 checkpoints without stopping to request a new implementation prompt after each checkpoint.

It does NOT authorize you to skip:

- Foundation;
- contracts;
- tests;
- runtime proof;
- purposeful demonstration;
- Git protection;
- production validation;
- publication validation;
- scope control.

The CashRunway V1 Master Specification is authoritative.

The human operator has explicitly waived the human acceptance hold for CashRunway V1:

```text
HUMAN ACCEPTANCE: WAIVED BY USER FOR CASHRUNWAY V1
```

This waiver applies only to CashRunway V1. Automated purposeful demonstration and runtime proof remain mandatory.

Do not invent product requirements outside it.

---

## A. Canonical Project

Canonical local workspace:

```text
~/Projects/CashRunway

```

Target GitHub repository:

```text
raaioperations/cashrunway

```

Target production URL:

```text
https://raaioperations.github.io/cashrunway/

```

RAAI Operations website repository:

```text
raaioperations/raaioperations.github.io

```

Required RAAI product anchor:

```text
CashRunway

```

Target product URL:

```text
https://raaioperations.github.io/#CashRunway

```

---

## B. Truth Inspection

Before modifying anything run:

```bash
pwd
git status --short 2>/dev/null || true
git branch --show-current 2>/dev/null || true
git log -1 --oneline 2>/dev/null || true

```

Determine whether this is:

- a new project;
- a valid existing Foundation;
- an ambiguous workspace.

If unexplained work makes the state unsafe:

```text
STATUS: BLOCKED

```

Do not overwrite uncertain work.

---

## C. Foundation

If new, establish the CashRunway Foundation first.

Create only justified files.

Establish:

- README;
- package/test configuration;
- source boundaries;
- test directory;
- documentation;
- architecture record;
- contract register;
- validation script;
- release record;
- `.gitignore`;
- accessible static shell;
- Git repository;
- `main` stable baseline.

Run Foundation validation.

Commit accepted Foundation:

```text
chore: establish CashRunway V1 foundation

```

Then create:

```text
codex/cashrunway-v1

```

Do not implement product behavior before Foundation is accepted.

---

## D. Contract Authority

Honor the CashRunway contracts exactly:

```text
CR-MONEY-001
CR-DATE-001
CR-RECURRENCE-001
CR-FORECAST-001
CR-RUNWAY-001
CR-SAFETY-001
CR-SCENARIO-001
CR-PERSIST-001
CR-IMPORT-001
CR-BACKUP-001
CR-OFFLINE-001
CR-A11Y-001
CR-FEEDBACK-001
CR-RELEASE-001

```

Contract precedence:

```text
accepted project-specific behavior
> Tier 1 reusable contract
> established proven pattern
> new Tier 3 contract
> implementation preference

```

Do not weaken a contract to make tests pass.

---

## E. Checkpoint 1 — Deterministic Forecast Engine

Implement pure domain modules for:

- money;
- calendar dates;
- event validation;
- recurrence;
- forecast;
- runway;
- safety runway;
- summary metrics.

Use integer cents.

Use timezone-neutral calendar dates.

Support only:

```text
weekly
biweekly
monthly

```

Implement anchored monthly recurrence correctly.

Build the permanent canonical fixture from the Master Specification.

Run automated tests.

Do not continue until Checkpoint 1 passes.

Commit:

```text
feat: implement deterministic cash forecast engine

```

---

## F. Checkpoint 2 — Planner and Persistence

Implement the primary user interface.

The user must be able to:

```text
open
→ enter starting cash
→ choose forecast
→ add money in
→ add money out
→ see correct forecast
→ see runway
→ see timeline
→ autosave
→ reload
→ recover identical state

```

Implement IndexedDB.

Implement visible feedback.

Do not use invisible success.

Browser-test the canonical scenario.

Repair proven defects.

Do not continue until Checkpoint 2 passes.

Commit:

```text
feat: build CashRunway planner and local persistence

```

---

## G. Checkpoint 3 — Scenarios and Visualization

Implement:

- Base;
- up to two Alternatives;
- deep-copy scenario creation;
- scenario switching;
- scenario comparison;
- Chart.js;
- zero reference;
- safety reference;
- accessible textual/table equivalent.

Prove Base and Alternative isolation.

Repair proven defects.

Commit:

```text
feat: add scenario comparison and visualization

```

---

## H. Checkpoint 4 — Portability, PWA and Hardening

Implement:

- Entries CSV export;
- Forecast CSV export;
- strict atomic Entries CSV import;
- JSON backup;
- transactional JSON restore;
- manifest;
- icons;
- service worker;
- offline cache;
- responsive behavior;
- accessibility;
- corruption handling;
- safe rendering;
- financial disclaimer;
- local-data disclosure.

Browser-test:

- valid import;
- failed import;
- backup;
- restore;
- mobile;
- desktop;
- offline;
- reload.

Repair proven defects.

Commit:

```text
feat: add portability offline support and hardening

```

---

## I. Full Validation

Run:

```bash
sh scripts/validate.sh

```

Required final automated output must include:

```text
VALIDATION: PASS
RUNTIME PROOF: PASS

```

Then inspect:

```bash
git diff --check
git status --short

```

Perform full browser regression.

No blocking console errors are accepted.

Do not proceed to release with a failing contract.

---

## J. Purposeful Demonstration

Demonstrate deliberately:

1. canonical forecast;
2. persistent edit/reload;
3. scenario duplication/isolation;
4. CSV export/import;
5. backup/restore;
6. malformed-import rejection;
7. offline use;
8. responsive mobile use;
9. responsive desktop use.

For user-facing capabilities capture:

```text
trigger
system response
visible feedback
state change
persistence
recovery

```

Record the demonstration evidence.

---

## K. Release Preparation

Update:

```text
README.md
docs/ARCHITECTURE.md
docs/CONTRACTS.md
docs/VALIDATION.md
docs/RELEASE.md

```

Record:

- architecture;
- contracts;
- tests;
- runtime evidence;
- accepted limitations;
- deployment method.

Run final scope audit.

CashRunway must still be a cash-runway planning utility.

No accounting, banking, AI, auth, payments, or unrelated product expansion may exist.

---

## L. GitHub Repository

If GitHub authentication and permissions are available:

1. create/configure:

```text
raaioperations/cashrunway

```

2. publish the accepted repository;
3. establish `main` as stable release branch;
4. apply the established GitHub protection pattern;
5. ensure no secrets are committed;
6. create final release commit;
7. tag:

```text
v1.0.0

```

Required status:

```text
GITHUB PROTECTED — PASS

```

If required external authentication is genuinely unavailable, report the exact blocker rather than fabricating publication.

---

## M. GitHub Pages

Publish CashRunway to:

```text
https://raaioperations.github.io/cashrunway/

```

Validate production asset resolution.

Validate the full published golden path.

Validate offline production behavior.

Required:

```text
GITHUB PAGES — PASS
PRODUCTION VALIDATED — PASS

```

A deployment command succeeding is not production validation.

---

## N. RAAI Operations Website

Update the existing RAAI Operations website repository.

Add CashRunway using the established Products presentation pattern.

Required anchor:

```text
CashRunway

```

Required public URL:

```text
https://raaioperations.github.io/#CashRunway

```

Link to:

```text
https://raaioperations.github.io/cashrunway/

```

Do not redesign the website.

Do not remove or break existing products, navigation, legal pages, or responsive behavior.

Deploy and validate the root website.

Required:

```text
RAAI OPERATIONS WEBSITE — PASS

```

---

## O. App Evolution Bypass Final Gate

The App Evolution Bypass succeeds only when the complete chain passes.

Required:

```text
FOUNDATION — PASS
CONTRACTS — PASS
AUTOMATED VALIDATION — PASS
RUNTIME PROOF — PASS
PURPOSEFUL DEMONSTRATION — AUTOMATED PASS
HUMAN ACCEPTANCE — WAIVED BY USER FOR CASHRUNWAY V1
SCOPE AUDIT — PASS
SECURITY/PRIVACY AUDIT — PASS
GIT CLEAN — PASS
GITHUB PROTECTED — PASS
GITHUB PAGES — PASS
PRODUCTION VALIDATED — PASS
RAAI OPERATIONS WEBSITE — PASS

```

If all pass:

merge/reconcile the accepted V1 release into `main` using the established protected-repository process.

Establish the final release commit.

Tag:

```text
v1.0.0

```

Final working tree must be clean.

Then record:

```text
CASHRUNWAY V1 — FINAL LOCK

```

After Final Lock, do not make additional product changes.

---

## P. Self-Repair Authority

During this execution you are authorized to repair proven implementation defects that prevent an authorized requirement or contract from passing.

For every repair:

```text
prove defect
→ make smallest correction
→ rerun targeted validation
→ rerun relevant regression
→ continue only on PASS

```

Do not use repair authority to:

- redesign;
- add features;
- change product scope;
- reinterpret financial rules;
- weaken validation;
- remove tests.

---

## Q. Stop Conditions

Stop only when one of these states is true:

### SUCCESS

```text
CASHRUNWAY V1 — FINAL LOCK

```

### GENUINE BLOCKER

```text
CASHRUNWAY V1 — BLOCKED

```

A blocker requires:

- exact failed gate;
- evidence;
- attempted safe resolution;
- reason further action would be unsafe or impossible.

Do not stop merely because an internal checkpoint finished.

Do not ask for a new milestone prompt.

That is the purpose of the App Evolution Bypass.

---

## R. Final Report

Return exactly this structure:

```text
# CashRunway V1 Final Release Report

## Final Status

CASHRUNWAY V1 — <FINAL LOCK | BLOCKED>

## Foundation
PASS / FAIL

## Contracts
CR-MONEY-001 —
CR-DATE-001 —
CR-RECURRENCE-001 —
CR-FORECAST-001 —
CR-RUNWAY-001 —
CR-SAFETY-001 —
CR-SCENARIO-001 —
CR-PERSIST-001 —
CR-IMPORT-001 —
CR-BACKUP-001 —
CR-OFFLINE-001 —
CR-A11Y-001 —
CR-FEEDBACK-001 —
CR-RELEASE-001 —

## Automated Validation
<commands/results>

## Runtime Proof
RUNTIME PROOF: <PASS/FAIL>

## Purposeful Demonstration
AUTOMATED: <PASS/FAIL + evidence>

## Human Acceptance
WAIVED BY USER FOR CASHRUNWAY V1

## Repository
https://github.com/raaioperations/cashrunway

## Production Application
https://raaioperations.github.io/cashrunway/

## RAAI Operations Product Link
https://raaioperations.github.io/#CashRunway

## Protected Release
v1.0.0

## Final Commit
<sha>

## GitHub Protection
PASS / FAIL

## GitHub Pages
PASS / FAIL

## Production Validation
PASS / FAIL

## RAAI Operations Website
PASS / FAIL

## Scope Audit
PASS / FAIL

## Security / Privacy Audit
PASS / FAIL

## Accepted Limitations
<list>

## Working Tree
CLEAN / NOT CLEAN

## App Evolution Bypass
PASS / FAIL

## Final Lock
PASS / FAIL

```

Do not classify CashRunway as shipped unless every required release gate passes.

---

# 31. Governing Development Principle

CashRunway now follows the portfolio's updated software-production model:

**correct Foundation**
**→ explicit contracts**
**→ one authoritative Luna execution**
**→ internal checkpoint validation**
**→ purposeful demonstration**
**→ automated runtime proof**
**→ protected repository**
**→ production publication**
**→ portfolio website listing**
**→ Final Lock**

The App Evolution Bypass exists to remove unnecessary human prompt handoffs.

For CashRunway V1 specifically, the human operator has also explicitly waived the human acceptance hold. That waiver does not remove automated purposeful demonstration, runtime proof, security/privacy validation, publication validation, or Final Lock evidence.

It does not remove engineering discipline.

The objective is:

> **One prompt should be capable of producing the entire accepted application because the specification, contracts, validation system, and release gates are strong enough to control the execution.**

CashRunway V1 must therefore finish as either:

# **A validated, published, protected, listed, Final-Locked software asset**

or:

# **A precisely evidenced blocker.**

Nothing between those states should be misrepresented as completion.