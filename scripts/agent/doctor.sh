#!/usr/bin/env bash
set -euo pipefail

failures=0

check_cmd() {
  local name="$1"
  local hint="$2"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "FAIL: missing $name. $hint"
    failures=$((failures + 1))
  else
    echo "OK: $name ($(command -v "$name"))"
  fi
}

echo "Agent doctor"
echo "============"

check_cmd node "Install Node.js 20+."
check_cmd pnpm "Install pnpm with corepack enable or npm install -g pnpm."
check_cmd git "Install git."

if command -v node >/dev/null 2>&1; then
  node_major="$(node -p "Number(process.versions.node.split('.')[0])")"
  if [ "$node_major" -lt 20 ]; then
    echo "FAIL: Node.js $(node -v) detected. Use Node.js 20+ for this Vite/TypeScript harness."
    failures=$((failures + 1))
  else
    echo "OK: Node.js $(node -v)"
  fi
fi

if [ ! -f package.json ]; then
  echo "FAIL: package.json missing. Run from repository root."
  failures=$((failures + 1))
fi

if [ ! -f pnpm-lock.yaml ]; then
  echo "FAIL: pnpm-lock.yaml missing. This repository expects pnpm."
  failures=$((failures + 1))
fi

if [ ! -d node_modules ]; then
  echo "WARN: node_modules missing. Run: pnpm install"
else
  echo "OK: node_modules present"
fi

if [ -f .env ]; then
  echo "INFO: .env exists. Do not commit secrets; keep local-only values out of docs."
else
  echo "OK: no .env file required for current mock-only app"
fi

if [ "$failures" -gt 0 ]; then
  echo "Doctor failed with $failures issue(s). Fix the FAIL lines above, then rerun scripts/agent/doctor.sh."
  exit 1
fi

echo "Doctor passed."
