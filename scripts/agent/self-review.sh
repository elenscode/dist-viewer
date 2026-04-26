#!/usr/bin/env bash
set -euo pipefail

mkdir -p .agent-artifacts/self-review
out=".agent-artifacts/self-review/latest.md"

{
  echo "# Self Review"
  echo
  echo "Generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo
  echo "## Changed Files"
  echo
  git status --short || true
  echo
  echo "## Risk Scan"
  echo
  git diff --name-only | sed 's/^/- /' || true
  echo
  echo "## Checklist"
  echo
  echo "- [ ] Scope matches the request."
  echo "- [ ] Architecture boundaries from ARCHITECTURE.md are respected."
  echo "- [ ] External data/config boundaries validate or normalize inputs."
  echo "- [ ] No secrets, tokens, credentials, or raw sensitive data were added."
  echo "- [ ] UI changes have build and smoke evidence."
  echo "- [ ] Docs were updated for behavior, command, or architecture changes."
  echo "- [ ] Rollback path is clear."
  echo
  echo "## Suggested Commands"
  echo
  echo '```bash'
  echo "pnpm run architecture:check"
  echo "pnpm run docs:health"
  echo "scripts/agent/run-all-checks.sh"
  echo '```'
} > "$out"

cat "$out"
echo "Self-review written to $out"
