#!/usr/bin/env bash
set -euo pipefail

artifact_dir=".agent-artifacts/ui-checks/latest"
rm -rf "$artifact_dir"
mkdir -p "$artifact_dir/screenshots"

console_file="$artifact_dir/console-errors.json"
network_file="$artifact_dir/network-errors.json"
printf '[]\n' > "$console_file"
printf '[]\n' > "$network_file"

pnpm run build

cat > "$artifact_dir/summary.md" <<'EOF'
# UI Checks

Status: minimum smoke passed.

Evidence:

- `pnpm run build` completed.
- Browser automation is not installed yet, so screenshots, DOM snapshots, console error capture, and network error capture are placeholders.

Next step:

- Add Playwright and capture `/` screenshot plus console/network errors.
EOF

echo "UI check summary written to $artifact_dir/summary.md"
