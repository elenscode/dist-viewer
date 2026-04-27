import { LINE_COUNT, POINT_COUNT, TOTAL_CHARTS } from '../lib/chartData';
import { MOCK_TREE_DATA } from './mockTreeData';
import { fetchMockThumbnailImage } from './mockThumbnailBackend';
import type { ChartThumbnail, ProjectFileItem } from '../types/chart';

const MOCK_DELAY_MS = 250;
const CHARTS_PER_SELECTED_ITEM = 8;
const MAX_GENERATED_CHARTS = 72;
const EQUIPMENT = ['CMP-104', 'PMP-210', 'FNC-312', 'QA-077', 'DRV-506'];
const SIGNAL_TYPES = ['Vibration', 'Temperature', 'Pressure', 'Current', 'Flow'];
const SEVERITIES: ChartThumbnail['severity'][] = ['Normal', 'Watch', 'Warning', 'Critical'];

type ProjectLeaf = {
  id: string;
  name: string;
  path: string;
};

function hashSeed(input: string): number {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function collectLeaves(items: ProjectFileItem[], selectedIds: Set<string>, path: string[] = []): ProjectLeaf[] {
  return items.flatMap((item) => {
    const nextPath = [...path, item.name];
    const children = item.children ?? [];
    const selected = selectedIds.has(item.id);

    if (children.length > 0) {
      const childLeaves = collectLeaves(children, selectedIds, nextPath);
      if (selected) {
        return childLeaves.length > 0
          ? childLeaves
          : [{ id: item.id, name: item.name, path: nextPath.join(' / ') }];
      }
      return childLeaves;
    }

    return selected ? [{ id: item.id, name: item.name, path: nextPath.join(' / ') }] : [];
  });
}

export async function fetchChartThumbnails(selectedProjectIds: string[]): Promise<ChartThumbnail[]> {
  await new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY_MS));

  const selectedIds = new Set(selectedProjectIds);
  const leaves = collectLeaves(MOCK_TREE_DATA, selectedIds);
  const sources = leaves.length > 0 ? leaves : [{ id: 'empty', name: 'No source selected', path: 'Project Files' }];
  const total = Math.min(TOTAL_CHARTS, MAX_GENERATED_CHARTS, sources.length * CHARTS_PER_SELECTED_ITEM);

  const chartMetadata = Array.from({ length: total }, (_, index) => {
    const source = sources[index % sources.length];
    const id = `${source.id}-chart-${index + 1}`;
    const seed = hashSeed(id);
    const severity = SEVERITIES[seed % SEVERITIES.length];

    return {
      id,
      title: `${source.name} / Chart ${index + 1}`,
      thumbnailUrl: '',
      sourceItemId: source.id,
      sourceItemName: source.name,
      projectPath: source.path,
      equipment: EQUIPMENT[seed % EQUIPMENT.length],
      signalType: SIGNAL_TYPES[(seed >> 3) % SIGNAL_TYPES.length],
      severity,
      lineCount: LINE_COUNT,
      pointCount: POINT_COUNT,
      mean: Number((18 + (seed % 260) / 10).toFixed(1)),
      peak: Number((42 + (seed % 520) / 10).toFixed(1)),
      driftPct: Number((((seed >> 4) % 90) / 10 - 2.5).toFixed(1)),
      anomalyScore: Number(((seed % 100) / 100).toFixed(2)),
      sampleRateHz: [50, 100, 250, 500][seed % 4],
    };
  });

  const rendered = await Promise.all(
    chartMetadata.map(async (item) => ({
      ...item,
      thumbnailUrl: await fetchMockThumbnailImage({
        chartId: item.id,
        title: item.title,
        seed: hashSeed(item.id),
      }),
    })),
  );

  return rendered;
}
