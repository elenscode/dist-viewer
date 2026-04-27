# Backend

No backend exists in the current repository snapshot.

## Future Backend Rules

- Define API contracts before wiring UI to real equipment logs.
- Validate external responses at the boundary.
- Keep auth, data access, and visualization DTOs separated.
- Add Pytest only when Python backend code exists.
- Add Docker compose only when a service boundary exists.

## Expected Contracts To Define

- Equipment hierarchy.
- Log metadata.
- Chart series metadata.
- Chart data windowing and downsampling.
- Error response shape.

## Current Frontend Mock Thumbnail Contract

The UI currently calls a mock boundary (`src/api/mockThumbnailBackend.ts`) that represents a future backend image endpoint.

Example request (future target shape):

```http
GET /api/chart-thumbnails/{chartId}
```

Example response shape (current mock equivalent):

```json
{
  "chartId": "line-3-chart-10",
  "imageUrl": "data:image/svg+xml;charset=utf-8,..."
}
```

When replacing the mock boundary with a real backend call, keep normalization in `src/api/` before UI components consume image URLs.
