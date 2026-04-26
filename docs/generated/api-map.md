# API Map

## Current API Boundaries

- `src/api/mockCharts.ts`
  - `fetchChartThumbnails(selectedProjectIds: string[]): Promise<ChartThumbnail[]>`
  - Mock browser-side async function.
  - Simulates latency with `window.setTimeout`.
- `src/api/mockTreeData.ts`
  - `MOCK_TREE_DATA: ProjectFileItem[]`
  - Mock max-depth-three project file hierarchy for the sidebar.

## Not Present

- No HTTP backend client.
- No OpenAPI schema.
- No server routes.
- No auth boundary.

## Required Future Rule

Real external responses must be parsed or normalized inside `src/api/` before passing data to React components.
