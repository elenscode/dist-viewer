#!/usr/bin/env bash
set -euo pipefail

scripts/agent/repo-map.sh
pnpm run docs:health

active_count="$(find docs/exec-plans/active -type f -name '*.md' 2>/dev/null | wc -l | tr -d ' ')"
if [ "$active_count" -gt 0 ]; then
  echo "INFO: $active_count active execution plan(s). Move completed plans to docs/exec-plans/completed/."
fi

echo "Doc gardening complete."
