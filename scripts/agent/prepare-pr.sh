#!/usr/bin/env bash
set -euo pipefail

mkdir -p .agent-artifacts/pr
out=".agent-artifacts/pr/latest.md"

changed="$(git diff --name-only; git ls-files --others --exclude-standard)"

{
  echo "# PR Draft"
  echo
  echo "## Summary"
  echo
  echo "- "
  echo
  echo "## Related Docs / Plan"
  echo
  echo "- AGENTS.md"
  echo "- docs/index.md"
  echo
  echo "## Changed Files"
  echo
  if [ -n "$changed" ]; then
    echo "$changed" | sed 's/^/- /'
  else
    echo "- No local file changes detected."
  fi
  echo
  echo "## Verification"
  echo
  echo "- [ ] pnpm run build"
  echo "- [ ] pnpm run architecture:check"
  echo "- [ ] pnpm run docs:health"
  echo "- [ ] scripts/agent/run-all-checks.sh"
  echo
  echo "## UI / API Evidence"
  echo
  echo "- UI artifacts: .agent-artifacts/ui-checks/latest/summary.md"
  echo "- API artifacts: .agent-artifacts/api-checks/latest/summary.md"
  echo
  echo "## Security Impact"
  echo
  echo "- "
  echo
  echo "## Reliability Impact"
  echo
  echo "- "
  echo
  echo "## Rollback"
  echo
  echo "- Revert this PR or disable the changed UI/API path."
  echo
  echo "## Human Review Needed"
  echo
  echo "- "
} > "$out"

cat "$out"
echo "PR draft written to $out"

if command -v gh >/dev/null 2>&1; then
  echo "gh is available. After editing the draft, create a PR with:"
  echo "gh pr create --draft --fill"
else
  echo "gh is not available. Use $out as the PR body."
fi
