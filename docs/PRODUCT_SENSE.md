# Product Sense

## Good UX Means

- The first screen helps users scan many charts quickly.
- Expensive interactive rendering happens only when the user asks for it.
- Search and filtering feel immediate.
- A selected chart has enough context to understand what is being inspected.

## Prioritization

- Prefer performance and clarity over decorative UI.
- Prefer workflows that support comparison and repeated inspection.
- Prioritize real log semantics once real data contracts are available.
- Add controls only when they help engineers narrow or inspect data.

## Avoid

- Rendering hundreds of live Plotly charts in the grid.
- Hiding data loading or failure states.
- Introducing backend assumptions without documenting the contract.
- Adding product copy that explains implementation details inside the UI.
