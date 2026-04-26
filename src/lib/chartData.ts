import type { Data, Layout } from 'plotly.js';

export const GRID_COLUMNS = 5;
export const TOTAL_CHARTS = 200;
export const LINE_COUNT = 2000;
export const POINT_COUNT = 80;

export function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export type ThumbnailLine = Array<{ x: number; y: number }>;

type ThumbnailLineOptions = {
  maxLines?: number;
  maxPoints?: number;
};

export function buildThumbnailLines(
  id: string,
  width: number,
  height: number,
  { maxLines = 20, maxPoints = POINT_COUNT }: ThumbnailLineOptions = {},
): ThumbnailLine[] {
  const seed = hashSeed(id);
  const top = height * 0.14;
  const bottom = height * 0.83;
  const available = bottom - top;
  const lineCount = Math.max(1, Math.min(20, maxLines));
  const pointCount = Math.max(2, Math.min(POINT_COUNT, maxPoints));

  return Array.from({ length: lineCount }, (_, lineIndex) => {
    const originalLineIndex = lineCount === 1 ? 0 : Math.round((lineIndex / (lineCount - 1)) * 19);

    return Array.from({ length: pointCount }, (_, pointIndex) => {
      const originalPointIndex =
        pointCount === 1 ? 0 : Math.round((pointIndex / (pointCount - 1)) * (POINT_COUNT - 1));
      const x = (pointIndex / (pointCount - 1)) * width;
      const base = top + available * (originalLineIndex / 22);
      const amp = 6 + ((seed + lineIndex) % 10);
      const y = base + Math.sin(originalPointIndex * 0.24 + seed * 0.01 + originalLineIndex * 0.33) * amp;
      return { x, y };
    });
  });
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
