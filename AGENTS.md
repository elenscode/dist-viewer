# Repository Guidelines

## Project Structure & Module Organization

This is a React 18 + TypeScript + Vite proof of concept for rendering Plotly chart thumbnails and opening a single live Plotly chart in a modal. Application code lives in `src/`. Main entry points are `src/main.tsx` and `src/App.tsx`.

Use `src/components/` for feature components such as `ChartGrid`, `ChartCard`, `ChartModal`, and `PlotlyChart`. Reusable shadcn-style primitives live in `src/components/ui/`. Mock data APIs belong in `src/api/`, shared helpers in `src/lib/`, hooks in `src/hooks/`, and shared types in `src/types/`. Static public assets, if added, should go in `public/`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package.json`.
- `npm run dev`: start the Vite development server.
- `npm run build`: run TypeScript build checks, then create the production Vite build.
- `npm run preview`: preview the production build locally.

A `pnpm-lock.yaml` is present, so `pnpm install`, `pnpm dev`, `pnpm build`, and `pnpm preview` are also acceptable if the team standardizes on pnpm.

## Coding Style & Naming Conventions

Write TypeScript and React function components. Keep component files in PascalCase, for example `ChartModal.tsx`; hooks should use `use-*` or `useSomething` naming. Prefer the `@/*` path alias for cross-folder imports when it improves clarity.

Use strict TypeScript. Keep shared shapes in `src/types/`. Follow the existing style: two-space indentation, single quotes, semicolons, Tailwind utility classes, and shadcn UI conventions from `components.json`.

## Testing Guidelines

No test runner is configured yet. For now, use `npm run build` as the required verification step before opening a PR. When adding tests, colocate them near the code under test using names like `ChartGrid.test.tsx`, and add the test command to `package.json`.

## Commit & Pull Request Guidelines

This checkout does not include Git history, so no existing commit convention can be inferred. Use concise, imperative commit subjects such as `Add chart modal loading state`.

Pull requests should include a short summary, verification steps, linked issues if applicable, and screenshots or screen recordings for UI changes involving the chart grid, sidebar, or modal.
