# Repository Audit

Date: 2026-04-25

## Summary

- Project name from user input: large-scale visualization tool.
- Current implementation name: `plotly-react-thumbnail-modal-poc`.
- Purpose: interactive visualization architecture for large equipment-log data.
- Desired agent autonomy: Level 3 by default because no explicit level was selected.

## Current Facts

- Language/framework: TypeScript, React 18, Vite 6.
- Package manager: pnpm is inferred from `pnpm-lock.yaml`; README still mentions npm and should be updated in future product docs.
- UI: single route SPA mounted from `src/main.tsx` with left Project Files, center thumbnail explorer, and right selected-feature table.
- Visualization: Plotly WebGL through `react-plotly.js`.
- Styling: Tailwind CSS 4 plus shadcn-style UI primitives.
- Backend: not present.
- Database/schema: not present.
- Docker: not present in the initial snapshot.
- CI/CD: `.github/workflows/` was not present in the initial snapshot.
- Tests: no unit, Pytest, or Playwright config was present in the initial snapshot.

## Project Structure

- `src/App.tsx`: app composition, project selection, generated thumbnails, chart selection, search state, modal selection.
- `src/api/`: mock async data boundary for project tree data and chart thumbnail generation.
- `src/lib/`: deterministic mock signal data, OpenCV thumbnail rendering, and Plotly figure generation.
- `src/types/`: chart contracts.
- `src/components/`: chart and layout components.
- `src/components/ui/`: reusable UI primitives.
- `.agents/skills/shadcn/`: local shadcn skill documentation.

## Build And Verification

- Build: `pnpm run build`.
- Typecheck: currently equivalent to `tsc -b`, exposed as `pnpm run typecheck`.
- Architecture check: `pnpm run architecture:check`.
- Docs health: `pnpm run docs:health`.
- Full harness check: `scripts/agent/run-all-checks.sh` or `pnpm run check`.

## Domain Model

- `ChartThumbnail`: id, title, thumbnail URL, source item, project path, equipment, signal type, severity, line count, point count, and mock feature values.
- `ProjectFileItem`: max-depth-three mock project file tree items.
- Mock chart data assumes up to 72 generated PNG thumbnails, 2,000 lines per chart, 80 points per line.
- `buildPlotlyFigure` creates a single `scattergl` trace with null-separated line segments.

## API Boundary

- `fetchChartThumbnails(selectedProjectIds)` is a mock browser API using `window.setTimeout`.
- Generated thumbnail URLs are PNG data URLs created from downsampled mock signal lines via OpenCV.js/WASM.
- `MOCK_TREE_DATA` provides mock project file hierarchy data for the sidebar.
- Future backend calls should remain isolated under `src/api/` and normalize data before it reaches components.

## UI User Journey

1. User opens the app.
2. User selects one or more Project Files items from the left sidebar.
3. User generates thumbnails for the selected mock file items.
4. User scans and searches the thumbnail grid.
5. User selects one or more thumbnails and sees their feature values in the right-side table.
6. User opens a selected or unselected chart in the modal for detailed Plotly WebGL analysis.
7. User closes the modal with button, backdrop, or Escape.

## Drift Risks

- Mock API may be replaced ad hoc inside components.
- Plotly generation may move into UI components and make rendering harder to reason about.
- OpenCV.js thumbnail generation can add noticeable first-use latency because the browser loads a large runtime chunk; thumbnail rendering now uses reduced line/point counts, reduced resolution, and batch yielding.
- Large files can grow because visualization work often accumulates state and data transforms.
- README/package scripts can drift from pnpm-based workflow.
- No real backend/schema exists yet, so future API contracts need explicit docs.

## Likely Agent Blockers

- Missing tests and no browser automation dependency.
- No Docker files despite Docker being listed in desired stack.
- No Pytest configuration despite Pytest being listed in desired stack.
- No real data samples or backend API contract.
- Product language is broad; exact user roles and log formats need human input.

## Harness Adjustments

- Required structure was added without moving source files.
- `docs/ARCHITECTURE.md` was not duplicated; root `ARCHITECTURE.md` is the canonical architecture document and `docs/index.md` links to it.
- Playwright/Pytest/Docker are documented as planned integrations because adding new dependencies requires network access and project decisions.
