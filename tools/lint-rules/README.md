# Lint Rules

This directory contains dependency-free Node checks used by the harness.

- `architecture-check.mjs`: source boundary, naming, file size, and risky pattern checks.
- `docs-health.mjs`: required docs, AGENTS length, and markdown link checks.

Run:

```bash
pnpm run architecture:check
pnpm run docs:health
```
