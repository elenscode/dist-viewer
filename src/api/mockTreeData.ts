import type { ProjectFileItem } from '../types/chart';

export const MOCK_TREE_DATA: ProjectFileItem[] = [
  {
    id: 'line-a',
    name: 'Line A Compressor Logs',
    type: 'file',
    children: [
      {
        id: 'line-a-vibration',
        name: 'Vibration Runs',
        type: 'folder',
        children: [
          { id: 'line-a-vib-0423', name: 'Run 0423', type: 'item', coordinate: { x: 12, y: 8 } },
          { id: 'line-a-vib-0424', name: 'Run 0424', type: 'item', coordinate: { x: 18, y: 11 } },
        ],
      },
      { id: 'line-a-temp-0424', name: 'Temperature Sweep 0424', type: 'item', coordinate: { x: 21, y: 6 } },
    ],
  },
  {
    id: 'line-b',
    name: 'Line B Pump Logs',
    type: 'file',
    children: [
      { id: 'line-b-pressure-0418', name: 'Pressure Run 0418', type: 'item', coordinate: { x: 9, y: 14 } },
      {
        id: 'line-b-bearing',
        name: 'Bearing Sensors',
        type: 'folder',
        children: [
          { id: 'line-b-bearing-0419', name: 'Bearing Run 0419', type: 'item', coordinate: { x: 15, y: 15 } },
          { id: 'line-b-bearing-0420', name: 'Bearing Run 0420', type: 'item', coordinate: { x: 24, y: 9 } },
        ],
      },
    ],
  },
  {
    id: 'cell-c',
    name: 'Cell C Furnace Logs',
    type: 'file',
    children: [
      { id: 'cell-c-zone-1', name: 'Zone 1 Heat Profile', type: 'item', coordinate: { x: 7, y: 3 } },
      { id: 'cell-c-zone-2', name: 'Zone 2 Heat Profile', type: 'item', coordinate: { x: 7, y: 12 } },
      { id: 'cell-c-exhaust', name: 'Exhaust Flow Profile', type: 'item', coordinate: { x: 4, y: 17 } },
    ],
  },
  {
    id: 'qa-rig',
    name: 'QA Rig Baseline Logs',
    type: 'file',
    children: [
      { id: 'qa-rig-baseline', name: 'Baseline Capture', type: 'item', coordinate: { x: 30, y: 5 } },
      { id: 'qa-rig-stress', name: 'Stress Capture', type: 'item', coordinate: { x: 33, y: 10 } },
    ],
  },
];
