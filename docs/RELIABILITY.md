# Reliability

## Failure Model

- Mock API can fail or later become a real network boundary.
- Chart rendering can fail due to data size, browser memory, or Plotly errors.
- Thumbnail generation can fail or stall if the OpenCV.js runtime is unavailable or browser memory is constrained.
- UI can become unresponsive if heavy work is done during render.

## Rules

- Add explicit loading, empty, and error states for real data.
- Use timeouts and retries only at network boundaries.
- Keep retry behavior bounded and visible.
- Prefer rollback by reverting a small PR.

## Rollback

- Frontend-only change: revert commit or disable the new UI path.
- API integration change: restore mock/fallback boundary if available.
- Visualization performance issue: reduce data volume or switch to thumbnail-only path.
- OpenCV thumbnail performance issue: reduce generated thumbnail count, lower thumbnail downsampling constants, or replace the renderer behind `src/lib/opencvThumbnail.ts`.
