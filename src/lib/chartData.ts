import type { Data, Layout } from 'plotly.js';

export const GRID_COLUMNS = 5;
export const TOTAL_CHARTS = 200;
export const LINE_COUNT = 2000;
export const POINT_COUNT = 80;

function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function buildThumbnailSvg(id: string): string {
  const seed = hashSeed(id);
  const width = 360;
  const height = 180;

  const paths = Array.from({ length: 20 }, (_, lineIndex) => {
    const points = Array.from({ length: POINT_COUNT }, (_, pointIndex) => {
      const x = (pointIndex / (POINT_COUNT - 1)) * width;
      const base = 30 + lineIndex * 5.5;
      const amp = 3 + ((seed + lineIndex) % 6);
      const y = base + Math.sin(pointIndex * 0.24 + seed * 0.01 + lineIndex * 0.33) * amp;
      return `${pointIndex === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');

    return `<path d="${points}" fill="none" stroke="rgba(37,99,235,0.24)" stroke-width="1" />`;
  }).join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#ffffff" />
      <path d="M18 150.5H342" stroke="#cbd5e1" stroke-width="1" />
      <path d="M18 22V151" stroke="#e2e8f0" stroke-width="1" />
      ${paths}
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function buildPlotlyFigure(id: string): { data: Data[]; layout: Partial<Layout> } {
  const seed = hashSeed(id);
  const x: Array<number | null> = [];
  const y: Array<number | null> = [];

  for (let lineIndex = 0; lineIndex < LINE_COUNT; lineIndex += 1) {
    const base = (lineIndex % 50) * 0.018 + ((seed % 13) * 0.01);
    const amp = 0.12 + (lineIndex % 9) * 0.012;
    const phase = seed * 0.009 + lineIndex * 0.07;

    for (let pointIndex = 0; pointIndex < POINT_COUNT; pointIndex += 1) {
      x.push(pointIndex);
      y.push(base + Math.sin(pointIndex * 0.13 + phase) * amp + (lineIndex / LINE_COUNT) * 0.55);
    }

    x.push(null);
    y.push(null);
  }

  return {
    data: [
      {
        type: 'scattergl',
        mode: 'lines',
        x,
        y,
        hoverinfo: 'skip',
        line: {
          width: 1,
          color: 'rgba(37,99,235,0.16)',
        },
      },
    ],
    layout: {
      dragmode: 'pan',
      showlegend: false,
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#ffffff',
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: {
        title: { text: 'Point Index' },
        zeroline: false,
        showgrid: false,
      },
      yaxis: {
        title: { text: 'Signal' },
        zeroline: false,
        showgrid: false,
      },
    },
  };
}
