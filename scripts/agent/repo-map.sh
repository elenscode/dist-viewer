#!/usr/bin/env bash
set -euo pipefail

mkdir -p docs/generated

{
  echo "# Repo Map"
  echo
  echo "Generated on $(date -u +%Y-%m-%dT%H:%M:%SZ)."
  echo
  echo "## Files"
  echo
  find . -path './node_modules' -prune -o -path './.git' -prune -o -type f -print | sort | sed 's#^\./#- #'
} > docs/generated/repo-map.md

echo "Updated docs/generated/repo-map.md"
