# Scenario: API Field Addition

## Task

Add a new chart metadata field.

## Expected Agent Steps

1. Update `src/types/chart.ts`.
2. Normalize or generate the field in `src/api/`.
3. Render it only where useful.
4. Update `docs/generated/api-map.md`.
5. Run build and architecture checks.
