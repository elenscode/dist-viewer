#!/usr/bin/env bash
set -euo pipefail

mkdir -p .agent-artifacts/quality
out=".agent-artifacts/quality/latest.md"

{
  echo "# Quality Sweeper"
  echo
  echo "Generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo
  echo "## Large Source Files"
  find src -type f \( -name '*.ts' -o -name '*.tsx' \) -print0 | xargs -0 wc -l | sort -nr | head -20
  echo
  echo "## TODO / FIXME"
  rg -n "TODO|FIXME|HACK" src docs scripts tools evals || true
  echo
  echo "## Architecture Check"
  pnpm run architecture:check
} > "$out"

cat "$out"
echo "Quality report written to $out"
