# CashRunway V1 Contract Register

Contract precedence: accepted project-specific behavior > existing Tier 1 reusable contract > established proven portfolio pattern > new project-specific Tier 3 contract > implementation preference. CashRunway contracts are project-specific Tier 3 unless separate evidence establishes otherwise. Contracts are not self-promoted.

Contract statuses reflect local implementation evidence only. Browser, production, and release gates remain separate and cannot be inferred from source files.

| Identifier | Purpose | Authoritative behavior | Expected proof | Status |
|---|---|---|---|---|
| CR-MONEY-001 | Money representation | Integer cents | Unit tests | PASS — local |
| CR-DATE-001 | Calendar date semantics | UTC calendar dates | Boundary tests | PASS — local |
| CR-RECURRENCE-001 | Recurrence rules | Weekly, biweekly, anchored monthly | Deterministic fixtures | PASS — local |
| CR-FORECAST-001 | Forecast engine | Inclusive daily balances | Golden vectors | PASS — local |
| CR-RUNWAY-001 | Runway calculation | First closing balance at or below zero | Golden vectors | PASS — local |
| CR-SAFETY-001 | Safety behavior | First closing balance at or below threshold | Golden vectors | PASS — local |
| CR-SCENARIO-001 | Scenario isolation | Deep-copy independent snapshots | Identity tests | PASS — local |
| CR-PERSIST-001 | Local persistence | IndexedDB state replacement | Browser proof pending | IMPLEMENTED — browser proof pending |
| CR-IMPORT-001 | Import handling | Exact schema, parse-before-write | Unit tests; browser proof pending | PASS — local / browser proof pending |
| CR-BACKUP-001 | Backup and restore | Versioned JSON state | Browser proof pending | IMPLEMENTED — browser proof pending |
| CR-OFFLINE-001 | Offline operation | Cached application core | Browser proof pending | IMPLEMENTED — browser proof pending |
| CR-A11Y-001 | Accessibility | Semantic, textual financial output | Source review; browser audit pending | IMPLEMENTED — audit pending |
| CR-FEEDBACK-001 | Feedback behavior | Visible save/error/import feedback | Browser proof pending | IMPLEMENTED — browser proof pending |
| CR-RELEASE-001 | Release gates | All technical/publication gates | Release checklist | NOT YET SATISFIED |
