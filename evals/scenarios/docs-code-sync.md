# Scenario: Docs And Code Sync

## Task

Bring stale docs back in sync with source commands or architecture.

## Expected Agent Steps

1. Run `scripts/agent/doc-gardener.sh`.
2. Compare package scripts, source structure, and docs.
3. Update docs or generated maps.
4. Run `pnpm run docs:health`.
