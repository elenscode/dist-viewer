# Architecture

## Current System

- Single-page Vite application using React 18 and TypeScript.
- Plotly WebGL charts are mounted only inside a modal.
- The left Project Files sidebar exposes mock equipment-log items up to three levels deep.
- The grid renders generated PNG thumbnails from a mock async API after project items are selected.
- Thumbnail images are produced from downsampled deterministic mock signal data through OpenCV.js/WASM and browser canvas.
- The right feature panel renders tabular mock feature values for selected thumbnails.
- There is no backend, database, Docker config, or CI in the initial repository snapshot.

## Domain Boundaries

- `src/types/`: shared TypeScript contracts.
- `src/lib/`: pure visualization/data builders. No React imports.
- `src/api/`: boundary for mock or future backend calls. Validates or normalizes external data before UI use.
- `src/components/`: React components. UI components under `src/components/ui/` are reusable primitives.
- `src/hooks/`: React hooks only.

## Dependency Direction

Allowed:

- `components -> api | lib | types | hooks | components/ui`
- `api -> lib | types`
- `lib -> types`
- `hooks -> types`
- `main/App -> components | api | types`

Forbidden:

- `lib -> components | hooks | api`
- `types -> any runtime module`
- `api -> components | hooks`
- `components/ui -> app-specific components | api`

Run `pnpm run architecture:check` to enforce these rules.

## Data Flow

1. `App` owns selected Project Files IDs, generated thumbnails, selected chart IDs, and modal state.
2. `AppSidebar` renders `src/api/mockTreeData.ts` and reports project item selection changes.
3. `App` calls `fetchChartThumbnails(selectedProjectIds)` when the user generates thumbnails.
4. `src/api/mockCharts.ts` asks `src/lib/opencvThumbnail.ts` to render mock signal data through OpenCV.js/WASM.
5. `src/api/mockCharts.ts` returns normalized mock `ChartThumbnail[]` records with PNG thumbnail URLs and feature values.
6. `ChartGrid` renders selectable thumbnail cards.
7. `ChartFeaturePanel` renders selected chart feature values in a table.
8. `ChartModal` mounts `PlotlyChart` for one chart when detailed analysis is requested.
9. `PlotlyChart` calls `buildPlotlyFigure` for on-demand WebGL data.

## Boundary Validation Rules

- Future backend/API responses must be normalized in `src/api/` before reaching components.
- Environment variables must be read through a config boundary, not directly inside components.
- User input should be trimmed, bounded, and interpreted close to the interaction boundary.
- DB rows do not exist yet; when introduced, map rows to domain types before UI use.

## Naming Rules

- React components: `PascalCase.tsx`.
- Hooks: `use-name.ts` or `useName.ts`, exporting a `use...` function.
- Type files: lower-case domain name, exporting explicit TypeScript types.
- API boundary files: descriptive lower camel case, for example `mockCharts.ts` or `chartClient.ts`.
- Generated docs: use kebab-case markdown under `docs/generated/`.

## Logging Rules

- Prefer structured key/value context in logs.
- Do not log secrets, tokens, credentials, raw production payloads, or personal data.
- Errors should include operation name, route/action when applicable, and recoverability.

## Known Architecture Risks

- Mock API can hide real boundary-validation needs.
- Plotly data generation is synchronous and may become expensive as log volumes grow.
- OpenCV.js adds a large lazy-loaded browser chunk; thumbnail generation uses reduced line/point counts, reduced render resolution, and small batches to limit first-use latency.
- No automated browser smoke test is installed yet.
- No backend or database boundary exists despite the long-term product direction.
