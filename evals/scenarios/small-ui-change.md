# Scenario: Small UI Change

## Task

Change a visual detail in the chart explorer without altering data flow.

## Expected Agent Steps

1. Read `AGENTS.md`, `docs/DESIGN.md`, and `docs/FRONTEND.md`.
2. Locate the component.
3. Make the smallest change.
4. Run `pnpm run build`, `pnpm run architecture:check`, and UI smoke if layout changed.
5. Update docs only if behavior or workflow changed.
