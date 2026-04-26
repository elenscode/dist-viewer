#!/usr/bin/env bash
set -euo pipefail

mkdir -p .agent-artifacts/api-checks/latest

cat > .agent-artifacts/api-checks/latest/summary.md <<'EOF'
# API Checks

No backend/API server exists in the current repository.

Current substitute:

- TypeScript build validates the mock API contract.
- Architecture check enforces that API boundary code stays under `src/api/`.
EOF

pnpm run build
echo "API check summary written to .agent-artifacts/api-checks/latest/summary.md"
