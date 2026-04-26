# Testing

## Current Automated Checks

- `pnpm run build`: TypeScript build plus Vite production build.
- `pnpm run architecture:check`: import direction, naming, file size, and risky pattern checks.
- `pnpm run docs:health`: required docs, links, and AGENTS length.
- `scripts/agent/run-ui-checks.sh`: minimum UI smoke artifact; uses build until Playwright is installed.

## Required By Change Type

- Component change: build plus UI smoke; add Playwright test when browser tooling is available.
- Data/API boundary change: architecture check plus request/response examples in docs.
- Architecture change: update `ARCHITECTURE.md` and run architecture check.
- Security-sensitive change: update `docs/SECURITY.md` and run self-review.
- Docs-only change: docs health check.

## Regression Tests

Add bug reproductions under `evals/regression/`. Include:

- Symptom.
- Reproduction steps.
- Expected behavior.
- Verification command.

## Gaps

- No unit test runner is installed.
- No Playwright config is installed.
- No Pytest target exists because there is no backend.
