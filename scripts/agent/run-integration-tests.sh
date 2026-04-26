#!/usr/bin/env bash
set -euo pipefail

if pnpm run | grep -qE '^  test:integration'; then
  pnpm run test:integration
else
  echo "No integration test script is configured yet. Skipping with documented gap in docs/TESTING.md."
fi
