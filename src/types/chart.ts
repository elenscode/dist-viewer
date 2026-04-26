export type ChartThumbnail = {
  id: string;
  title: string;
  thumbnailUrl: string;
  sourceItemId: string;
  sourceItemName: string;
  projectPath: string;
  equipment: string;
  signalType: string;
  severity: 'Normal' | 'Watch' | 'Warning' | 'Critical';
  lineCount: number;
  pointCount: number;
  mean: number;
  peak: number;
  driftPct: number;
  anomalyScore: number;
  sampleRateHz: number;
};

export type ProjectFileItem = {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'item';
  children?: ProjectFileItem[];
};
