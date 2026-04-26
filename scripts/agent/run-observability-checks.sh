#!/usr/bin/env bash
set -euo pipefail

mkdir -p .agent-artifacts/logs

if [ ! -f .agent-artifacts/logs/latest.log ]; then
  echo "No latest harness log found; creating placeholder."
  echo "No check log has been captured yet." > .agent-artifacts/logs/latest.log
fi

if grep -Eiq '(token|secret|password|credential)' .agent-artifacts/logs/latest.log; then
  echo "FAIL: .agent-artifacts/logs/latest.log may contain sensitive keywords. Inspect before sharing or committing artifacts."
  exit 1
fi

echo "Observability check passed. Latest log: .agent-artifacts/logs/latest.log"
