# Plotly thumbnail → modal chart PoC

A small React + TypeScript + Vite starter that uses:

- thumbnail images for a large grid
- a mock async API for the thumbnail catalog
- a modal that mounts a single Plotly WebGL chart only when selected

## Install

```bash
npm install
npm run dev
```

## Notes

- The grid shows image thumbnails, not live charts.
- Clicking a card opens a modal and mounts a single Plotly `scattergl` chart.
- The mock API shape is easy to replace with a real backend call later.
