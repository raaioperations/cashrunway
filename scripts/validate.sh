#!/usr/bin/env sh
set -eu

fail() { echo "FOUNDATION VALIDATION: FAIL — $1"; exit 1; }
require_file() { [ -f "$1" ] || fail "missing required file: $1"; }

require_file README.md
require_file package.json
require_file index.html
require_file styles/main.css
require_file docs/MASTER_SPECIFICATION.md
require_file docs/ARCHITECTURE.md
require_file docs/CONTRACTS.md
require_file docs/VALIDATION.md
require_file docs/RELEASE.md
require_file tests/foundation.test.js
require_file tests/domain.test.js
require_file tests/features.test.js
require_file src/domain/forecast.js
require_file src/storage/db.js
require_file src/export/csv.js
require_file manifest.webmanifest
require_file service-worker.js
require_file icons/icon.svg

node --check tests/foundation.test.js
node -e "const p=require('./package.json'); if(p.name!=='cashrunway'||p.type!=='module') process.exit(1)"
node --test tests/*.test.js >/dev/null

if grep -Eiq 'react|vue|angular|next\.js|express|firebase' package.json; then
  fail "prohibited architectural dependency found in package.json"
fi

grep -Fq 'Specification status:** AUTHORITATIVE' docs/MASTER_SPECIFICATION.md || fail "authoritative specification marker is missing"
grep -Fq 'CashRunway — Version 1 Master Specification v2.1' docs/MASTER_SPECIFICATION.md || fail "specification identity is missing"
grep -Fq 'HUMAN ACCEPTANCE:' docs/MASTER_SPECIFICATION.md || fail "specification waiver is not recorded"
grep -Fq 'CR-MONEY-001' docs/CONTRACTS.md || fail "contract register is incomplete"

echo "VALIDATION: PASS"
