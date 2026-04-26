#!/usr/bin/env bash
set -euo pipefail

mkdir -p .agent-artifacts/logs
log_file=".agent-artifacts/logs/latest.log"
: > "$log_file"

run() {
  echo "==> $*" | tee -a "$log_file"
  "$@" 2>&1 | tee -a "$log_file"
}

run pnpm run build
run pnpm run architecture:check
run pnpm run docs:health
run scripts/agent/run-unit-tests.sh
run scripts/agent/run-integration-tests.sh
run scripts/agent/run-api-checks.sh
run scripts/agent/run-ui-checks.sh
run scripts/agent/run-observability-checks.sh

echo "All harness checks passed. Log: $log_file"
