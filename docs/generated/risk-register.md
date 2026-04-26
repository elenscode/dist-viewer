# Risk Register

## High

- No automated UI smoke test is installed.
  - Mitigation: `scripts/agent/run-ui-checks.sh` writes artifacts and uses build as minimum smoke until Playwright is added.
- No backend/API contract exists for equipment logs.
  - Mitigation: keep API boundary isolated under `src/api/` and add schemas before real integration.

## Medium

- Plotly data generation can become CPU-heavy.
  - Mitigation: keep generation in `src/lib/`, add profiling and worker strategy before real large logs.
- Docs can drift from source.
  - Mitigation: `pnpm run docs:health` validates required docs and links.
- Architecture can drift as agents add files.
  - Mitigation: `pnpm run architecture:check` enforces import direction and file-size thresholds.

## Low

- README references npm while the repository uses pnpm.
  - Mitigation: update README in a focused docs cleanup.
