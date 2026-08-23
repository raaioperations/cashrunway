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

node --check tests/foundation.test.js
node -e "const p=require('./package.json'); if(p.name!=='cashrunway'||p.type!=='module') process.exit(1)"
node --test >/dev/null

if grep -Eiq 'react|vue|angular|next\.js|express|firebase' package.json; then
  fail "prohibited architectural dependency found in package.json"
fi

grep -Fq 'HUMAN ACCEPTANCE:' docs/MASTER_SPECIFICATION.md || fail "specification waiver is not recorded"
grep -Fq 'CR-MONEY-001' docs/CONTRACTS.md || fail "contract register is incomplete"

echo "FOUNDATION VALIDATION: PASS"
