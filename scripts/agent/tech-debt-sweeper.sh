#!/usr/bin/env bash
set -euo pipefail

mkdir -p .agent-artifacts/tech-debt
out=".agent-artifacts/tech-debt/latest.md"

{
  echo "# Tech Debt Sweeper"
  echo
  echo "Generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo
  echo "## Source"
  echo
  echo "Read: docs/exec-plans/tech-debt-tracker.md"
  echo
  echo "## Suggested Small PRs"
  echo
  awk -F'|' '/TD-[0-9]+/ { gsub(/^ +| +$/, "", $2); gsub(/^ +| +$/, "", $3); gsub(/^ +| +$/, "", $5); print "- " $2 ": " $3 " (" $5 ")" }' docs/exec-plans/tech-debt-tracker.md
} > "$out"

cat "$out"
echo "Tech debt report written to $out"
