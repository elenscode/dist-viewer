# Frontend

## Stack

- React 18.
- TypeScript strict mode.
- Vite.
- Tailwind CSS 4.
- Plotly through `react-plotly.js`.
- OpenCV.js through `@techstark/opencv-js` for mock thumbnail image generation.

## Source Rules

- Put pure data and visualization builders in `src/lib/`.
- Put backend/mock boundaries in `src/api/`.
- Keep shared types in `src/types/`.
- Keep app-specific React components in `src/components/`.
- Keep reusable UI primitives in `src/components/ui/`.

## Performance Rules

- Do not mount Plotly in thumbnail cards.
- Use deterministic thumbnail generation for overview screens; current mock thumbnails are downsampled OpenCV-rendered PNG data URLs.
- Keep thumbnail selection and feature-table rendering lightweight; Plotly should stay modal-only.
- Keep OpenCV loading and `Mat` work outside React render paths.
- Render OpenCV thumbnails at reduced resolution with capped line/point counts, then batch generation so the browser can paint between batches.
- Be careful with synchronous loops in render paths.
- For real large logs, add pagination, virtualization, or workers before increasing data volume.

## UI Verification

- Minimum: `pnpm run build`.
- Preferred once installed: Playwright route smoke with console and network error capture.
- Artifact target: `.agent-artifacts/ui-checks/latest/`.
