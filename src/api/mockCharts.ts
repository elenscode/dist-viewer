import { LINE_COUNT, POINT_COUNT, TOTAL_CHARTS, buildThumbnailSvg } from '../lib/chartData';
import type { ChartThumbnail } from '../types/chart';

const MOCK_DELAY_MS = 250;

export async function fetchChartThumbnails(): Promise<ChartThumbnail[]> {
  await new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY_MS));

  return Array.from({ length: TOTAL_CHARTS }, (_, index) => {
    const id = `chart-${index + 1}`;

    return {
      id,
      title: `Chart ${index + 1}`,
      thumbnailUrl: buildThumbnailSvg(id),
      lineCount: LINE_COUNT,
      pointCount: POINT_COUNT,
    };
  });
}
