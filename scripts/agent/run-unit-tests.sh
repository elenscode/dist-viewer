#!/usr/bin/env bash
set -euo pipefail

if pnpm run | grep -qE '^  test(:unit)?'; then
  pnpm run test:unit
else
  echo "No unit test script is configured yet. Minimum substitute: pnpm run build."
  pnpm run build
fi
