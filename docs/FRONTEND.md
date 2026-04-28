# Frontend

## Stack

- React 18.
- TypeScript strict mode.
- Vite.
- Tailwind CSS 4.
- Plotly through `react-plotly.js`.
- Mock backend image API boundary for thumbnail image retrieval.

## Source Rules

- Put pure data and visualization builders in `src/lib/`.
- Put backend/mock boundaries in `src/api/`.
- Keep shared types in `src/types/`.
- Keep app-specific React components in `src/components/`.
- Keep reusable UI primitives in `src/components/ui/`.

## Performance Rules

- Do not mount Plotly in thumbnail cards.
- Use backend-provided thumbnail images for overview screens through `src/api/` boundary functions.
- Keep thumbnail selection and feature-table rendering lightweight; Plotly should stay modal-only.
- Keep thumbnail image fetch/normalization in `src/api/` and outside React render paths.
- Be careful with synchronous loops in render paths.
- For real large logs, add pagination, virtualization, or workers before increasing data volume.

## UI Verification

- Minimum: `pnpm run build`.
- Preferred once installed: Playwright route smoke with console and network error capture.
- Artifact target: `.agent-artifacts/ui-checks/latest/`.

## Current Sidebar Behavior

- App sidebar supports tree search and coordinate-based filtering for mock `(x, y)` positions.
- Coordinate filter defaults to "전체 선택" (all selected) so large coordinate sets remain fully visible on first load.

## Current Feature Panel Behavior

- The right panel appears when one or more charts are selected.
- `Signal Features` tab keeps the existing tabular stats view (mean, peak, drift, anomaly).
- `ML / DL Metrics` tab shows mock inference-oriented metrics per selected chart (anomaly band, cluster label/distance, AutoEncoder loss, LSTM forecast error, confidence).
