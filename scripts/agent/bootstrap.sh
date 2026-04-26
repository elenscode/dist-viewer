#!/usr/bin/env bash
set -euo pipefail

echo "Bootstrapping agent environment"
scripts/agent/doctor.sh
pnpm install
scripts/agent/repo-map.sh
scripts/agent/run-all-checks.sh
